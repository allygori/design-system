/* eslint-disable tsdoc/syntax -- ignore */
/* eslint-disable @typescript-eslint/no-non-null-assertion -- ignore */
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef, useCallback, useEffect, useRef } from "react";
import Element from "@allygory/element";
import * as DismissableLayer from "@allygory/dismissable-layer";
import useComposeRefs from "@allygory/use-compose-refs";
import {
  VIEWPORT_NAME,
  VIEWPORT_DEFAULT_HOTKEY,
  VIEWPORT_PAUSE,
  VIEWPORT_RESUME,
} from "./shared/constants";
import {
  type ScopedProps,
  Collection,
  useCollection,
  useToastProviderContext,
} from "./shared/context";
import FocusProxy, { type FocusProxyElement } from "./focus-proxy";
import { focusFirst, getTabbableCandidates } from "./shared/utils";

type ToastViewportElement = ElementRef<typeof Element.ol>;
type ToastViewportProps = ComponentPropsWithoutRef<typeof Element.ol> & {
  /**
   * The keys to use as the keyboard shortcut that will move focus to the toast viewport.
   * @defaultValue ['F8']
   */
  hotkey?: string[];
  /**
   * An author-localized label for the toast viewport to provide context for screen reader users
   * when navigating page landmarks. The available `{hotkey}` placeholder will be replaced for you.
   * @defaultValue 'Notifications ({hotkey})'
   */
  label?: string;
};

const ToastViewport = forwardRef<ToastViewportElement, ToastViewportProps>(
  (props: ScopedProps<ToastViewportProps>, forwardedRef) => {
    const {
      __scopeToast,
      hotkey = VIEWPORT_DEFAULT_HOTKEY,
      label = "Notifications ({hotkey})",
      ...viewportProps
    } = props;
    const context = useToastProviderContext(VIEWPORT_NAME, __scopeToast);
    const getItems = useCollection(__scopeToast);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const headFocusProxyRef = useRef<FocusProxyElement>(null);
    const tailFocusProxyRef = useRef<FocusProxyElement>(null);
    const ref = useRef<ToastViewportElement>(null);
    const composedRefs = useComposeRefs(forwardedRef, ref, context.onViewportChange);
    const hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
    const hasToasts = context.toastCount > 0;

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent): void => {
        // we use `event.code` as it is consistent regardless of meta keys that were pressed.
        // for example, `event.key` for `Control+Alt+t` is `†` and `t !== †`
        const isHotkeyPressed = hotkey.every(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any -- ignore
          (key) => (event as any)[key] || event.code === key,
        );
        if (isHotkeyPressed) {
          ref.current?.focus();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [hotkey]);

    useEffect(() => {
      const wrapper = wrapperRef.current;
      const viewport = ref.current;

      if (hasToasts && wrapper && viewport) {
        const handlePause = (): void => {
          if (!context.isClosePausedRef.current) {
            const pauseEvent = new CustomEvent(VIEWPORT_PAUSE);
            viewport.dispatchEvent(pauseEvent);
            context.isClosePausedRef.current = true;
          }
        };

        const handleResume = (): void => {
          if (context.isClosePausedRef.current) {
            const resumeEvent = new CustomEvent(VIEWPORT_RESUME);
            viewport.dispatchEvent(resumeEvent);
            context.isClosePausedRef.current = false;
          }
        };

        const handleFocusOutResume = (event: FocusEvent): void => {
          const isFocusMovingOutside = !wrapper.contains(
            event.relatedTarget as HTMLElement,
          );
          if (isFocusMovingOutside) handleResume();
        };

        const handlePointerLeaveResume = (): void => {
          const isFocusInside = wrapper.contains(document.activeElement);
          if (!isFocusInside) handleResume();
        };

        // Toasts are not in the viewport React tree so we need to bind DOM events
        wrapper.addEventListener("focusin", handlePause);
        wrapper.addEventListener("focusout", handleFocusOutResume);
        wrapper.addEventListener("pointermove", handlePause);
        wrapper.addEventListener("pointerleave", handlePointerLeaveResume);
        window.addEventListener("blur", handlePause);
        window.addEventListener("focus", handleResume);

        return () => {
          wrapper.removeEventListener("focusin", handlePause);
          wrapper.removeEventListener("focusout", handleFocusOutResume);
          wrapper.removeEventListener("pointermove", handlePause);
          wrapper.removeEventListener("pointerleave", handlePointerLeaveResume);
          window.removeEventListener("blur", handlePause);
          window.removeEventListener("focus", handleResume);
        };
      }
    }, [hasToasts, context.isClosePausedRef]);

    const getSortedTabbableCandidates = useCallback(
      ({ tabbingDirection }: { tabbingDirection: "forwards" | "backwards" }) => {
        const toastItems = getItems();
        const tabbaleCandidates = toastItems.map((toastItem) => {
          const toastNode = toastItem.ref.current!;
          const toastTabbableCandidates = [
            toastNode,
            ...getTabbableCandidates(toastNode),
          ];
          return tabbingDirection === "forwards"
            ? toastTabbableCandidates
            : toastTabbableCandidates.reverse();
        });

        return (
          tabbingDirection === "forwards"
            ? tabbaleCandidates.reverse()
            : tabbaleCandidates
        ).flat();
      },
      [getItems],
    );

    useEffect(() => {
      const viewport = ref.current;
      // We programmatically manage tabbing as we are unable to influence
      // the source order with portals, this allows us to reverse the
      // tab order so that it runs from most recent toast to least
      if (viewport) {
        const handleKeyDown = (event: KeyboardEvent): void => {
          const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
          const isTabKey = event.key === "Tab" && !isMetaKey;

          if (isTabKey) {
            const focusedElement = document.activeElement;
            const isTabbingBackwards = event.shiftKey;
            const targetIsViewport = event.target === viewport;

            // If we're back tabbing after jumping to the viewport then we simply
            // proxy focus out to the preceding document
            if (targetIsViewport && isTabbingBackwards) {
              headFocusProxyRef.current?.focus();
              return;
            }

            const tabbingDirection = isTabbingBackwards ? "backwards" : "forwards";
            const sortedCandidates = getSortedTabbableCandidates({
              tabbingDirection,
            });
            const index = sortedCandidates.findIndex(
              (candidate) => candidate === focusedElement,
            );

            if (focusFirst(sortedCandidates.slice(index + 1))) {
              event.preventDefault();
            } else {
              // If we can't focus that means we're at the edges so we
              // proxy to the corresponding exit point and let the browser handle
              // tab/shift+tab keypress and implicitly pass focus to the next valid element in the document
              isTabbingBackwards
                ? headFocusProxyRef.current?.focus()
                : tailFocusProxyRef.current?.focus();
            }
          }
        };

        // Toasts are not in the viewport React tree so we need to bind DOM events
        viewport.addEventListener("keydown", handleKeyDown);
        return () => {
          viewport.removeEventListener("keydown", handleKeyDown);
        };
      }
    }, [getItems, getSortedTabbableCandidates]);

    return (
      <DismissableLayer.Branch
        ref={wrapperRef}
        aria-label={label.replace("{hotkey}", hotkeyLabel)}
        role="region"
        // incase list has size when empty (e.g. padding), we remove pointer events so
        // it doesn't prevent interactions with page elements that it overlays
        style={{ pointerEvents: hasToasts ? undefined : "none" }}
        // Ensure virtual cursor from landmarks menus triggers focus/blur for pause/resume
        tabIndex={-1}
      >
        {hasToasts ? (
          <FocusProxy
            ref={headFocusProxyRef}
            onFocusFromOutsideViewport={() => {
              const tabbableCandidates = getSortedTabbableCandidates({
                tabbingDirection: "forwards",
              });
              focusFirst(tabbableCandidates);
            }}
          />
        ) : null}
        {/**
         * tabindex on the the list so that it can be focused when items are removed. we focus
         * the list instead of the viewport so it announces number of items remaining.
         */}
        <Collection.Slot scope={__scopeToast}>
          <Element.ol tabIndex={-1} {...viewportProps} ref={composedRefs} />
        </Collection.Slot>
        {hasToasts ? (
          <FocusProxy
            ref={tailFocusProxyRef}
            onFocusFromOutsideViewport={() => {
              const tabbableCandidates = getSortedTabbableCandidates({
                tabbingDirection: "backwards",
              });
              focusFirst(tabbableCandidates);
            }}
          />
        ) : null}
      </DismissableLayer.Branch>
    );
  },
);

ToastViewport.displayName = VIEWPORT_NAME;

export type { ToastViewportElement, ToastViewportProps };
export default ToastViewport;

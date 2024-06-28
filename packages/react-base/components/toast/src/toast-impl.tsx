import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Element, { composeEventHandlers } from "@allygory/element";
import * as DismissableLayer from "@allygory/dismissable-layer";
import useComposeRefs from "@allygory/use-compose-refs";
import useCallbackRef from "@allygory/use-callback-ref";
import {
  TOAST_NAME,
  TOAST_SWIPE_CANCEL,
  TOAST_SWIPE_END,
  TOAST_SWIPE_MOVE,
  TOAST_SWIPE_START,
  VIEWPORT_PAUSE,
  VIEWPORT_RESUME,
} from "./shared/constants";
import {
  getAnnounceTextContent,
  handleAndDispatchCustomEvent,
  isDeltaInDirection,
} from "./shared/utils";
import {
  type ScopedProps,
  useToastProviderContext,
  Collection,
} from "./shared/context";
import type { SwipeEvent } from "./shared/types";
import ToastAnnounce from "./announce";
import { ToastInteractiveProvider } from "./shared/context";

type ToastImplElement = ElementRef<typeof Element.li>;
type ToastImplPrivateProps = { open: boolean; onClose(): void };
type DismissableLayerProps = ComponentPropsWithoutRef<
  typeof DismissableLayer.Root
>;
type ElementListItemProps = ComponentPropsWithoutRef<typeof Element.li>;
type ToastImplProps = ToastImplPrivateProps &
  ElementListItemProps & {
    type?: "foreground" | "background";
    /**
     * Time in milliseconds that toast should remain visible for. Overrides value
     * given to `ToastProvider`.
     */
    duration?: number;
    onEscapeKeyDown?: DismissableLayerProps["onEscapeKeyDown"];
    onPause?(): void;
    onResume?(): void;
    onSwipeStart?(event: SwipeEvent): void;
    onSwipeMove?(event: SwipeEvent): void;
    onSwipeCancel?(event: SwipeEvent): void;
    onSwipeEnd?(event: SwipeEvent): void;
  };

const ToastImpl = forwardRef<ToastImplElement, ToastImplProps>(
  (props: ScopedProps<ToastImplProps>, forwardedRef) => {
    const {
      __scopeToast,
      type = "foreground",
      duration: durationProp,
      open,
      onClose,
      onEscapeKeyDown,
      onPause,
      onResume,
      onSwipeStart,
      onSwipeMove,
      onSwipeCancel,
      onSwipeEnd,
      ...toastProps
    } = props;

    const context = useToastProviderContext(TOAST_NAME, __scopeToast);
    const [node, setNode] = useState<ToastImplElement | null>(null);
    const composedRefs = useComposeRefs(forwardedRef, (node) => setNode(node));
    const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
    const swipeDeltaRef = useRef<{ x: number; y: number } | null>(null);
    const duration = durationProp || context.duration;
    const closeTimerStartTimeRef = useRef(0);
    const closeTimerRemainingTimeRef = useRef(duration);
    const closeTimerRef = useRef(0);
    const { onToastAdd, onToastRemove } = context;
    const handleClose = useCallbackRef(() => {
      // focus viewport if focus is within toast to read the remaining toast
      // count to SR users and ensure focus isn't lost
      const isFocusInToast = node?.contains(document.activeElement);
      if (isFocusInToast) context.viewport?.focus();
      onClose();
    });
    const startTimer = useCallback(
      (duration: number) => {
        if (!duration || duration === Infinity) return;
        window.clearTimeout(closeTimerRef.current);
        closeTimerStartTimeRef.current = new Date().getTime();
        closeTimerRef.current = window.setTimeout(handleClose, duration);
      },
      [handleClose],
    );

    useEffect(() => {
      const viewport = context.viewport;
      if (viewport) {
        const handleResume = () => {
          startTimer(closeTimerRemainingTimeRef.current);
          onResume?.();
        };

        const handlePause = () => {
          const elapsedTime =
            new Date().getTime() - closeTimerStartTimeRef.current;
          closeTimerRemainingTimeRef.current =
            closeTimerRemainingTimeRef.current - elapsedTime;
          window.clearTimeout(closeTimerRef.current);
          onPause?.();
        };

        viewport.addEventListener(VIEWPORT_PAUSE, handlePause);
        viewport.addEventListener(VIEWPORT_RESUME, handleResume);
        return () => {
          viewport.addEventListener(VIEWPORT_PAUSE, handlePause);
          viewport.addEventListener(VIEWPORT_RESUME, handleResume);
        };
      }
    }, [context.viewport, duration, onPause, onResume, startTimer]);

    // start timer when toast opens or duration changes.
    // we include `open` in deps because closed !== unmounted when animating
    // so it could reopen before being completely unmounted
    useEffect(() => {
      if (open && !context.isClosePausedRef.current) {
        startTimer(duration);
      }
    }, [open, duration, context.isClosePausedRef, startTimer]);

    useEffect(() => {
      onToastAdd();
      return () => onToastRemove();
    }, [onToastAdd, onToastRemove]);

    const announceTextContent = useMemo(() => {
      return node ? getAnnounceTextContent(node) : null;
    }, [node]);

    if (!context.viewport) return null;

    return (
      <>
        {announceTextContent && (
          <ToastAnnounce
            __scopeToast={__scopeToast}
            role="status"
            aria-live={type === "foreground" ? "assertive" : "polite"}
            aria-atomic
          >
            {announceTextContent}
          </ToastAnnounce>
        )}

        <ToastInteractiveProvider scope={__scopeToast} onClose={handleClose}>
          {createPortal(
            <Collection.ItemSlot scope={__scopeToast}>
              <DismissableLayer.Root
                asChild
                onEscapeKeyDown={composeEventHandlers(onEscapeKeyDown, () => {
                  if (!context.isFocusedToastEscapeKeyDownRef.current) {
                    handleClose();
                  }
                  context.isFocusedToastEscapeKeyDownRef.current = false;
                })}
              >
                <Element.li
                  // Ensure toasts are announced as status list or status when focused
                  role="status"
                  aria-live="off"
                  aria-atomic
                  tabIndex={0}
                  data-state={open ? "open" : "close"}
                  data-swipe-direction={context.swipeDirection}
                  {...toastProps}
                  ref={composedRefs}
                  style={{
                    userSelect: "none",
                    touchAction: "none",
                    ...props.style,
                  }}
                  onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
                    if (event.key !== "Escape") return;
                    onEscapeKeyDown?.(event.nativeEvent);
                    if (!event.nativeEvent.defaultPrevented) {
                      context.isFocusedToastEscapeKeyDownRef.current = true;
                      handleClose();
                    }
                  })}
                  onPointerDown={composeEventHandlers(
                    props.onPointerDown,
                    (event) => {
                      if (event.button !== 0) return;
                      pointerStartRef.current = {
                        x: event.clientX,
                        y: event.clientY,
                      };
                    },
                  )}
                  onPointerMove={composeEventHandlers(
                    props.onPointerMove,
                    (event) => {
                      if (!pointerStartRef.current) return;
                      const x = event.clientX - pointerStartRef.current.x;
                      const y = event.clientY - pointerStartRef.current.y;
                      const hasSwipeMoveStarted = Boolean(
                        swipeDeltaRef.current,
                      );
                      const isHorizontalSwipe = ["left", "right"].includes(
                        context.swipeDirection,
                      );
                      const clamp = ["left", "up"].includes(
                        context.swipeDirection,
                      )
                        ? Math.min
                        : Math.max;
                      const clampedX = isHorizontalSwipe ? clamp(0, x) : 0;
                      const clampedY = !isHorizontalSwipe ? clamp(0, y) : 0;
                      const moveStartBuffer =
                        event.pointerType === "touch" ? 10 : 2;
                      const delta = { x: clampedX, y: clampedY };
                      const eventDetail = { originalEvent: event, delta };
                      if (hasSwipeMoveStarted) {
                        swipeDeltaRef.current = delta;
                        handleAndDispatchCustomEvent(
                          TOAST_SWIPE_MOVE,
                          onSwipeMove,
                          eventDetail,
                          {
                            discrete: false,
                          },
                        );
                      } else if (
                        isDeltaInDirection(
                          delta,
                          context.swipeDirection,
                          moveStartBuffer,
                        )
                      ) {
                        swipeDeltaRef.current = delta;
                        handleAndDispatchCustomEvent(
                          TOAST_SWIPE_START,
                          onSwipeStart,
                          eventDetail,
                          {
                            discrete: false,
                          },
                        );
                        (event.target as HTMLElement).setPointerCapture(
                          event.pointerId,
                        );
                      } else if (
                        Math.abs(x) > moveStartBuffer ||
                        Math.abs(y) > moveStartBuffer
                      ) {
                        // User is swiping in wrong direction so we disable swipe gesture
                        // for the current pointer down interaction
                        pointerStartRef.current = null;
                      }
                    },
                  )}
                  onPointerUp={composeEventHandlers(
                    props.onPointerUp,
                    (event) => {
                      const delta = swipeDeltaRef.current;
                      const target = event.target as HTMLElement;
                      if (target.hasPointerCapture(event.pointerId)) {
                        target.releasePointerCapture(event.pointerId);
                      }
                      swipeDeltaRef.current = null;
                      pointerStartRef.current = null;
                      if (delta) {
                        const toast = event.currentTarget;
                        const eventDetail = { originalEvent: event, delta };
                        if (
                          isDeltaInDirection(
                            delta,
                            context.swipeDirection,
                            context.swipeThreshold,
                          )
                        ) {
                          handleAndDispatchCustomEvent(
                            TOAST_SWIPE_END,
                            onSwipeEnd,
                            eventDetail,
                            { discrete: true },
                          );
                        } else {
                          handleAndDispatchCustomEvent(
                            TOAST_SWIPE_CANCEL,
                            onSwipeCancel,
                            eventDetail,
                            { discrete: true },
                          );
                        }
                        // Prevent click event from triggering on items within the toast when
                        // pointer up is part of a swipe gesture
                        toast.addEventListener(
                          "click",
                          (event) => event.preventDefault(),
                          {
                            once: true,
                          },
                        );
                      }
                    },
                  )}
                />
              </DismissableLayer.Root>
            </Collection.ItemSlot>,
            context.viewport,
          )}
        </ToastInteractiveProvider>
      </>
    );
  },
);

export type { ToastImplElement, ToastImplProps, ToastImplPrivateProps };
export default ToastImpl;

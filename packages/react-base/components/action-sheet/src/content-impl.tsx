import { forwardRef, useRef, type ElementRef } from "react";
import Element, { composeEventHandlers } from "@allygory/element";
import type { DismissableLayerProps } from "@allygory/dismissable-layer";
import DismissableLayer from "@allygory/dismissable-layer";
import FocusScope, { type FocusScopeProps } from "@allygory/focus-scope";
import useComposeRefs from "@allygory/use-compose-refs";
import useCallbackRef from "@allygory/use-callback-ref";
import useFocusGuards from "@allygory/use-focus-guards";
import {
  CONTENT_NAME,
  SWIPE_CANCEL,
  SWIPE_END,
  SWIPE_MOVE,
  SWIPE_START,
} from "./shared/constants";
import {
  getState,
  handleAndDispatchCustomEvent,
  isDeltaInDirection,
} from "./shared/utils";
import type { SwipeEvent } from "./shared/types";
import { type ScopedProps, useRootContext } from "./shared/context"; // ContentProvider,

type ContentImplElement = ElementRef<typeof Element.div>;
type ContentImplPrivateProps = { open: boolean; onClose: () => void };
type ContentImplProps = Omit<
  DismissableLayerProps,
  "onPointerDownOutside" | "onInteractiveOutisde" | "onDismiss"
> &
  ContentImplPrivateProps & {
    trapFocus?: FocusScopeProps["trapped"];
    onOpenAutoFocus?: FocusScopeProps["onMountAutoFocus"];
    onCloseAutoFocus?: FocusScopeProps["onUnmountAutoFocus"];
    onSwipeStart?: (event: SwipeEvent) => void;
    onSwipeMove?: (event: SwipeEvent) => void;
    onSwipeCancel?: (event: SwipeEvent) => void;
    onSwipeEnd?: (event: SwipeEvent) => void;
  };

const ContentImpl = forwardRef<ContentImplElement, ContentImplProps>(
  (props: ScopedProps<ContentImplProps>, forwardedRef) => {
    const {
      __scopeActionSheet,
      trapFocus,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onClose,
      onEscapeKeyDown,
      onSwipeStart,
      onSwipeMove,
      onSwipeCancel,
      onSwipeEnd,
      ...contentProps
    } = props;
    const context = useRootContext(CONTENT_NAME, __scopeActionSheet);
    const contentRef = useRef<HTMLDivElement>(null);
    const composedRefs = useComposeRefs(forwardedRef, contentRef);
    const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
    const swipeDeltaRef = useRef<{ x: number; y: number } | null>(null);

    const handleClose = useCallbackRef(() => {
      onClose();
    });

    // Make sure the whole tree has focus guards as our `ActionSheet` will be
    // the last element in the DOM (beacuse of the `Portal`)
    useFocusGuards();

    return (
      <FocusScope
        asChild
        loop
        trapped={trapFocus}
        onMountAutoFocus={onOpenAutoFocus}
        onUnmountAutoFocus={onCloseAutoFocus}
      >
        <DismissableLayer
          asChild
          onDismiss={() => {
            context.onOpenChange(false);
          }}
          onEscapeKeyDown={composeEventHandlers(onEscapeKeyDown, () => {
            handleClose();
          })}
          onFocusOutside={(event) => {
            event.preventDefault();
          }}
          onInteractOutside={(event) => {
            event.preventDefault();
          }}
        >
          <Element.div
            ref={composedRefs}
            id={context.contentId}
            role="dialog"
            tabIndex={0}
            {...contentProps}
            data-state={getState(context.open)}
            data-swipe-direction={context.direction}
            style={{ userSelect: "none", touchAction: "none", ...props.style }}
            onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key !== "Escape") return;
              onEscapeKeyDown?.(event.nativeEvent);
              if (!event.nativeEvent.defaultPrevented) {
                handleClose();
              }
            })}
            onPointerDown={composeEventHandlers(props.onPointerDown, (event) => {
              if (event.button !== 0) return;
              pointerStartRef.current = {
                x: event.clientX,
                y: event.clientY,
              };
            })}
            onPointerMove={composeEventHandlers(
              props.onPointerMove,
              (event: React.PointerEvent<HTMLDivElement>) => {
                if (!pointerStartRef.current) return;
                const x = event.clientX - pointerStartRef.current.x;
                const y = event.clientY - pointerStartRef.current.y;

                const hasSwipeMoveStarted = Boolean(swipeDeltaRef.current);
                const isVerticalSwipe = ["up", "down"].includes(context.direction);
                const clamp = ["left", "up"].includes(context.direction)
                  ? Math.min
                  : Math.max;

                const clampedX = !isVerticalSwipe ? clamp(0, x) : 0;
                const clampedY = isVerticalSwipe ? clamp(0, y) : 0;
                const moveStartBuffer = event.pointerType === "touch" ? 10 : 2;
                const delta = { x: clampedX, y: clampedY };
                const eventDetail = { originalEvent: event, delta };

                if (hasSwipeMoveStarted) {
                  swipeDeltaRef.current = delta;
                  handleAndDispatchCustomEvent(SWIPE_MOVE, onSwipeMove, eventDetail, {
                    discrete: false,
                  });
                } else if (
                  isDeltaInDirection(delta, context.direction, moveStartBuffer)
                ) {
                  swipeDeltaRef.current = delta;
                  handleAndDispatchCustomEvent(SWIPE_START, onSwipeStart, eventDetail, {
                    discrete: false,
                  });
                  (event.target as HTMLElement).setPointerCapture(event.pointerId);
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
            onPointerUp={composeEventHandlers(props.onPointerUp, (event) => {
              const delta = swipeDeltaRef.current;
              const target = event.target as HTMLElement;
              if (target.hasPointerCapture(event.pointerId)) {
                target.releasePointerCapture(event.pointerId);
              }
              swipeDeltaRef.current = null;
              pointerStartRef.current = null;
              if (delta) {
                const actionSheet = event.currentTarget;
                const eventDetail = { originalEvent: event, delta };

                if (isDeltaInDirection(delta, context.direction, context.threshold)) {
                  handleAndDispatchCustomEvent(SWIPE_END, onSwipeEnd, eventDetail, {
                    discrete: true,
                  });

                  if (delta.y > context.threshold) {
                    handleClose();
                  }
                } else {
                  handleAndDispatchCustomEvent(SWIPE_CANCEL, onSwipeCancel, eventDetail, {
                    discrete: true,
                  });
                }
                // Prevent click event from triggering on items within the action-sheet when
                // pointer up is part of a swipe gesture
                actionSheet.addEventListener(
                  "click",
                  (e) => {
                    e.preventDefault();
                  },
                  { once: true },
                );
              }
            })}
          />
        </DismissableLayer>
      </FocusScope>
    );
  },
);

ContentImpl.displayName = "ActionSheetContentImpl";

export type { ContentImplElement, ContentImplProps, ContentImplPrivateProps };
export default ContentImpl;

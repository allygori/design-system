import { useEffect, useRef } from "react";
import { handleAndDispatchCustomEvent } from "@allygory/shared";
import useCallbackRef from "@allygory/use-callback-ref";

type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>;

function usePointerDownOutside(
  eventName: string,
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void,
  ownerDocument: Document = globalThis?.document,
) {
  const handlePointerDownOutside = useCallbackRef(
    onPointerDownOutside,
  ) as EventListener;
  const isPointerInsideReactTreeRef = useRef(false);
  const handleClickRef = useRef(() => {});

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        const eventDetail = { originalEvent: event };

        const handleAndDispatchPointerDownOutsideEvent = () => {
          handleAndDispatchCustomEvent(
            eventName,
            handlePointerDownOutside,
            eventDetail,
            { discrete: true },
          );
        };

        /**
         * On touch devices, we need to wait for a click event because browsers implement
         * a ~350ms delay between the time the user stops touching the display and when the
         * browser executres events. We need to ensure we don't reactivate pointer-events within
         * this timeframe otherwise the browser may execute events that should have been prevented.
         *
         * Additionally, this also lets us deal automatically with cancellations when a click event
         * isn't raised because the page was considered scrolled/drag-scrolled, long-pressed, etc.
         *
         * This is why we also continuously remove the previous listener, because we cannot be
         * certain that it was raised, and therefore cleaned-up.
         */
        if (event.pointerType === "touch") {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent;
          ownerDocument.addEventListener("click", handleClickRef.current, {
            once: true,
          });
        } else {
          handleAndDispatchPointerDownOutsideEvent();
        }
      } else {
        // We need to remove the event listener in case the outside click has been canceled.
        // See: https://github.com/radix-ui/primitives/issues/2171
        ownerDocument.removeEventListener("click", handleClickRef.current);
      }

      isPointerInsideReactTreeRef.current = false;
    };

    /**
     * if this hook executes in a component that mounts via a `pointerdown` event, the event
     * would bubble up to the document and trigger a `pointerDownOutside` event. We avoid
     * this by delaying the event listener registration on the document.
     * This is not React specific, but rather how the DOM works, ie:
     * ```
     * button.addEventListener('pointerdown', () => {
     *   console.log('I will log');
     *   document.addEventListener('pointerdown', () => {
     *     console.log('I will also log');
     *   })
     * });
     */
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    }, 0);

    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.current);
    };
  }, [ownerDocument, handlePointerDownOutside]);

  return {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => (isPointerInsideReactTreeRef.current = true),
  };
}

export type { PointerDownOutsideEvent };
export default usePointerDownOutside;

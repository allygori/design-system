import { useEffect, useRef } from "react";
import { handleAndDispatchCustomEvent } from "@allygory/shared";
import useCallbackRef from "@allygory/use-callback-ref";

type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>;

const useFocusOutside = (
  eventName: string,
  onFocusOutside?: (event: FocusOutsideEvent) => void,
  ownerDcoument: Document = globalThis?.document,
) => {
  const handleFocusOutside = useCallbackRef(onFocusOutside) as EventListener;
  const isFocusInsideReactTreeRef = useRef(false);

  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = { originalEvent: event };
        handleAndDispatchCustomEvent(
          eventName,
          handleFocusOutside,
          eventDetail,
          {
            discrete: false,
          },
        );
      }

      ownerDcoument.addEventListener("focusin", handleFocus);

      return () => ownerDcoument.removeEventListener("focusin", handleFocus);
    };
  }, [ownerDcoument, handleFocusOutside]);

  return {
    onFocusCapture: () => (isFocusInsideReactTreeRef.current = true),
    onBlurCapture: () => (isFocusInsideReactTreeRef.current = false),
  };
};

export type { FocusOutsideEvent };
export default useFocusOutside;

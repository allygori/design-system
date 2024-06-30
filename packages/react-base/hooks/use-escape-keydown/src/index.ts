import { useEffect } from "react";
import useCallbackRef from "@allygory/use-callback-ref";

const useEscapeKeydown = (
  onEscapeKeyDownProp?: (event: KeyboardEvent) => void,
  ownerDocument: Document = globalThis.document,
): void => {
  const onEscapeKeyDown = useCallbackRef(onEscapeKeyDownProp);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onEscapeKeyDown(event);
      }
    };

    ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      ownerDocument.removeEventListener("keydown", handleKeyDown, {
        capture: true,
      });
    };
  }, [onEscapeKeyDown, ownerDocument]);
};

export default useEscapeKeydown;

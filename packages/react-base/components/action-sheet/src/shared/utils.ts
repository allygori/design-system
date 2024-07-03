import { dispatchDiscreteCustomEvent } from "@allygory/element";
import type { SwipeDirection } from "./types";

export const getState = (open: boolean): string => {
  return open ? "open" : "closed";
};

export const handleAndDispatchCustomEvent = <
  E extends CustomEvent,
  ReactEvent extends React.SyntheticEvent,
>(
  name: string,
  handler: ((event: E) => void) | undefined,
  detail: { originalEvent: ReactEvent },
  { discrete }: { discrete: boolean },
): void => {
  const currentTarget = detail.originalEvent.currentTarget as HTMLElement;
  const event = new CustomEvent(name, {
    bubbles: true,
    cancelable: true,
    detail,
  });
  if (handler)
    currentTarget.addEventListener(name, handler as EventListener, {
      once: true,
    });
  if (discrete) {
    dispatchDiscreteCustomEvent(currentTarget, event);
  } else {
    currentTarget.dispatchEvent(event);
  }
};

export const isDeltaInDirection = (
  delta: { x: number; y: number },
  direction: SwipeDirection,
  threshold = 0,
): boolean => {
  const deltaX = Math.abs(delta.x);
  const deltaY = Math.abs(delta.y);
  const isDeltaY = deltaY > deltaX;
  if (direction === "up" || direction === "down") {
    return isDeltaY && deltaY > threshold;
  }

  return !isDeltaY && deltaX > threshold;
};

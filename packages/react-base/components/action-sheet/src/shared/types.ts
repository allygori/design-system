import type { ContentImplElement } from "../content-impl";

type SwipeDirection = "up" | "down" | "left" | "right";
type SwipeEvent = {
  currentTarget: EventTarget & ContentImplElement;
} & Omit<
  CustomEvent<{
    originalEvent: PointerEvent;
    delta: { x: number; y: number };
  }>,
  "currentTag"
>;

export type { SwipeDirection, SwipeEvent };

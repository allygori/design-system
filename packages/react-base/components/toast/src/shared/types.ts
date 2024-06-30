import type { PointerEvent } from "react";
import type { ToastElement } from "../toast";

export type SwipeEvent = {
  currentTarget: EventTarget & ToastElement;
} & Omit<
  CustomEvent<{
    originalEvent: PointerEvent;
    delta: { x: number; y: number };
  }>,
  "currentTarget"
>;

export type SwipeDirection = "up" | "down" | "left" | "right";

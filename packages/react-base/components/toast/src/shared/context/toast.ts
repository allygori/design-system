import type { MutableRefObject } from "react";
import createCollection from "@allygory/collection";
import { createContextScope, type Scope } from "@allygory/context";
import { PROVIDER_NAME, TOAST_NAME } from "../constants";
import type { SwipeDirection } from "../types";
import type { ToastViewportElement } from "../../viewport";
import type { ToastElement } from "../../toast";

type ScopedProps<P> = P & { __scopeToast?: Scope };
type ToastProviderContextValue = {
  label: string;
  duration: number;
  swipeDirection: SwipeDirection;
  swipeThreshold: number;
  toastCount: number;
  viewport: ToastViewportElement | null;
  onViewportChange: (viewport: ToastViewportElement) => void;
  onToastAdd: () => void;
  onToastRemove: () => void;
  isFocusedToastEscapeKeyDownRef: MutableRefObject<boolean>;
  isClosePausedRef: MutableRefObject<boolean>;
};

const [Collection, useCollection, createCollectionScope] =
  createCollection<ToastElement>(TOAST_NAME);
const [createToastContext, createToastScope] = createContextScope(TOAST_NAME, [
  createCollectionScope,
]);
const [ToastProviderProvider, useToastProviderContext] =
  createToastContext<ToastProviderContextValue>(PROVIDER_NAME);

export type { ScopedProps };
export {
  createToastContext,
  createToastScope,
  //
  useCollection,
  useToastProviderContext,
  //
  Collection,
  ToastProviderProvider,
};

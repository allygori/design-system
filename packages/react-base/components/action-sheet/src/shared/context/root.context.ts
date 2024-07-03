import type { RefObject } from "react";
import { type Scope, createContextScope } from "@allygory/context";
import { createDialogScope } from "@allygory/dialog";
import { ROOT_NAME } from "../constants";
import type { SwipeDirection } from "../types";
import type { ContentElement } from "../../content";

type ScopedProps<P> = P & { __scopeActionSheet?: Scope };
type RootContextValue = {
  triggerRef: RefObject<HTMLButtonElement>;
  contentRef: RefObject<ContentElement>;
  contentId: string;
  direction: SwipeDirection;
  threshold: number;
  open: boolean;
  modal: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (flag: boolean) => void;
  onOpenToggle: () => void;
};

const useDialogScope = createDialogScope();
const [createRootContext, createRootScope] = createContextScope(ROOT_NAME, [
  createDialogScope,
]);
const [RootProvider, useRootContext] = createRootContext<RootContextValue>(ROOT_NAME);

export type { ScopedProps };
export {
  RootProvider,
  //
  useRootContext,
  useDialogScope,
  createRootContext,
  createRootScope,
};

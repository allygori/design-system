import { RefObject } from "react";
import { type Scope, createContextScope } from "@allygory/context";
import { ROOT_NAME } from "../constants";
import type { ContentElement } from "../../content";

type ScopedProps<P> = P & { __scopeDialog?: Scope };

type RootContextValue = {
  triggerRef: RefObject<HTMLButtonElement>;
  contentRef: RefObject<ContentElement>;
  contentId: string;
  titleId: string;
  descriptionId: string;
  open: boolean;
  onOpenChange(open: boolean): void;
  onOpenToggle(): void;
  modal: boolean;
};

const [createRootContext, createRootScope] = createContextScope(ROOT_NAME);
const [RootProvider, useRootContext] = createRootContext<RootContextValue>(ROOT_NAME);

export type { ScopedProps };
export {
  RootProvider,
  //
  createRootContext,
  createRootScope,
  useRootContext,
};

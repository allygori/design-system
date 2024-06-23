import { RefObject } from "react";
import { Scope, createContextScope } from "@allygory/context";
import { DIALOG_NAME, PORTAL_NAME } from "./constants";
import { DialogContentElement } from "./types";

type ScopedProps<P> = P & { __scopeDialog?: Scope };

/******************************************************
 * Root Dialog Provider
 ******************************************************/
type DialogContextValue = {
  triggerRef: RefObject<HTMLButtonElement>;
  contentRef: RefObject<DialogContentElement>;
  contentId: string;
  titleId: string;
  descriptionId: string;
  open: boolean;
  onOpenChange(open: boolean): void;
  onOpenToggle(): void;
  modal: boolean;
};

const [createDialogContext, createDialogScope] =
  createContextScope(DIALOG_NAME);
const [DialogProvider, useDialogContext] =
  createDialogContext<DialogContextValue>(DIALOG_NAME);

/******************************************************
 * Portal Dialog Provider
 ******************************************************/
type PortalContextValue = { forceMount?: true };

const [PortalProvider, usePortalContext] =
  createDialogContext<PortalContextValue>(PORTAL_NAME, {
    forceMount: undefined,
  });

export type { ScopedProps };
export {
  DialogProvider,
  PortalProvider,
  createDialogScope,
  useDialogContext,
  usePortalContext,
};

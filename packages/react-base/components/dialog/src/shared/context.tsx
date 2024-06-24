import { RefObject } from "react";
import { Scope, createContext, createContextScope } from "@allygory/context";
import {
  CONTENT_NAME,
  DIALOG_NAME,
  PORTAL_NAME,
  TITLE_NAME,
  TITLE_WARNING_NAME,
} from "./constants";
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

/******************************************************
 * Warning Provider
 ******************************************************/
const [WarningProvider, useWarningContext] = createContext(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME,
  titleName: TITLE_NAME,
  docsSlug: "dialog",
});

export type { ScopedProps };
export {
  DialogProvider,
  PortalProvider,
  WarningProvider,
  createDialogScope,
  useDialogContext,
  usePortalContext,
  useWarningContext,
};

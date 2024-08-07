import type { MutableRefObject } from "react";
import { createDialogScope } from "@allygory/dialog";
import { createContextScope } from "@allygory/context";
import type { AlertCancelElement } from "../cancel";
import { ROOT_NAME, CONTENT_NAME } from "./constants";

/**************************************************************
 * Alert Context
 **************************************************************/
const [createAlertContext, createAlertScope] = createContextScope(ROOT_NAME, [
  createDialogScope,
]);
const useDialogScope = createDialogScope();

/**************************************************************
 * Content Context
 **************************************************************/
type AlertContentContextValue = {
  cancelRef: MutableRefObject<AlertCancelElement | null>;
};
const [AlertContentProvider, useAlertContentContext] =
  createAlertContext<AlertContentContextValue>(CONTENT_NAME);

export type { AlertContentContextValue };
export {
  createAlertContext,
  createAlertScope,
  useDialogScope,
  useAlertContentContext,
  AlertContentProvider,
};

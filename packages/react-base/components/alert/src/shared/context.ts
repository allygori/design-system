import { MutableRefObject } from "react";
import { createDialogScope } from "@allygory/dialog";
import { createContextScope } from "@allygory/context";
import { ROOT_NAME, CONTENT_NAME } from "./constants";
import type { AlertCancelElement } from "../cancel";

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

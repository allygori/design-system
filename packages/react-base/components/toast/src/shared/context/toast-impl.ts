import { TOAST_NAME } from "../constants";
import { createToastContext } from "./toast";

const [ToastInteractiveProvider, useToastInteractiveContext] =
  createToastContext(TOAST_NAME, {
    onClose() {},
  });

export {
  useToastInteractiveContext,
  //
  ToastInteractiveProvider,
};

import { TOAST_NAME } from "../constants";
import { createToastContext } from "./toast";

const [ToastInteractiveProvider, useToastInteractiveContext] = createToastContext(
  TOAST_NAME,
  {
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- ignore
    onClose() {},
  },
);

export {
  useToastInteractiveContext,
  //
  ToastInteractiveProvider,
};

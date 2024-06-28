import ToastProvider, { type ToastProviderProps } from "./provider";
import Toast, { type ToastProps } from "./toast";
import ToastViewport, { type ToastViewportProps } from "./viewport";
import ToastTitle, { type ToastTitleProps } from "./title";
import ToastDescription, { type ToastDescriptionProps } from "./description";
import ToastAction, { type ToastActionProps } from "./action";
import ToastClose, { type ToastCloseProps } from "./close";
import { createToastScope } from "./shared/context";

const Provider = ToastProvider;
const Root = Toast;
const Viewport = ToastViewport;
const Title = ToastTitle;
const Description = ToastDescription;
const Action = ToastAction;
const Close = ToastClose;

export type {
  ToastProviderProps,
  ToastProps,
  ToastViewportProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastActionProps,
  ToastCloseProps,
};
export {
  createToastScope,
  //
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  //
  Provider,
  Viewport,
  Root,
  Title,
  Description,
  Action,
  Close,
};

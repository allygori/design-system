import Root, { type RootProps } from "./root";
import Trigger, { type TriggerProps } from "./trigger";
import Portal, { type PortalProps } from "./portal";
import Overlay, { type OverlayProps } from "./overlay";
import Content, { type ContentProps } from "./content";
import Close, { type CloseProps } from "./close";
import Confirm, { type ConfirmProps } from "./confirm";
import { createRootScope as createActionSheetScope } from "./shared/context";

const ActionSheet = Root;
const ActionSheetTrigger = Trigger;
const ActionSheetPortal = Portal;
const ActionSheetOverlay = Overlay;
const ActionSheetContent = Content;
const ActionSheetClose = Close;
const ActionSheetConfirm = Confirm;

export type {
  RootProps as ActopnSheetProps,
  TriggerProps as ActionSheetTriggerProps,
  PortalProps as ActionSheetPortalProps,
  OverlayProps as ActionSheetOverlayProps,
  ContentProps as ActionSheetContentProps,
  CloseProps as ActionSheetCloseProps,
  ConfirmProps as ActionSheetConfirmProps,
};
export {
  createActionSheetScope,
  //
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Close,
  Confirm,
  //
  ActionSheet,
  ActionSheetTrigger,
  ActionSheetPortal,
  ActionSheetOverlay,
  ActionSheetContent,
  ActionSheetClose,
  ActionSheetConfirm,
};

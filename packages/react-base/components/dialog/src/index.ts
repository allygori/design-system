"use client";

import { createRootScope } from "./shared/context";
import Root, { type RootProps } from "./root";
import Trigger, { type TriggerProps } from "./trigger";
import Portal, { type PortalProps } from "./portal";
import Overlay, { type OverlayProps } from "./overlay";
import Content, { type ContentProps } from "./content";
import Title, { type TitleProps } from "./title";
import TitleWarning, { type TitleWarningProps } from "./title-warning";
import Description, { type DescriptionProps } from "./description";
import DescriptionWarning, { type DescriptionWarningProps } from "./description-warning";
import Close, { type CloseProps } from "./close";
import { WarningProvider } from "./shared/context";

const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogOverlay = Overlay;
const DialogContent = Content;
const DialogTitle = Title;
const DialogTitleWarning = TitleWarning;
const DialogDescription = Description;
const DialogDescriptionWarning = DescriptionWarning;
const DialogClose = Close;

export type {
  RootProps as DialogRootProps,
  TriggerProps as DialogTriggerProps,
  PortalProps as DialogPortalProps,
  OverlayProps as DialogOverlayProps,
  ContentProps as DialogContentProps,
  TitleProps as DialogTitleProps,
  TitleWarningProps as DialogTitleWarningProps,
  DescriptionProps as DialogDescriptionProps,
  DescriptionWarningProps as DialogDescriptionWarningProps,
  CloseProps as DialogCloseProps,
};
export {
  createRootScope as createDialogScope,
  //
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogTitleWarning,
  DialogDescription,
  DialogDescriptionWarning,
  DialogClose,
  //
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  TitleWarning,
  Description,
  DescriptionWarning,
  Close,
  //
  WarningProvider,
};

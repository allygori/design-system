"use client";

import { createDialogScope } from "./shared/context";
import Dialog, { type DialogProps } from "./root";
import DialogTrigger, { type DialogTriggerProps } from "./trigger";
import DialogPortal, { type DialogPortalProps } from "./portal";
import DialogOverlay, { type DialogOverlayProps } from "./overlay";
import DialogContent, { type DialogContentProps } from "./content";
import DialogTitle, { type DialogTitleProps } from "./title";
import DialogTitleWarning, {
  type DialogTitleWarningProps,
} from "./title-warning";
import DialogDescription, { type DialogDescriptionProps } from "./description";
import DialogDescriptionWarning, {
  type DialogDescriptionWarningProps,
} from "./description-warning";
import DialogClose, { type DialogCloseProps } from "./close";
import { WarningProvider } from "./shared/context";

export {
  createDialogScope,
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
  Dialog as Root,
  DialogTrigger as Trigger,
  DialogPortal as Portal,
  DialogOverlay as Overlay,
  DialogContent as Content,
  DialogTitle as Title,
  DialogTitleWarning as TitleWarning,
  DialogDescription as Description,
  DialogDescriptionWarning as DescriptionWarning,
  DialogClose as Close,
  //
  WarningProvider,
};
export type {
  DialogProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogTitleProps,
  DialogTitleWarningProps,
  DialogDescriptionProps,
  DialogDescriptionWarningProps,
  DialogCloseProps,
};

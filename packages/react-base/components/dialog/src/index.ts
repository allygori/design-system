"use client";

import { createDialogScope } from "./lib/context";

import Dialog, { type DialogProps } from "./dialog-root";
import DialogTrigger, { type DialogTriggerProps } from "./dialog-trigger";
import DialogPortal, { type DialogPortalProps } from "./dialog-portal";
import DialogOverlay, { type DialogOverlayProps } from "./dialog-overlay";
import DialogContent, { type DialogContentProps } from "./dialog-content";
import DialogDescription, {
  type DialogDescriptionProps,
} from "./dialog-description";
import DialogTitle, { type DialogTitleProps } from "./dialog-title";
import DialogClose, { type DialogCloseProps } from "./dialog-close";

export {
  createDialogScope,
  //
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
  //
  Dialog as Root,
  DialogTrigger as Trigger,
  DialogPortal as Portal,
  DialogOverlay as Overlay,
  DialogContent as Content,
  DialogDescription as Description,
  DialogTitle as Title,
  DialogClose as Close,
};
export type {
  DialogProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogTitleProps,
  DialogCloseProps,
};

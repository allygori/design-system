import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as Dialog from "@allygory/dialog";
import { Overlay } from "@allygory/dialog";
import { OVERLAY_NAME } from "./shared/constants";
import { useDialogScope } from "./shared/context";
import type { ScopedProps } from "./shared/types";

type AlertOverlayElement = ElementRef<typeof Overlay>;
type AlertOverlayProps = ComponentPropsWithoutRef<typeof Overlay>;

const AlertOverlay = forwardRef<AlertOverlayElement, AlertOverlayProps>(
  (props: ScopedProps<AlertOverlayProps>, forwardedRef) => {
    const { __scopeAlert, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlert);

    return (
      <Dialog.Overlay ref={forwardedRef} {...dialogScope} {...overlayProps} />
    );
  },
);

AlertOverlay.displayName = OVERLAY_NAME;

export type { AlertOverlayProps, AlertOverlayElement };
export default AlertOverlay;

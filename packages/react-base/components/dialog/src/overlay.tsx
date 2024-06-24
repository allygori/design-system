import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import Presence from "@allygory/presence";
import Element from "@allygory/element";
import {
  ScopedProps,
  useDialogContext,
  usePortalContext,
} from "./shared/context";
import DialogOverlayImpl from "./overlay-impl";
import { OVERLAY_NAME } from "./shared/constants";

type DialogOverlayElement = ElementRef<typeof Element.div>;
type DialogOverlayProps = ComponentPropsWithoutRef<typeof Element.div> & {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
};

const DialogOverlay = forwardRef<DialogOverlayElement, DialogOverlayProps>(
  (props: ScopedProps<DialogOverlayProps>, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;

    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);

    return context.modal ? (
      <Presence present={forceMount || context.open}>
        <DialogOverlayImpl ref={forwardedRef} {...overlayProps} />
      </Presence>
    ) : null;
  },
);

DialogOverlay.displayName = OVERLAY_NAME;

export type { DialogOverlayProps };
export default DialogOverlay;

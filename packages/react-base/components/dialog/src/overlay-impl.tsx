import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { RemoveScroll } from "react-remove-scroll";
import Slot from "@allygory/slot";
import Element from "@allygory/element";
import { ScopedProps, useDialogContext } from "./shared/context";
import { getState } from "./shared/utils";
import { OVERLAY_NAME } from "./shared/constants";

type DialogOverlayImplElement = ElementRef<typeof Element.div>;
type DialogOverlayImplProps = ComponentPropsWithoutRef<typeof Element.div>;

const DialogOverlayImpl = forwardRef<
  DialogOverlayImplElement,
  DialogOverlayImplProps
>((props: ScopedProps<DialogOverlayImplProps>, forwardedRef) => {
  const { __scopeDialog, ...overlayProps } = props;
  const context = useDialogContext(OVERLAY_NAME, __scopeDialog);

  return (
    // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
    // ie. when `Overlay` and `Content` are siblings
    <RemoveScroll as={Slot} allowPinchZoom shards={[context.contentRef]}>
      <Element.div
        data-state={getState(context.open)}
        {...overlayProps}
        ref={forwardedRef}
        // We re-enable pointer-events prevented by `Dialog.Content` to allow scrolling the overlay.
        style={{ pointerEvents: "auto", ...overlayProps.style }}
      />
    </RemoveScroll>
  );
});

DialogOverlayImpl.displayName = OVERLAY_NAME;

export type { DialogOverlayImplElement, DialogOverlayImplProps };
export default DialogOverlayImpl;

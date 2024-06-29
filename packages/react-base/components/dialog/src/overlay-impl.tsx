import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { RemoveScroll } from "react-remove-scroll";
import Slot from "@allygory/slot";
import Element from "@allygory/element";
import { OVERLAY_NAME } from "./shared/constants";
import { getState } from "./shared/utils";
import { type ScopedProps, useRootContext } from "./shared/context";

type OverlayImplElement = ElementRef<typeof Element.div>;
type OverlayImplProps = ComponentPropsWithoutRef<typeof Element.div>;

const OverlayImpl = forwardRef<OverlayImplElement, OverlayImplProps>(
  (props: ScopedProps<OverlayImplProps>, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useRootContext(OVERLAY_NAME, __scopeDialog);

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
  },
);

OverlayImpl.displayName = OVERLAY_NAME;

export type { OverlayImplElement, OverlayImplProps };
export default OverlayImpl;

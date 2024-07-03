import type { ComponentPropsWithRef, ElementRef } from "react";
import { forwardRef } from "react";
import Element from "@allygory/element";
import { OVERLAY_NAME } from "./shared/constants";
import { useRootContext } from "./shared/context";
import { getState } from "./shared/utils";
import type { ScopedProps } from "./shared/context";

type OverlayImplElement = ElementRef<typeof Element.div>;
type OverlayImplProps = ComponentPropsWithRef<typeof Element.div>;

const OverlayImpl = forwardRef<OverlayImplElement, OverlayImplProps>(
  (props: ScopedProps<OverlayImplProps>, forwardedRef) => {
    const { __scopeActionSheet, ...overlayProps } = props;
    const context = useRootContext(OVERLAY_NAME, __scopeActionSheet);

    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      <Element.div
        data-state={getState(context.open)}
        {...overlayProps}
        ref={forwardedRef}
        // We re-enable pointer-events prevented by `Dialog.Content` to allow scrolling the overlay.
        style={{ pointerEvents: "auto", ...overlayProps.style }}
      />
    );
  },
);

OverlayImpl.displayName = "ActionSheetOverlayImpl";

export type { OverlayImplElement, OverlayImplProps };
export default OverlayImpl;

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import Presence from "@allygory/presence";
import Element from "@allygory/element";
import { OVERLAY_NAME } from "./shared/constants";
import { type ScopedProps, useRootContext, usePortalContext } from "./shared/context";
import OverlayImpl from "./overlay-impl";

type OverlayElement = ElementRef<typeof Element.div>;
type OverlayProps = ComponentPropsWithoutRef<typeof Element.div> & {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
};

const Overlay = forwardRef<OverlayElement, OverlayProps>(
  (props: ScopedProps<OverlayProps>, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;

    const context = useRootContext(OVERLAY_NAME, props.__scopeDialog);

    return context.modal ? (
      <Presence present={forceMount || context.open}>
        <OverlayImpl ref={forwardedRef} {...overlayProps} />
      </Presence>
    ) : null;
  },
);

Overlay.displayName = OVERLAY_NAME;

export type { OverlayElement, OverlayProps };
export default Overlay;

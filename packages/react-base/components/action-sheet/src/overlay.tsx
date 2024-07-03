import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import type Element from "@allygory/element";
import Presence from "@allygory/presence";
import { OVERLAY_NAME } from "./shared/constants";
import { usePortalContext, useRootContext } from "./shared/context";
import type { ScopedProps } from "./shared/context";
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
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeActionSheet);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useRootContext(OVERLAY_NAME, props.__scopeActionSheet);

    return context.modal ? (
      <Presence present={forceMount || context.open}>
        <OverlayImpl {...overlayProps} ref={forwardedRef} />
      </Presence>
    ) : null;
  },
);

Overlay.displayName = OVERLAY_NAME;

export type { OverlayElement, OverlayProps };
export default Overlay;

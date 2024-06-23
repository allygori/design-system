import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Element from "@allygory/element";
import useLayoutEffect from "@allygory/use-layout-effect";

const DISPLAY_NAME = "Portal";

type PortalElement = ElementRef<typeof Element.div>;
type ElementDivProps = ComponentPropsWithoutRef<typeof Element.div>;
type PortalProps = ElementDivProps & {
  container?: Element | null;
};

const Portal = forwardRef<PortalElement, PortalProps>((props, forwardRef) => {
  const { container: containerProp, ...portalProps } = props;
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => setMounted(true), []);

  const container = containerProp || (mounted && globalThis?.document?.body);

  return container
    ? createPortal(<Element.div {...portalProps} ref={forwardRef} />, container)
    : null;
});

Portal.displayName = DISPLAY_NAME;

export type { PortalProps };
export default Portal;

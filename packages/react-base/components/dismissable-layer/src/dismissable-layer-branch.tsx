import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef, useContext, useEffect, useRef } from "react";
import Element from "@allygory/element";
import useComposeRefs from "@allygory/use-compose-refs";
import DismissableLayerContext from "./lib/context";

const DISPLAY_NAME = "DismissableLayerBranch";

type DismissableLayerBranchElement = ElementRef<typeof Element.div>;
type DismissableLayerBranchProps = ComponentPropsWithoutRef<typeof Element.div>;

const DismissableLayerBranch = forwardRef<
  DismissableLayerBranchElement,
  DismissableLayerBranchProps
>((props, forwardedRef) => {
  const context = useContext(DismissableLayerContext);
  const ref = useRef<DismissableLayerBranchElement>(null);
  const composeRefs = useComposeRefs(forwardedRef, ref);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      context.branches.add(node);

      return () => {
        context.branches.delete(node);
      };
    }
  }, [context.branches]);

  return <Element.div {...props} ref={composeRefs} />;
});

DismissableLayerBranch.displayName = DISPLAY_NAME;

export type { DismissableLayerBranchElement, DismissableLayerBranchProps };
export default DismissableLayerBranch;

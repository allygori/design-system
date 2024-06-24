import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import Element from "@allygory/element";
import useComposedRefs from "@allygory/use-compose-refs";
import { ScopedProps, useCollapsibleContext } from "./shared/context";
import { CONTENT_NAME } from "./shared/constants";
import useLayoutEffect from "@allygory/use-layout-effect";
import { getState } from "./shared/utils";

type CollapsibleContentImplElement = ElementRef<typeof Element.div>;
type CollapsibleContentImplProps = ComponentPropsWithoutRef<
  typeof Element.div
> & {
  present: boolean;
};

const CollapsibleContentImpl = forwardRef<
  CollapsibleContentImplElement,
  CollapsibleContentImplProps
>((props: ScopedProps<CollapsibleContentImplProps>, forwardedRef) => {
  const { __scopeCollapsible, present, children, ...contentProps } = props;
  const context = useCollapsibleContext(CONTENT_NAME, __scopeCollapsible);
  const [isPresent, setIsPresent] = useState(present);
  const ref = useRef<CollapsibleContentImplElement>(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const heightRef = useRef<number | undefined>(0);
  const height = heightRef.current;
  const widthRef = useRef<number | undefined>(0);
  const width = widthRef.current;
  // when opening we want it to immediately open to retrieve dimensions
  // when closing we delay `present` to retrieve dimensions before closing
  const isOpen = context.open || isPresent;
  const isMountAnimationPreventedRef = useRef(isOpen);
  const originalStyleRef = useRef<Record<string, string>>();

  useEffect(() => {
    const rAF = requestAnimationFrame(
      () => (isMountAnimationPreventedRef.current = false),
    );
    return () => cancelAnimationFrame(rAF);
  }, []);

  useLayoutEffect(() => {
    const node = ref.current;
    if (node) {
      originalStyleRef.current = originalStyleRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName,
      };
      // block any animations/transitions so the element renders at its full dimensions
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";

      // get width and height from full dimensions
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;

      // kick off any animations/transitions that were originally set up if it isn't the initial mount
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration =
          originalStyleRef.current.transitionDuration;
        node.style.animationName = originalStyleRef.current.animationName;
      }

      setIsPresent(present);
    }
    /**
     * depends on `context.open` because it will change to `false`
     * when a close is triggered but `present` will be `false` on
     * animation end (so when close finishes). This allows us to
     * retrieve the dimensions *before* closing.
     */
  }, [context.open, present]);

  return (
    <Element.div
      ref={composedRefs}
      data-state={getState(context.open)}
      data-disabled={context.disabled ? "" : undefined}
      id={context.contentId}
      hidden={!isOpen}
      {...contentProps}
      style={{
        [`--allygory-collapsible-content-height` as any]: height
          ? `${height}px`
          : undefined,
        [`--allygory-collapsible-content-width` as any]: width
          ? `${width}px`
          : undefined,
        ...props.style,
      }}
    >
      {isOpen && children}
    </Element.div>
  );
});

CollapsibleContentImpl.displayName = "CollapsibleContentImpl";

export type { CollapsibleContentImplElement, CollapsibleContentImplProps };
export default CollapsibleContentImpl;

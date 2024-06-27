import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import Element from "@allygory/element";

const NAME = "VisuallyHidden";

type VisuallyHiddenElement = ElementRef<typeof Element.span>;
type VisuallyHiddenProps = ComponentPropsWithoutRef<typeof Element.span>;

const VisuallyHidden = forwardRef<VisuallyHiddenElement, VisuallyHiddenProps>(
  (props, forwardedRef) => {
    return (
      <Element.span
        {...props}
        ref={forwardedRef}
        style={{
          position: "absolute",
          border: 0,
          width: 1,
          height: 1,
          padding: 1,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          wordWrap: "normal",
          ...props.style,
        }}
      />
    );
  },
);

VisuallyHidden.displayName = NAME;

export type { VisuallyHiddenElement, VisuallyHiddenProps };
export default VisuallyHidden;

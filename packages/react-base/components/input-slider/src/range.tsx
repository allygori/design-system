import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef, useRef } from "react";
import Element from "@allygory/element";
import useComposeRefs from "@allygory/use-compose-refs";
import { RANGE_NAME } from "./shared/constants";
import { convertValueToPercentage } from "./shared/utils";
import { useOrientationContext, useRootContext } from "./shared/context";
import type { ScopedProps } from "./shared/context";

type RangeElement = ElementRef<typeof Element.span>;
type RangeProps = ComponentPropsWithoutRef<typeof Element.span>;

const Range = forwardRef<RangeElement, RangeProps>(
  (props: ScopedProps<RangeProps>, forwardedRef) => {
    const { __scopeSlider, ...rangeProps } = props;
    const context = useRootContext(RANGE_NAME, __scopeSlider);
    const orientation = useOrientationContext(RANGE_NAME, __scopeSlider);
    const ref = useRef<HTMLSpanElement>(null);
    const composedRefs = useComposeRefs(forwardedRef, ref);
    const valuesCount = context.values.length;
    const percentages: number[] = context.values.map((value) => {
      return convertValueToPercentage(value, context.min, context.max);
    });
    const offsetStart = valuesCount > 1 ? Math.min(...percentages) : 0;
    const offsetEnd = 100 - Math.max(...percentages);

    return (
      <Element.span
        data-disabled={context.disabled ? "" : undefined}
        data-orientation={context.orientation}
        {...rangeProps}
        ref={composedRefs}
        style={{
          ...props.style,
          [orientation.startEdge]: `${offsetStart}%`,
          [orientation.endEdge]: `${offsetEnd}%`,
        }}
      />
    );
  },
);

Range.displayName = RANGE_NAME;

export type { RangeElement, RangeProps };
export default Range;

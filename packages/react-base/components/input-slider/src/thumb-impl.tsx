import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import Element, { composeEventHandlers } from "@allygory/element";
import useComposeRefs from "@allygory/use-compose-refs";
import useSize from "@allygory/use-size";
import BubbleInput from "./buble-input";
import { THUMB_NAME } from "./shared/constants";
import {
  Collection,
  useOrientationContext,
  useRootContext,
  type ScopedProps,
} from "./shared/context";
import {
  convertValueToPercentage,
  getLabel,
  getThumbInBoundsOffset,
} from "./shared/utils";

type ThumbImplElement = ElementRef<typeof Element.span>;
type ThumbImplProps = ComponentPropsWithoutRef<typeof Element.span> & {
  index: number;
  name?: string;
};

const ThumbImpl = forwardRef<ThumbImplElement, ThumbImplProps>(
  (props: ScopedProps<ThumbImplProps>, forwardedRef) => {
    const { __scopeSlider, index, name, ...thumbProps } = props;
    const context = useRootContext(THUMB_NAME, __scopeSlider);
    const orientation = useOrientationContext(THUMB_NAME, __scopeSlider);
    const [thumb, setThumb] = useState<HTMLSpanElement | null>(null);
    const composedRefs = useComposeRefs(forwardedRef, (node) => {
      setThumb(node);
    });
    // We set this to true by default so that events bubble to forms without JS (SSR)
    const isFormControl = thumb ? Boolean(thumb.closest("form")) : true;
    const size = useSize(thumb);
    // We cast because index could be `-1` which would return undefined
    const value = context.values[index] as number | undefined;
    const percent =
      value === undefined ? 0 : convertValueToPercentage(value, context.min, context.max);
    const label = getLabel(index, context.values.length);
    const orientationSize = size?.[orientation.size];
    const thumbInBoundOffset = orientationSize
      ? getThumbInBoundsOffset(orientationSize, percent, orientation.direction)
      : 0;

    useEffect(() => {
      if (thumb) {
        context.thumbs.add(thumb);
        return () => {
          context.thumbs.delete(thumb);
        };
      }
    }, [thumb, context.thumbs]);

    return (
      <span
        style={{
          transform: "var(--allygory-slider-thumb-transform)",
          position: "absolute",
          [orientation.startEdge]: `calc(${percent}% + ${thumbInBoundOffset}px)`,
        }}
      >
        <Collection.ItemSlot scope={__scopeSlider}>
          <Element.span
            aria-label={thumbProps["aria-label"] || label}
            aria-orientation={context.orientation}
            aria-valuemax={context.max}
            aria-valuemin={context.min}
            aria-valuenow={value}
            data-disabled={context.disabled ? "" : undefined}
            data-orientation={context.orientation}
            role="slider"
            tabIndex={context.disabled ? undefined : 0}
            {...thumbProps}
            ref={composedRefs}
            /**
             * There will be no value on initial render while we work out the index so we hide thumbs
             * without a value, otherwise SSR will render them in the wrong position before they
             * snap into the correct position during hydration which would be visually jarring for
             * slower connections.
             */
            style={value === undefined ? { display: "none" } : thumbProps.style}
            onFocus={composeEventHandlers(thumbProps.onFocus, () => {
              context.valueIndexToChangeRef.current = index;
            })}
          />
        </Collection.ItemSlot>

        {isFormControl ? (
          <BubbleInput
            key={index}
            name={
              name ??
              (context.name
                ? context.name + (context.values.length > 1 ? "[]" : "")
                : undefined)
            }
            value={value}
          />
        ) : null}
      </span>
    );
  },
);

ThumbImpl.displayName = `${THUMB_NAME}Impl`;

export type { ThumbImplElement, ThumbImplProps };
export default ThumbImpl;

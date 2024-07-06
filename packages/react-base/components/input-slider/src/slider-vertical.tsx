import { forwardRef, useRef } from "react";
import useComposeRefs from "@allygory/use-compose-refs";
import type { SliderImplElement } from "./slider-impl";
import type { SliderOrientationProps } from "./slider-horizontal";
import { OrientationProvider, type ScopedProps } from "./shared/context";
import { BACK_KEYS, ROOT_NAME } from "./shared/constants";
import { linearScale } from "./shared/utils";
import SliderImpl from "./slider-impl";

type SliderVerticalElement = SliderImplElement;
type SliderVerticalProps = SliderOrientationProps;

const SliderVertical = forwardRef<SliderVerticalElement, SliderVerticalProps>(
  (props: ScopedProps<SliderVerticalProps>, forwardedRef) => {
    const {
      min,
      max,
      inverted,
      onSlideStart,
      onSlideMove,
      onSlideEnd,
      onStepKeyDown,
      ...sliderProps
    } = props;
    const sliderRef = useRef<SliderImplElement>(null);
    const ref = useComposeRefs(forwardedRef, sliderRef);
    const rectRef = useRef<ClientRect>();
    const isSlisingFromBottom = !inverted;

    const getValueFromPointer = (pointerPosition: number): number => {
      const rect = rectRef.current || sliderRef.current?.getBoundingClientRect();
      const input: [number, number] = [0, rect?.height ?? 0];
      const output: [number, number] = isSlisingFromBottom ? [max, min] : [min, max];
      const value = linearScale(input, output);

      rectRef.current = rect;
      return value(pointerPosition - (rect?.top || 0));
    };

    return (
      <OrientationProvider
        direction={isSlisingFromBottom ? 1 : -1}
        endEdge={isSlisingFromBottom ? "top" : "bottom"}
        scope={props.__scopeSlider}
        size="height"
        startEdge={isSlisingFromBottom ? "bottom" : "top"}
      >
        <SliderImpl
          data-orientation="vertical"
          {...sliderProps}
          ref={ref}
          style={{
            ...sliderProps.style,
            ["--allygory-slider-thumb-transform" as never]: "translateY(50%)",
          }}
          onSlideEnd={() => {
            rectRef.current = undefined;
            onSlideEnd?.();
          }}
          onSlideMove={(event) => {
            const value = getValueFromPointer(event.clientY);
            onSlideMove?.(value);
          }}
          onSlideStart={(event) => {
            const value = getValueFromPointer(event.clientY);
            onSlideStart?.(value);
          }}
          onStepKeyDown={(event) => {
            const slideDirection = isSlisingFromBottom ? "from-bottom" : "from-top";
            const isBackKey = BACK_KEYS[slideDirection].includes(event.key);
            onStepKeyDown({ event, direction: isBackKey ? -1 : 1 });
          }}
        />
      </OrientationProvider>
    );
  },
);

SliderVertical.displayName = `${ROOT_NAME}Vertical`;

export type { SliderVerticalElement, SliderVerticalProps };
export default SliderVertical;

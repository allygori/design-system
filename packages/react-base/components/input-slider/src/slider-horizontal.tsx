import { forwardRef, useRef, useState, type KeyboardEvent } from "react";
import useComposeRefs from "@allygory/use-compose-refs";
// import useDirection from "@allygory/use-direction";
import { useDirection, type Direction } from "@allygory/use-direction";
// import type { Direction } from "@allygory/use-direction";
// import type { Direction } from "./shared/types";
import type {
  SliderImplElement,
  SliderImplProps,
  SliderImplPrivateProps,
} from "./slider-impl";
import SliderImpl from "./slider-impl";
import { type ScopedProps, OrientationProvider } from "./shared/context";
import { BACK_KEYS, ROOT_NAME } from "./shared/constants";
import { linearScale } from "./shared/utils";

type SliderOrientationPrivateProps = {
  min: number;
  max: number;
  inverted: boolean;
  onSlideStart?: (value: number) => void;
  onSlideMove?: (value: number) => void;
  onSlideEnd?: () => void;
  onHomeKeyDown: (event: KeyboardEvent) => void;
  onEndKeyDown: (event: KeyboardEvent) => void;
  onStepKeyDown: (step: { event: KeyboardEvent; direction: number }) => void;
};
type SliderHorizontalElement = SliderImplElement;
type SliderOrientationProps = Omit<SliderImplProps, keyof SliderImplPrivateProps> &
  SliderOrientationPrivateProps;
type SliderHorizontalProps = SliderOrientationProps & {
  dir?: Direction;
};

const SliderHorizontal = forwardRef<SliderHorizontalElement, SliderHorizontalProps>(
  (props: ScopedProps<SliderHorizontalProps>, forwardedRef) => {
    const {
      min,
      max,
      dir,
      inverted,
      onSlideStart,
      onSlideMove,
      onSlideEnd,
      onStepKeyDown,
      ...sliderProps
    } = props;
    const [slider, setSlider] = useState<SliderImplElement | null>(null);
    const composedRefs = useComposeRefs(forwardedRef, (node) => {
      setSlider(node);
    });
    const rectRef = useRef<ClientRect>();
    const direction = useDirection(dir);
    const isDirectionLTR = direction === "ltr";
    const isSliddingFromLeft =
      (isDirectionLTR && !inverted) || (!isDirectionLTR && inverted);

    const getValueFromPointer = (pointerPosition: number): number => {
      const rect = rectRef.current || slider?.getBoundingClientRect();
      const input: [number, number] = [0, rect?.width ?? 0];
      const output: [number, number] = isSliddingFromLeft ? [min, max] : [max, min];
      const value = linearScale(input, output);

      rectRef.current = rect;
      return value(pointerPosition - (rect?.left ?? 0));
    };

    return (
      <OrientationProvider
        direction={isSliddingFromLeft ? 1 : -1}
        endEdge={isSliddingFromLeft ? "right" : "left"}
        scope={props.__scopeSlider}
        size="width"
        startEdge={isSliddingFromLeft ? "left" : "right"}
      >
        <SliderImpl
          data-orientation="horizontal"
          dir={direction}
          {...sliderProps}
          ref={composedRefs}
          style={{
            ...sliderProps.style,
            ["--allygory-slider-thumb-transform" as never]: "translateX(-50%)",
          }}
          onSlideEnd={() => {
            rectRef.current = undefined;
            onSlideEnd?.();
          }}
          onSlideMove={(event) => {
            const value = getValueFromPointer(event.clientX);
            onSlideMove?.(value);
          }}
          onSlideStart={(event) => {
            const value = getValueFromPointer(event.clientX);
            onSlideStart?.(value);
          }}
          onStepKeyDown={(event) => {
            const slideDirection = isSliddingFromLeft ? "from-left" : "from-right";
            const isBackKey = BACK_KEYS[slideDirection].includes(event.key);
            onStepKeyDown({ event, direction: isBackKey ? -1 : 1 });
          }}
        />
      </OrientationProvider>
    );
  },
);

SliderHorizontal.displayName = `${ROOT_NAME}Horizontal`;

export type {
  SliderHorizontalElement,
  SliderHorizontalProps,
  SliderOrientationPrivateProps,
  SliderOrientationProps,
};
export default SliderHorizontal;

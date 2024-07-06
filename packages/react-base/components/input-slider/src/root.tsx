/* eslint-disable @typescript-eslint/no-empty-function  -- ignore*/
import { forwardRef, useRef, type AriaAttributes } from "react";
import type { Direction } from "@allygory/use-direction";
import useControllableState from "@allygory/use-controllable-state";
import { composeEventHandlers } from "@allygory/element";
import type {
  SliderHorizontalElement,
  SliderHorizontalProps,
  SliderOrientationPrivateProps,
} from "./slider-horizontal";
import type { ScopedProps } from "./shared/context";
import { ARROW_KEYS, PAGE_KEYS, ROOT_NAME } from "./shared/constants";
import {
  clamp,
  getClosestValueIndex,
  getDecimalCount,
  getNextSortedValues,
  hasMinStepsBetweenValues,
  roundValue,
} from "./shared/utils";
import {
  RootProvider,
  Collection,
  type RootContextValue,
} from "./shared/context/root.context";
import SliderHorizontal from "./slider-horizontal";
import SliderVertical from "./slider-vertical";
import type { SliderVerticalElement, SliderVerticalProps } from "./slider-vertical";

// eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents -- ignore
type RootElement = SliderHorizontalElement | SliderVerticalElement;
type RootProps = Omit<
  SliderHorizontalProps | SliderVerticalProps,
  keyof SliderOrientationPrivateProps | "defaultValue"
> & {
  name?: string;
  disabled?: boolean;
  inverted?: boolean;
  orientation?: AriaAttributes["aria-orientation"];
  dir?: Direction;
  min?: number;
  max?: number;
  step?: number;
  minStepsBetweenThumbs?: number;
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
};

const Root = forwardRef<RootElement, RootProps>(
  (props: ScopedProps<RootProps>, forwardedRef) => {
    const {
      __scopeSlider,
      name,
      value,
      min = 0,
      max = 100,
      step = 1,
      orientation = "horizontal",
      minStepsBetweenThumbs = 0,
      defaultValue = [min],
      disabled = false,
      inverted = false,
      onValueChange = () => {},
      onValueCommit = () => {},
      ...rootProps
    } = props;
    const thumbRefs = useRef<RootContextValue["thumbs"]>(new Set());
    const valueIndexToChangeRef = useRef<number>(0);
    const isHorizontal = orientation === "horizontal";
    const SliderOrientation = isHorizontal ? SliderHorizontal : SliderVertical;

    const [values = [], setValues] = useControllableState({
      prop: value,
      defaultProp: defaultValue,
      onChange: (val) => {
        const thumbs = [...thumbRefs.current];
        thumbs[valueIndexToChangeRef.current]?.focus();
        onValueChange(val);
      },
    });
    const valuesBeforeSlideStartRef = useRef(values);

    const handleSlideStart = (val: number): void => {
      const closestIndex = getClosestValueIndex(values, val);
      updateValues(val, closestIndex);
    };

    const handleSlideMove = (val: number): void => {
      updateValues(val, valueIndexToChangeRef.current);
    };

    const handleSlideEnd = (): void => {
      const prevValue = valuesBeforeSlideStartRef.current[valueIndexToChangeRef.current];
      const nextValue = values[valueIndexToChangeRef.current];
      const hasChanged = nextValue !== prevValue;
      if (hasChanged) onValueCommit(values);
    };

    const updateValues = (
      val: number,
      atIndex: number,
      { commit } = { commit: false },
    ): void => {
      const decimalCount = getDecimalCount(step);
      const snapToStep = roundValue(
        Math.round((val - min) / step) * step + min,
        decimalCount,
      );
      const nextValue = clamp(snapToStep, [min, max]);

      setValues((prevValues = []) => {
        const nextValues = getNextSortedValues(nextValue, atIndex, prevValues);

        if (hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs * step)) {
          valueIndexToChangeRef.current = nextValues.indexOf(nextValue);
          const hasChanged = String(nextValues) !== String(prevValues);
          if (hasChanged && commit) onValueCommit(nextValues);
          return hasChanged ? nextValues : prevValues;
        }
        return prevValues;
      });
    };

    return (
      <RootProvider
        disabled={disabled}
        max={max}
        min={min}
        name={name}
        orientation={orientation}
        scope={__scopeSlider}
        thumbs={thumbRefs.current}
        valueIndexToChangeRef={valueIndexToChangeRef}
        values={values}
      >
        <Collection.Provider scope={__scopeSlider}>
          <Collection.Slot scope={__scopeSlider}>
            <SliderOrientation
              aria-disabled={disabled}
              data-disabled={disabled ? "" : undefined}
              {...rootProps}
              ref={forwardedRef}
              inverted={inverted}
              max={max}
              min={min}
              onEndKeyDown={() => {
                if (!disabled) {
                  updateValues(max, values.length - 1, { commit: true });
                }
              }}
              onHomeKeyDown={() => {
                if (!disabled) {
                  updateValues(min, 0, { commit: true });
                }
              }}
              onPointerDown={composeEventHandlers(rootProps.onPointerDown, () => {
                if (!disabled) valuesBeforeSlideStartRef.current = values;
              })}
              onSlideEnd={disabled ? undefined : handleSlideEnd}
              onSlideMove={disabled ? undefined : handleSlideMove}
              onSlideStart={disabled ? undefined : handleSlideStart}
              onStepKeyDown={({ event, direction: stepDirection }) => {
                if (!disabled) {
                  const isPageKey = PAGE_KEYS.includes(event.key);
                  const isSkipKey =
                    isPageKey || (event.shiftKey && ARROW_KEYS.includes(event.key));
                  const multiplier = isSkipKey ? 10 : 1;
                  const atIndex = valueIndexToChangeRef.current;
                  const val = values[atIndex];
                  const stepInDirection = step * multiplier * stepDirection;
                  updateValues(val + stepInDirection, atIndex, { commit: true });
                }
              }}
            />
          </Collection.Slot>
        </Collection.Provider>
      </RootProvider>
    );
  },
);

Root.displayName = ROOT_NAME;

export type { RootElement, RootProps };
export default Root;

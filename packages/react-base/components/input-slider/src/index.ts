import Root, { type RootProps } from "./root";
import Track, { type TrackProps } from "./track";
import Range, { type RangeProps } from "./range";
import Thumb, { type ThumbProps } from "./thumb";
import { createRootScope } from "./shared/context";

const createSliderScope = createRootScope;
const Slider = Root;
const SliderTrack = Track;
const SliderRange = Range;
const SliderThumb = Thumb;

export type {
  RootProps as SliderRootProps,
  TrackProps as SliderTrackProps,
  RangeProps as SliderRangeProps,
  ThumbProps as SliderThumbProps,
};
export {
  createSliderScope,
  //
  Slider,
  SliderTrack,
  SliderRange,
  SliderThumb,
  //
  Root,
  Track,
  Range,
  Thumb,
};

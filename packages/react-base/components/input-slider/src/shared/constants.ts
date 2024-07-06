import type { SlideDirection } from "./types";

export const ROOT_NAME = "Slider";
export const TRACK_NAME = "SliderTrack";
export const RANGE_NAME = "SliderRange";
export const THUMB_NAME = "SliderThumb";

export const PAGE_KEYS: string[] = ["PageUp", "PageDown"];
export const ARROW_KEYS: string[] = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
export const BACK_KEYS: Record<SlideDirection, string[]> = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"],
};

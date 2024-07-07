import { createTheme, style, type StyleRule } from "@vanilla-extract/css";

const [themeClass, vars] = createTheme({
  colors: {
    black: "#111",
    red: "crimson",
  },
});

const RECOMMENDED_CSS__SLIDER__ROOT: StyleRule = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  // ensures no selection
  userSelect: "none",
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: "none",
};

const RECOMMENDED_CSS__SLIDER__TRACK: StyleRule = {
  position: "relative",
  // ensures full width in horizontal orientation, ignored in vertical orientation
  flexGrow: 1,
};

const RECOMMENDED_CSS__SLIDER__RANGE: StyleRule = {
  position: "absolute",
  selectors: {
    // good default for both orientation (match track width/height respectively)
    '&[data-orientation="horizontal"]': {
      height: "100%",
    },
    '&[data-orientation="vertical"]': {
      width: "100%",
    },
  },
};

const RECOMMENDED_CSS__SLIDER__THUMB: StyleRule = {
  // ensures the thumb is sizeable
  display: "block",
  selectors: {
    // Add recommended target size regardless of styled size
    "&::before": {
      content: '""',
      position: "absolute",
      zIndex: -1,
      width: 44,
      height: 44,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
};

export const rootClass = style([
  themeClass,
  {
    ...RECOMMENDED_CSS__SLIDER__ROOT,
    selectors: {
      '&[data-orientation="horizontal"]': {
        height: 25,
      },
      '&[data-orientation="vertical"]': {
        flexDirection: "column",
        width: 25,
      },
      "&[data-disabled]": { opacity: 0.5 },
    },
  },
]);

export const trackClass = style([
  themeClass,
  {
    ...RECOMMENDED_CSS__SLIDER__TRACK,
    background: "gainsboro",
    borderRadius: 4,
    selectors: {
      '&[data-orientation="horizontal"]': {
        height: 4,
      },
      '&[data-orientation="vertical"]': {
        width: 4,
        height: 300,
      },
    },
  },
]);

export const rangeClass = style([
  themeClass,
  {
    ...RECOMMENDED_CSS__SLIDER__RANGE,
    background: vars.colors.black,
    borderRadius: "inherit",
    selectors: RECOMMENDED_CSS__SLIDER__RANGE.selectors,
  },
]);

export const thumbClass = style([
  themeClass,
  {
    ...RECOMMENDED_CSS__SLIDER__THUMB,
    borderRadius: 25,
    width: 25,
    height: 25,
    backgroundColor: vars.colors.black,
    display: "inline-grid",
    placeItems: "center",
    selectors: {
      ...RECOMMENDED_CSS__SLIDER__THUMB.selectors,
      "&:focus": {
        outline: "none",
        // boxShadow: "0 0 0 2px $colors$red",
        boxShadow: `0 0 0 2px ${vars.colors.red}`,
      },
      "&:after": {
        content: "attr(aria-valuenow)",
        position: "relative",
        fontSize: 10,
        color: "white",
      },
    },
  },
]);

export const styles = {
  backgroundColor: "rgba(0, 0, 255, 0.3)",
  border: "2px solid blue",
  padding: 10,
  selectors: {
    "&[data-disabled]": { borderStyle: "dashed" },
  },
};

export const rootAttrClass = style({ ...RECOMMENDED_CSS__SLIDER__ROOT, ...styles });
export const trackAttrClass = style({ ...RECOMMENDED_CSS__SLIDER__TRACK, ...styles });
export const rangeAttrClass = style({ ...RECOMMENDED_CSS__SLIDER__RANGE, ...styles });
export const thumbAttrClass = style({ ...RECOMMENDED_CSS__SLIDER__THUMB, ...styles });

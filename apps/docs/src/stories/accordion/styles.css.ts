import { createTheme, keyframes, style } from "@vanilla-extract/css";

// const shadowColor = createVar();

const [themeClass, vars] = createTheme({
  colors: {
    white: "#fff",
    gray100: "#ccc",
    gray300: "#aaa",
    black: "#111",
    red: "crimson",
    green: "green",
  },
});

export const rootClass = style([
  themeClass,
  {
    selectors: {
      '&[data-orientation="horizontal"]': {
        display: "flex",
        maxWidth: "40em",
        height: "50vh",
      },
      '&[data-orientation="vertical"]': {
        maxWidth: "20em",
      },
    },
    fontFamily: "sans-serif",
  },
]);

export const itemClass = style({
  selectors: {
    '&[data-orientation="horizontal"]': {
      display: "flex",
      borderRight: "1px solid white",
    },

    '&[data-orientation="vertical"]': {
      borderBottom: "1px solid white",
    },
  },
});

export const headerClass = style({
  selectors: {
    '&[data-orientation="horizontal"]': {
      height: "100%",
    },
  },
  margin: 0,
});

const RECOMMENDED_CSS__ACCORDION__TRIGGER: Record<string, string | number | object> = {
  // because it's a button, we want to stretch it
  '&[data-orientation="horizontal"]': {
    height: "100%",
  },
  '&[data-orientation="vertical"]': {
    width: "100%",
  },
  // and remove center text alignment in favour of inheriting
  textAlign: "inherit",
};

export const triggerClass = style({
  ...RECOMMENDED_CSS__ACCORDION__TRIGGER,
  boxSizing: "border-box",
  appearance: "none",
  border: "none",
  padding: 10,
  backgroundColor: vars.colors.black,
  color: "white",
  fontFamily: "inherit",
  fontSize: "1.2em",
  vars: {
    "--shadow-color": "crimson",
  },
  selectors: {
    // "--shadow-color": "crimson",

    "&:focus": {
      outline: "none",
      boxShadow: "inset 0 -5px 0 0 var(--shadow-color)",
      color: vars.colors.red,
    },

    "&[data-disabled]": {
      color: vars.colors.gray300,
    },

    '&[data-state="open"]': {
      backgroundColor: vars.colors.red,
      color: vars.colors.white,

      // "&:focus": {
      //   "--shadow-color": "#111",
      //   color: "$black",
      // },
    },

    '&[data-state="open"]:focus': {
      vars: {
        "--shadow-color": "#111",
      },
      color: vars.colors.black,
    },
  },
});

export const contentClass = style({
  padding: 10,
  lineHeight: 1.5,
});

export const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--allygory-accordion-content-height)" },
});

export const slideUp = keyframes({
  from: { height: "var(--allygory-accordion-content-height)" },
  to: { height: 0 },
});

export const open2D = keyframes({
  from: {
    width: 0,
    height: 0,
  },
  to: {
    width: "var(--allygory-accordion-content-width)",
    height: "var(--allygory-accordion-content-height)",
  },
});

export const close2D = keyframes({
  from: {
    width: "var(--allygory-accordion-content-width)",
    height: "var(--allygory-accordion-content-height)",
  },
  to: {
    width: 0,
    height: 0,
  },
});

export const animatedContentClass = style({
  overflow: "hidden",
  selectors: {
    '&[data-state="open"]': {
      animation: `${slideDown} 300ms ease-out`,
    },
    '&[data-state="closed"]': {
      animation: `${slideUp} 300ms ease-out`,
    },
  },
});

export const animated2DContentClass = style({
  overflow: "hidden",
  selectors: {
    '&[data-state="open"]': {
      animation: `${open2D} 1000ms ease-out`,
    },
    '&[data-state="closed"]': {
      animation: `${close2D} 1000ms ease-out`,
    },
  },
});

export const styles = {
  backgroundColor: "rgba(0, 0, 255, 0.3)",
  border: "2px solid blue",
  padding: 10,

  '&[data-state="closed"]': { borderColor: vars.colors.red },
  '&[data-state="open"]': { borderColor: vars.colors.green },
  "&[data-disabled]": { borderStyle: "dashed" },
  "&:disabled": { opacity: 0.5 },
};
export const rootAttrClass = style(styles);
export const itemAttrClass = style(styles);
export const headerAttrClass = style(styles);
export const triggerAttrClass = style(styles);
export const contentAttrClass = style({
  // ensure we can see the content (because it has `hidden` attribute)
  display: "block",
  ...styles,
});

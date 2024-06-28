import { createTheme, keyframes, style } from "@vanilla-extract/css";

const VIEWPORT_PADDING = 10;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [themeClass, vars] = createTheme({
  color: {
    gray100: "#ccc",
    green: "green",
  },
});

export const viewportClass = style([
  themeClass,
  {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    padding: VIEWPORT_PADDING,
    gap: VIEWPORT_PADDING,
    listStyle: "none",
  },
]);

export const rootClass = style([
  themeClass,
  {
    position: "relative",
    overflow: "hidden",
    listStyle: "none",
    width: 230,
    borderRadius: 4,
    border: "1px solid black",
    boxShadow: "0 0 5px rgba(0,0,0,0.5)",
    padding: 10,
    fontSize: 12,
  },
]);

export const headerClass = style({
  padding: "5px 10px",
  margin: "-10px -10px 10px",
  background: "black",
  color: "white",
  position: "relative",
  height: 22,
  display: "flex",
  alignItems: "center",
});

export const successHeaderClass = style([
  headerClass,
  {
    background: "green",
  },
]);

export const titleClass = style({
  fontSize: "inherit",
  fontWeight: "normal",
});

export const descriptionClass = style({
  margin: 0,
});

export const buttonClass = style({
  border: "1px solid black",
  borderRadius: 4,
  background: "gainsboro",
  fontFamily: "inherit",
  padding: "2px 5px",
  selectors: {
    "&:hover, &:focus": {
      background: "royalblue",
      borderColor: "darkblue",
      color: "white",
    },
  },
});

export const closeClass = style([
  buttonClass,
  {
    position: "absolute",
    top: "50%",
    right: 5,
    transform: "translateY(-50%)",
    width: 18,
    height: 18,
    padding: 0,
  },
]);

export const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

export const slideRight = keyframes({
  from: { transform: "translateX(var(--allygory-toast-swipe-end-x))" },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
});

export const slideLeft = keyframes({
  from: { transform: "translateX(var(--allygory-toast-swipe-end-x))" },
  to: { transform: `translateX(calc(-100% - ${VIEWPORT_PADDING}px))` },
});

export const slideUp = keyframes({
  from: { transform: "translateY(var(--allygory-toast-swipe-end-y))" },
  to: { transform: `translateY(calc(-100% - ${VIEWPORT_PADDING}px))` },
});

export const slideDown = keyframes({
  from: { transform: "translateY(var(--allygory-toast-swipe-end-y))" },
  to: { transform: `translateY(calc(100% + ${VIEWPORT_PADDING}px))` },
});

export const errorRootClass = style([
  rootClass,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
]);

export const animatedRootClass = style([
  rootClass,
  {
    selectors: {
      '&[data-state="open"]': {
        animation: `${fadeIn} 200ms ease-out`,
      },
      '&[data-state="closed"]': {
        animation: `${fadeOut} 200ms ease-out`,
      },
      '&[data-swipe="move"]': {
        transform:
          "translate(var(--allygory-toast-swipe-move-x), var(--allygory-toast-swipe-move-y))",
      },
      '&[data-swipe="cancel"]': {
        transform: "translate(0, 0)",
        transition: "transform 200ms ease-out",
      },
      '&[data-swipe="end"]': {
        animationDuration: "300ms",
        animationTimingFunction: "ease-out",
      },
      '&[data-swipe="end"] &[data-swipe-direction="right"]': {
        animationName: slideRight,
      },
      '&[data-swipe="end"] &[data-swipe-direction="left"]': {
        animationName: slideLeft,
      },
      '&[data-swipe="end"] &[data-swipe-direction="up"]': {
        animationName: slideUp,
      },
      '&[data-swipe="end"] &[data-swipe-direction="down"]': {
        animationName: slideDown,
      },
    },
  },
]);

export const loading = keyframes({
  from: { transform: "translateX(-100%)" },
  to: { transform: "translateX(0%)" },
});

export const progressBarClass = style({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: 2,
  overflow: "hidden",
  backgroundColor: vars.color.gray100,
});

export const progressBarInnerClass = style({
  height: "100%",
  backgroundColor: vars.color.green,
  animationName: loading,
  animationTimingFunction: "linear",
});

export const chromaticViewport = style({
  display: "inline-flex",
  border: "5px solid royalblue",
  flexDirection: "column",
  padding: VIEWPORT_PADDING,
  gap: VIEWPORT_PADDING,
});

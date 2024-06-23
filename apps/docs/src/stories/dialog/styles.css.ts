import { keyframes, style } from "@vanilla-extract/css";

const RECOMMENDED_CSS__DIALOG__OVERLAY: Record<string, string | number> = {
  // ensures overlay is positioned correctly
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const RECOMMENDED_CSS__DIALOG__CONTENT: Record<string, string | number> = {
  // ensures good default position for content
  position: "fixed",
  top: 0,
  left: 0,
};

export const triggerClass = style({});

export const overlayClass = style({
  ...RECOMMENDED_CSS__DIALOG__OVERLAY,
  backgroundColor: "rgba(0,0,0,0.2)",
});

export const scrollableOverlayClass = style([
  overlayClass,
  {
    overflow: "auto",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
]);

const contentStyles = style({
  minWidth: 300,
  minHeight: 150,
  padding: 50,
  borderRadius: 10,
  backgroundColor: "white",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.12)",
});

export const contentDefaultClass = style([
  contentStyles,
  {
    ...RECOMMENDED_CSS__DIALOG__CONTENT,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
]);

export const contentScrollableClass = style([
  contentDefaultClass,
  {
    overflow: "auto",
    maxHeight: 300,
  },
]);

export const contentInScrollableOverlayClass = style([
  contentStyles,
  {
    marginTop: 50,
    marginBottom: 50,
  },
]);

export const contentSheetClass = style([
  contentStyles,
  {
    ...RECOMMENDED_CSS__DIALOG__CONTENT,
    left: undefined,
    right: 0,
    minWidth: 300,
    minHeight: "100vh",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
]);

export const closeClass = style({});

export const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

export const scaleIn = keyframes({
  from: { transform: "translate(-50%, -50%) scale(0.75)" },
  to: { transform: "translate(-50%, -50%) scale(1)" },
});

export const animatedOverlayClass = style([
  overlayClass,
  {
    selectors: {
      '&[data-state="open"]': {
        animation: `${fadeIn} 300ms ease-out`,
      },
      '&[data-state="closed"]': {
        animation: `${fadeOut} 300ms ease-in`,
      },
    },
  },
]);

export const animatedContentClass = style([
  contentDefaultClass,
  {
    selectors: {
      '&[data-state="open"]': {
        animation: `${fadeIn} 150ms ease-out, ${scaleIn} 200ms ease-out`,
      },
      '&[data-state="closed"]': {
        animation: `${fadeOut} 300ms ease-in`,
      },
    },
  },
]);

export const animatedContentClass2 = style([
  animatedContentClass,
  {
    animationDuration: "50ms !important",
  },
]);

export const chromaticContentClass = style([
  contentDefaultClass,
  {
    padding: 10,
    minWidth: "auto",
    minHeight: "auto",
  },
]);

export const styles = {
  backgroundColor: "rgba(0, 0, 255, 0.3)",
  border: "2px solid blue",
  padding: 10,

  '&[data-state="closed"]': { borderColor: "red" },
  '&[data-state="open"]': { borderColor: "green" },
};
export const triggerAttrClass = style(styles);
export const overlayAttrClass = style([overlayClass, styles]);
export const contentAttrClass = style([chromaticContentClass, styles]);
export const closeAttrClass = style(styles);

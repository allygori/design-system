import { style } from "@vanilla-extract/css";

export const triggerClass = style({});

const RECOMMENDED_CSS__ALERT_DIALOG__OVERLAY: Record<string, string | number> =
  {
    // ensures overlay is positionned correctly
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

export const overlayClass = style({
  ...RECOMMENDED_CSS__ALERT_DIALOG__OVERLAY,
  backgroundColor: "black",
  opacity: 0.2,
});

const RECOMMENDED_CSS__ALERT_DIALOG__CONTENT: Record<string, string | number> =
  {
    // ensures good default position for content
    position: "fixed",
    top: 0,
    left: 0,
  };

export const contentClass = style({
  ...RECOMMENDED_CSS__ALERT_DIALOG__CONTENT,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  minWidth: 300,
  minHeight: 150,
  padding: 50,
  borderRadius: 10,
  backgroundColor: "white",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.12)",
});

export const cancelClass = style({
  appearance: "none",
  padding: 10,
  border: "none",
  background: "$grey100",
});

export const actionClass = style({
  appearance: "none",
  padding: 10,
  border: "none",
  backgroundColor: "$red",
  color: "$white",
});

export const titleClass = style({});

export const descriptionClass = style({});

export const chromaticContentClass = style([
  contentClass,
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
export const cancelAttrClass = style(styles);
export const actionAttrClass = style(styles);
export const titleAttrClass = style(styles);
export const descriptionAttrClass = style(styles);

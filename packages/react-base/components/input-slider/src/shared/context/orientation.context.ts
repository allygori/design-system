import type useSize from "@allygory/use-size";
import { ROOT_NAME } from "../constants";
import { createRootContext } from "./root.context";

type Side = "top" | "right" | "bottom" | "left";

const [OrientationProvider, useOrientationContext] = createRootContext<{
  startEdge: Side;
  endEdge: Side;
  size: keyof NonNullable<ReturnType<typeof useSize>>;
  direction: number;
}>(ROOT_NAME, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1,
});

export type { Side };
export {
  OrientationProvider,
  //
  useOrientationContext,
};

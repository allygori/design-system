import type { ElementPropsWithRef } from "./element";
import Element from "./element";
import { composeEventHandlers, dispatchDiscreteCustomEvent } from "./utils";

const Root = Element;

export {
  composeEventHandlers,
  dispatchDiscreteCustomEvent,
  //
  Root,
  //
};
export type { ElementPropsWithRef };
export default Element;

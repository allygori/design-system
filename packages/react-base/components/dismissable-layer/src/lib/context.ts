import { createContext } from "react";
import type { DismissableLayerElement } from "../dismissable-layer";
import type { DismissableLayerBranchElement } from "../dismissable-layer-branch";

const DismissableLayerContext = createContext({
  layers: new Set<DismissableLayerElement>(),
  layersWithOutsidePointerEventsDisabled: new Set<DismissableLayerElement>(),
  branches: new Set<DismissableLayerBranchElement>(),
});

export default DismissableLayerContext;

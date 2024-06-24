import { createCollapsibleScope } from "./shared/context";
import Collapsible, { type CollapsibleProps } from "./root";
import CollapsibleTrigger, { type CollapsibleTriggerProps } from "./trigger";
import CollapsibleContent, { type CollapsibleContentProps } from "./content";

const Root = Collapsible;

export type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
};
export {
  createCollapsibleScope,
  //
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  //
  Root,
  CollapsibleTrigger as Trigger,
  CollapsibleContent as Content,
};

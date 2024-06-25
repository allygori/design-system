import createCollection from "@allygory/collection";
import { createCollapsibleScope } from "@allygory/collapsible";
import { createContextScope, type Scope } from "@allygory/context";
import { ACCORDION_NAME } from "../constants";
import type { AccordionTriggerElement } from "../../trigger";

type ScopedProps<P> = P & { __scopeAccordion?: Scope };

const [Collection, useCollection, createCollectionScope] =
  createCollection<AccordionTriggerElement>(ACCORDION_NAME);
const [createAccordionContext, createAccordionScope] = createContextScope(
  ACCORDION_NAME,
  [createCollectionScope, createCollapsibleScope],
);

const useCollapsibleScope = createCollapsibleScope();

export type { ScopedProps };
export {
  createAccordionContext,
  createAccordionScope,
  useCollection,
  useCollapsibleScope,
  //
  Collection,
};

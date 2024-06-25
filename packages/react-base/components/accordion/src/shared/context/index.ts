import {
  createAccordionContext,
  createAccordionScope,
  useCollection,
  useCollapsibleScope,
  Collection,
} from "./base.context";
import { useAccordionContext, AccordionRootProvider } from "./root.context";
import {
  useAccordionValueContext,
  useAccordionCollapsibleContext,
  AccordionValueProvider,
  AccordionCollapsibleProvider,
} from "./root-impl-single.context";
import { useAccordionItemContext, AccordionItemProvider } from "./item.context";
import type { ScopedProps } from "./base.context";

export type { ScopedProps };
export {
  createAccordionContext,
  createAccordionScope,
  //
  useCollection,
  useCollapsibleScope,
  useAccordionContext,
  useAccordionValueContext,
  useAccordionCollapsibleContext,
  useAccordionItemContext,
  //
  Collection,
  AccordionRootProvider,
  AccordionValueProvider,
  AccordionCollapsibleProvider,
  AccordionItemProvider,
};

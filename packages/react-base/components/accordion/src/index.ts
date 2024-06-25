import AccordionRoot from "./root";
import AccordionItem from "./item";
import AccordionHeader from "./header";
import AccordionContent from "./content";
import AccordionTrigger from "./trigger";
import { createAccordionScope } from "./shared/context/base.context";
import type { AccordionSingleProps, AccordionMultipleProps } from "./root";
import type { AccordionItemProps } from "./item";
import type { AccordionHeaderProps } from "./header";
import type { AccordionContentProps } from "./content";
import type { AccordionTriggerProps } from "./trigger";

const Root = AccordionRoot;
const Item = AccordionItem;
const Header = AccordionHeader;
const Trigger = AccordionTrigger;
const Content = AccordionContent;

export type {
  AccordionSingleProps,
  AccordionMultipleProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionContentProps,
  AccordionTriggerProps,
};
export {
  createAccordionScope,
  //
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
  AccordionTrigger,
  //
  Root,
  Item,
  Header,
  Content,
  Trigger,
};

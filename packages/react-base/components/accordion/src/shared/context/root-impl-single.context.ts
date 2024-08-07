import { ACCORDION_NAME } from "../constants";
import { createAccordionContext } from "./base.context";

type AccordionValueContextValue = {
  value: string[];
  onItemOpen: (value: string) => void;
  onItemClose: (value: string) => void;
};

const [AccordionValueProvider, useAccordionValueContext] =
  createAccordionContext<AccordionValueContextValue>(ACCORDION_NAME);
const [AccordionCollapsibleProvider, useAccordionCollapsibleContext] =
  createAccordionContext(ACCORDION_NAME, { collapsible: false });

export {
  useAccordionValueContext,
  useAccordionCollapsibleContext,
  //
  AccordionValueProvider,
  AccordionCollapsibleProvider,
};

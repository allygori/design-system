import { ITEM_NAME } from "../constants";
import { createAccordionContext } from "./base.context";

type AccordionItemContextValue = {
  open?: boolean;
  disabled?: boolean;
  triggerId: string;
};

const [AccordionItemProvider, useAccordionItemContext] =
  createAccordionContext<AccordionItemContextValue>(ITEM_NAME);

export {
  useAccordionItemContext,
  //
  AccordionItemProvider,
};

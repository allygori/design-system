import { createAccordionContext } from "./base.context";
import { ITEM_NAME } from "../constants";

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

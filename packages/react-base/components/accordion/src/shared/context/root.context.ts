import { createAccordionContext } from "./base.context";
import { ACCORDION_NAME } from "../constants";
import type { AccordionRootImplProps } from "../../root-impl";

type AccordionImplContextValue = {
  disabled?: boolean;
  direction: AccordionRootImplProps["dir"];
  orientation: AccordionRootImplProps["orientation"];
};

const [AccordionRootProvider, useAccordionContext] =
  createAccordionContext<AccordionImplContextValue>(ACCORDION_NAME);

export {
  useAccordionContext,
  //
  AccordionRootProvider,
};

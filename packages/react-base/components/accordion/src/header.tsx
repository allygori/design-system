import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import Element from "@allygory/element";
import { ACCORDION_NAME, HEADER_NAME } from "./shared/constants";
import { getState } from "./shared/utils";
import { useAccordionContext } from "./shared/context/root.context";
import { useAccordionItemContext } from "./shared/context/item.context";
import type { ScopedProps } from "./shared/context/base.context";

type AccordionHeaderElement = ElementRef<typeof Element.h3>;
type AccordionHeaderProps = ComponentPropsWithoutRef<typeof Element.h3>;

/**
 * `AccordionHeader` contains the content for the parts of an `AccordionItem` that will be visible
 * whether or not its content is collapsed.
 */
const AccordionHeader = forwardRef<AccordionHeaderElement, AccordionHeaderProps>(
  (props: ScopedProps<AccordionHeaderProps>, forwardedRef) => {
    const { __scopeAccordion, ...headerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(HEADER_NAME, __scopeAccordion);

    return (
      <Element.h3
        data-disabled={itemContext.disabled ? "" : undefined}
        data-orientation={accordionContext.orientation}
        data-state={getState(itemContext.open)}
        {...headerProps}
        ref={forwardedRef}
      />
    );
  },
);

AccordionHeader.displayName = HEADER_NAME;

export type { AccordionHeaderElement, AccordionHeaderProps };
export default AccordionHeader;

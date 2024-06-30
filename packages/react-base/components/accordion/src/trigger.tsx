import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import * as Collapsible from "@allygory/collapsible";
import { ACCORDION_NAME, TRIGGER_NAME } from "./shared/constants";
import {
  type ScopedProps,
  Collection,
  useCollapsibleScope,
} from "./shared/context/base.context";
import { useAccordionContext } from "./shared/context/root.context";
import { useAccordionCollapsibleContext } from "./shared/context/root-impl-single.context";
import { useAccordionItemContext } from "./shared/context/item.context";

type AccordionTriggerElement = ElementRef<typeof Collapsible.Trigger>;
type AccordionTriggerProps = ComponentPropsWithoutRef<typeof Collapsible.Trigger>;

/**
 * `AccordionTrigger` is the trigger that toggles the collapsed state of an `AccordionItem`. It
 * should always be nested inside of an `AccordionHeader`.
 */
const AccordionTrigger = forwardRef<AccordionTriggerElement, AccordionTriggerProps>(
  (props: ScopedProps<AccordionTriggerProps>, forwardedRef) => {
    const { __scopeAccordion, ...triggerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(TRIGGER_NAME, __scopeAccordion);
    const collapsibleContext = useAccordionCollapsibleContext(
      TRIGGER_NAME,
      __scopeAccordion,
    );
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);

    return (
      <Collection.ItemSlot scope={__scopeAccordion}>
        <Collapsible.Trigger
          ref={forwardedRef}
          aria-disabled={
            (itemContext.open && !collapsibleContext.collapsible) || undefined
          }
          data-orientation={accordionContext.orientation}
          id={itemContext.triggerId}
          {...collapsibleScope}
          {...triggerProps}
        />
      </Collection.ItemSlot>
    );
  },
);

AccordionTrigger.displayName = TRIGGER_NAME;

export type { AccordionTriggerElement, AccordionTriggerProps };
export default AccordionTrigger;

import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import useId from "@allygory/use-id";
import * as Collapsible from "@allygory/collapsible";
import { ITEM_NAME } from "./shared/constants";
import { getState } from "./shared/utils";
import { type ScopedProps, useCollapsibleScope } from "./shared/context/base.context";
import { useAccordionContext } from "./shared/context/root.context";
import { useAccordionValueContext } from "./shared/context/root-impl-single.context";
import { AccordionItemProvider } from "./shared/context/item.context";

type AccordionItemElement = ElementRef<typeof Collapsible.Root>;
type CollapsibleProps = ComponentPropsWithoutRef<typeof Collapsible.Root>;
type AccordionItemProps = Omit<
  CollapsibleProps,
  "open" | "defaultOpen" | "onOpenChange"
> & {
  /**
   * Whether or not an accordion item is disabled from user interaction.
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * A string value for the accordion item. All items within an accordion should use a unique value.
   */
  value: string;
};

const AccordionItem = forwardRef<AccordionItemElement, AccordionItemProps>(
  (props: ScopedProps<AccordionItemProps>, forwardedRef) => {
    const { __scopeAccordion, value, ...accordionItemProps } = props;
    const accordionContext = useAccordionContext(ITEM_NAME, __scopeAccordion);
    const valueContext = useAccordionValueContext(ITEM_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    const triggerId = useId();
    const open = (value && valueContext.value.includes(value)) || false;
    const disabled = accordionContext.disabled || accordionItemProps.disabled;

    return (
      <AccordionItemProvider
        disabled={disabled}
        open={open}
        scope={__scopeAccordion}
        triggerId={triggerId}
      >
        <Collapsible.Root
          data-orientation={accordionContext.orientation}
          data-state={getState(open)}
          {...collapsibleScope}
          {...accordionItemProps}
          ref={forwardedRef}
          disabled={disabled}
          open={open}
          onOpenChange={(isOpen) => {
            if (isOpen) {
              valueContext.onItemOpen(value);
            } else {
              valueContext.onItemClose(value);
            }
          }}
        />
      </AccordionItemProvider>
    );
  },
);

AccordionItem.displayName = ITEM_NAME;

export type { AccordionItemElement, AccordionItemProps };
export default AccordionItem;

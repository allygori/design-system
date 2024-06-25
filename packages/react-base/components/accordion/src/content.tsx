import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as Collapsible from "@allygory/collapsible";
import { ACCORDION_NAME, CONTENT_NAME } from "./shared/constants";
import {
  type ScopedProps,
  useCollapsibleScope,
} from "./shared/context/base.context";
import { useAccordionContext } from "./shared/context/root.context";
import { useAccordionItemContext } from "./shared/context/item.context";

type AccordionContentElement = ElementRef<typeof Collapsible.Content>;
type AccordionContentProps = ComponentPropsWithoutRef<
  typeof Collapsible.Content
>;

/**
 * `AccordionContent` contains the collapsible content for an `AccordionItem`.
 */
const AccordionContent = forwardRef<
  AccordionContentElement,
  AccordionContentProps
>((props: ScopedProps<AccordionContentProps>, forwardedRef) => {
  const { __scopeAccordion, ...contentProps } = props;
  const accordionContext = useAccordionContext(
    ACCORDION_NAME,
    __scopeAccordion,
  );
  const itemContext = useAccordionItemContext(CONTENT_NAME, __scopeAccordion);
  const collapsibleScope = useCollapsibleScope(__scopeAccordion);

  return (
    <Collapsible.Content
      ref={forwardedRef}
      role="region"
      aria-labelledby={itemContext.triggerId}
      data-orientation={accordionContext.orientation}
      {...collapsibleScope}
      {...contentProps}
      style={{
        ["--allygory-accordion-content-height" as any]:
          "var(--allygory-collapsible-content-height)",
        ["--allygory-accordion-content-width" as any]:
          "var(--allygory-collapsible-content-width)",
        ...props.style,
      }}
    />
  );
});

AccordionContent.displayName = CONTENT_NAME;

export type { AccordionContentElement, AccordionContentProps };
export default AccordionContent;

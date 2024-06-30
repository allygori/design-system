import Element, { composeEventHandlers } from "@allygory/element";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { type ScopedProps, useCollapsibleContext } from "./shared/context";
import { getState } from "./shared/utils";
import { TRIGGER_NAME } from "./shared/constants";

type CollapsibleTriggerElement = ElementRef<typeof Element.button>;
type CollapsibleTriggerProps = ComponentPropsWithoutRef<typeof Element.button>;

const CollapsibleTrigger = forwardRef<CollapsibleTriggerElement, CollapsibleTriggerProps>(
  (props: ScopedProps<CollapsibleTriggerProps>, forwardedRef) => {
    const { __scopeCollapsible, ...triggerProps } = props;
    const context = useCollapsibleContext(TRIGGER_NAME, __scopeCollapsible);

    return (
      <Element.button
        ref={forwardedRef}
        aria-controls={context.contentId}
        aria-expanded={context.open || false}
        data-disabled={context.disabled ? "" : undefined}
        data-state={getState(context.open)}
        disabled={context.disabled}
        type="button"
        {...triggerProps}
        onClick={composeEventHandlers(props.onClick, context.onOpenToggle)}
      />
    );
  },
);

CollapsibleTrigger.displayName = TRIGGER_NAME;

export type { CollapsibleTriggerElement, CollapsibleTriggerProps };
export default CollapsibleTrigger;

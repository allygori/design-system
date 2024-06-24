import Element, { composeEventHandlers } from "@allygory/element";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { ScopedProps, useCollapsibleContext } from "./shared/context";
import { getState } from "./shared/utils";
import { TRIGGER_NAME } from "./shared/constants";

type CollapsibleTriggerElement = ElementRef<typeof Element.button>;
type CollapsibleTriggerProps = ComponentPropsWithoutRef<typeof Element.button>;

const CollapsibleTrigger = forwardRef<
  CollapsibleTriggerElement,
  CollapsibleTriggerProps
>((props: ScopedProps<CollapsibleTriggerProps>, forwardedRef) => {
  const { __scopeCollapsible, ...triggerProps } = props;
  const context = useCollapsibleContext(TRIGGER_NAME, __scopeCollapsible);

  return (
    <Element.button
      ref={forwardedRef}
      type="button"
      aria-controls={context.contentId}
      aria-expanded={context.open || false}
      data-state={getState(context.open)}
      data-disabled={context.disabled ? "" : undefined}
      disabled={context.disabled}
      {...triggerProps}
      onClick={composeEventHandlers(props.onClick, context.onOpenToggle)}
    />
  );
});

CollapsibleTrigger.displayName = TRIGGER_NAME;

export type { CollapsibleTriggerElement, CollapsibleTriggerProps };
export default CollapsibleTrigger;

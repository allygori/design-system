import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import Element, { composeEventHandlers } from "@allygory/element";
import useComposeRefs from "@allygory/use-compose-refs";
import { TRIGGER_NAME } from "./shared/constants";
import { getState } from "./shared/utils";
import { type ScopedProps, useRootContext } from "./shared/context";

type TriggerElement = ElementRef<typeof Element.button>;
type TriggerProps = ComponentPropsWithoutRef<typeof Element.button>;

const Trigger = forwardRef<TriggerElement, TriggerProps>(
  (props: ScopedProps<TriggerProps>, forwardedRef) => {
    const { __scopeActionSheet, ...triggerProps } = props;
    const context = useRootContext(TRIGGER_NAME, __scopeActionSheet);
    const composedRefs = useComposeRefs(forwardedRef, context.triggerRef);

    return (
      <Element.button
        aria-controls={context.contentId}
        aria-expanded={context.open}
        aria-haspopup="dialog"
        data-state={getState(context.open)}
        type="button"
        {...triggerProps}
        ref={composedRefs}
        onClick={composeEventHandlers(props.onClick, () => {
          context.onOpenToggle();
        })}
      />
    );
  },
);

Trigger.displayName = TRIGGER_NAME;

export type { TriggerElement, TriggerProps };
export default Trigger;

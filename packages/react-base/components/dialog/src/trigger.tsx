import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import Element, { composeEventHandlers } from "@allygory/element";
import useComposedRefs from "@allygory/use-compose-refs";
import { TRIGGER_NAME } from "./shared/constants";
import { type ScopedProps, useRootContext } from "./shared/context";
import { getState } from "./shared/utils";

type TriggerElement = ElementRef<typeof Element.button>;
type TriggerProps = ComponentPropsWithoutRef<typeof Element.button>;

const Trigger = forwardRef<TriggerElement, TriggerProps>(
  (props: ScopedProps<TriggerProps>, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useRootContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);

    return (
      <Element.button
        aria-controls={context.contentId}
        aria-expanded={context.open}
        aria-haspopup="dialog"
        data-state={getState(context.open)}
        type="button"
        {...triggerProps}
        ref={composedTriggerRef}
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

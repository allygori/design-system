import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import Element, { composeEventHandlers } from "@allygory/element";
import useComposedRefs from "@allygory/use-compose-refs";
import { type ScopedProps, useDialogContext } from "./shared/context";
import { TRIGGER_NAME } from "./shared/constants";
import { getState } from "./shared/utils";

type DialogTriggerElement = ElementRef<typeof Element.button>;
type DialogTriggerProps = ComponentPropsWithoutRef<typeof Element.button>;

const DialogTrigger = forwardRef<DialogTriggerElement, DialogTriggerProps>(
  (props: ScopedProps<DialogTriggerProps>, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs(
      forwardedRef,
      context.triggerRef,
    );

    return (
      <Element.button
        type="button"
        ref={composedTriggerRef}
        aria-haspopup="dialog"
        aria-expanded={context.open}
        aria-controls={context.contentId}
        data-state={getState(context.open)}
        {...triggerProps}
        onClick={composeEventHandlers(props.onClick, context.onOpenToggle)}
      />
    );
  },
);

DialogTrigger.displayName = TRIGGER_NAME;

export type { DialogTriggerProps };
export default DialogTrigger;

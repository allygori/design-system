import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import Element, { composeEventHandlers } from "@allygory/element";
import { CONFIRM_NAME } from "./shared/constants";
import { useRootContext, type ScopedProps } from "./shared/context";

type ConfirmElement = ElementRef<typeof Element.button>;
type ConfirmProps = ComponentPropsWithoutRef<typeof Element.button>;

const Confirm = forwardRef<ConfirmElement, ConfirmProps>(
  (props: ScopedProps<ConfirmProps>, forwardedRef) => {
    const { __scopeActionSheet, ...confirmProps } = props;
    const context = useRootContext(CONFIRM_NAME, __scopeActionSheet);

    return (
      <Element.button
        type="button"
        {...confirmProps}
        ref={forwardedRef}
        onClick={composeEventHandlers(props.onClick, () => {
          if (context.onConfirm) {
            context.onConfirm(true);
            context.onOpenChange(false);
          }
        })}
      />
    );
  },
);

Confirm.displayName = CONFIRM_NAME;

export type { ConfirmElement, ConfirmProps };
export default Confirm;

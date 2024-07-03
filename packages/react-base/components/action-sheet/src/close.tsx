import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import Element, { composeEventHandlers } from "@allygory/element";
import { CLOSE_NAME } from "./shared/constants";
import { type ScopedProps, useRootContext } from "./shared/context";

type CloseElement = ElementRef<typeof Element.button>;
type CloseProps = ComponentPropsWithoutRef<typeof Element.button>;

const Close = forwardRef<CloseElement, CloseProps>(
  (props: ScopedProps<CloseProps>, forwardedRef) => {
    const { __scopeActionSheet, ...closeProps } = props;
    const context = useRootContext(CLOSE_NAME, __scopeActionSheet);

    return (
      <Element.button
        type="button"
        {...closeProps}
        ref={forwardedRef}
        onClick={composeEventHandlers(props.onClick, () => {
          context.onOpenChange(false);
        })}
      />
    );
  },
);

Close.displayName = CLOSE_NAME;

export type { CloseElement, CloseProps };
export default Close;

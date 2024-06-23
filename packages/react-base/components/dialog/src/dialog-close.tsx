import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import Element, { composeEventHandlers } from "@allygory/element";
import { ScopedProps, useDialogContext } from "./lib/context";
import { CLOSE_NAME } from "./lib/constants";

type DialogCloseElement = ElementRef<typeof Element.button>;
type DialogCloseProps = ComponentPropsWithoutRef<typeof Element.button>;

const DialogClose = forwardRef<DialogCloseElement, DialogCloseProps>(
  (props: ScopedProps<DialogCloseProps>, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;

    console.log("DialogClose", { __scopeDialog });
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);

    return (
      <Element.button
        type="button"
        {...closeProps}
        ref={forwardedRef}
        onClick={composeEventHandlers(props.onClick, () =>
          context.onOpenChange(false),
        )}
      />
    );
  },
);

DialogClose.displayName = CLOSE_NAME;

export type { DialogCloseProps };
export default DialogClose;

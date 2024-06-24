import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import Element from "@allygory/element";
import { ScopedProps, useDialogContext } from "./shared/context";

const DISPLAY_NAME = "DialogTitle";

type DialogTitleElement = ElementRef<typeof Element.h2>;
type DialogTitleProps = ComponentPropsWithoutRef<typeof Element.h2>;

const DialogTitle = forwardRef<DialogTitleElement, DialogTitleProps>(
  (props: ScopedProps<DialogTitleProps>, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(DISPLAY_NAME, __scopeDialog);
    return (
      <Element.h2 id={context.titleId} {...titleProps} ref={forwardedRef} />
    );
  },
);

DialogTitle.displayName = DISPLAY_NAME;

export type { DialogTitleProps };
export default DialogTitle;

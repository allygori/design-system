import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import Element from "@allygory/element";
import { ScopedProps, useDialogContext } from "./shared/context";
import { DESCRIPTION_NAME } from "./shared/constants";

type DialogDescriptionElement = ElementRef<typeof Element.p>;
type DialogDescriptionProps = ComponentPropsWithoutRef<typeof Element.p>;

const DialogDescription = forwardRef<
  DialogDescriptionElement,
  DialogDescriptionProps
>((props: ScopedProps<DialogDescriptionProps>, forwardedRef) => {
  const { __scopeDialog, ...descriptionProps } = props;
  const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
  return (
    <Element.p
      id={context.descriptionId}
      {...descriptionProps}
      ref={forwardedRef}
    />
  );
});

DialogDescription.displayName = DESCRIPTION_NAME;

export type { DialogDescriptionProps };
export default DialogDescription;

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import Element from "@allygory/element";
import { DESCRIPTION_NAME } from "./shared/constants";
import type { ScopedProps } from "./shared/context";

type ToastDescriptionElement = ElementRef<typeof Element.div>;
type ToastDescriptionProps = ComponentPropsWithoutRef<typeof Element.div>;

const ToastDescription = forwardRef<
  ToastDescriptionElement,
  ToastDescriptionProps
>((props: ScopedProps<ToastDescriptionProps>, forwardedRef) => {
  const { __scopeToast, ...descriptionProps } = props;

  return <Element.div {...descriptionProps} ref={forwardedRef} />;
});

ToastDescription.displayName = DESCRIPTION_NAME;

export type { ToastDescriptionElement, ToastDescriptionProps };
export default ToastDescription;

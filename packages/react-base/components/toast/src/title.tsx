import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import Element from "@allygory/element";
import { TITLE_NAME } from "./shared/constants";
import type { ScopedProps } from "./shared/context";

type ToastTitleElement = ElementRef<typeof Element.div>;
type ToastTitleProps = ComponentPropsWithoutRef<typeof Element.div>;

const ToastTitle = forwardRef<ToastTitleElement, ToastTitleProps>(
  (props: ScopedProps<ToastTitleProps>, forwardedRef) => {
    const { __scopeToast, ...titleProps } = props;

    return <Element.div {...titleProps} ref={forwardedRef} />;
  },
);

ToastTitle.displayName = TITLE_NAME;

export type { ToastTitleElement, ToastTitleProps };
export default ToastTitle;

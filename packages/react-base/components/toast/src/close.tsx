import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import Element, { composeEventHandlers } from "@allygory/element";
import { CLOSE_NAME } from "./shared/constants";
import { useToastInteractiveContext } from "./shared/context";
import ToastAnnounceExclude from "./announce-exclude";
import type { ScopedProps } from "./shared/context";

type ToasCloseElement = ElementRef<typeof Element.button>;
type ToastCloseProps = ComponentPropsWithoutRef<typeof Element.button>;

const ToastClose = forwardRef<ToasCloseElement, ToastCloseProps>(
  (props: ScopedProps<ToastCloseProps>, forwardedRef) => {
    const { __scopeToast, ...closeProps } = props;
    const interactiveContext = useToastInteractiveContext(CLOSE_NAME, __scopeToast);

    return (
      <ToastAnnounceExclude asChild>
        <Element.button
          type="button"
          {...closeProps}
          ref={forwardedRef}
          onClick={composeEventHandlers(
            props.onClick,
            // eslint-disable-next-line @typescript-eslint/unbound-method -- ignore
            interactiveContext.onClose,
          )}
        />
      </ToastAnnounceExclude>
    );
  },
);

ToastClose.displayName = CLOSE_NAME;

export type { ToasCloseElement, ToastCloseProps };
export default ToastClose;

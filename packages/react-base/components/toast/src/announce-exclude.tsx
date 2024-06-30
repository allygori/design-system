import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import Element from "@allygory/element";
import type { ScopedProps } from "./shared/context";

type ToastAnnounceExcludeElement = ElementRef<typeof Element.div>;
type ToastAnnounceExcludeProps = ComponentPropsWithoutRef<typeof Element.div> & {
  altText?: string;
};

const ToastAnnounceExclude = forwardRef<
  ToastAnnounceExcludeElement,
  ToastAnnounceExcludeProps
>((props: ScopedProps<ToastAnnounceExcludeProps>, forwardedRef) => {
  const { __scopeToast, altText, ...announceExcludeProps } = props;

  return (
    <Element.div
      ref={forwardedRef}
      data-allygory-toast-announce-alt={altText || undefined}
      data-allygory-toast-announce-exclude=""
      {...announceExcludeProps}
    />
  );
});

ToastAnnounceExclude.displayName = "ToastAnnounceExclude";

export type { ToastAnnounceExcludeElement, ToastAnnounceExcludeProps };
export default ToastAnnounceExclude;

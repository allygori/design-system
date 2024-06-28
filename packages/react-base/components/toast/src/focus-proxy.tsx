import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import VisuallyHidden from "@allygory/visually-hidden";
import { FOCUS_PROXY_NAME } from "./shared/constants";
import { useToastProviderContext } from "./shared/context";
import type { ScopedProps } from "./shared/context";

type FocusProxyElement = ElementRef<typeof VisuallyHidden>;
type FocusProxyProps = ComponentPropsWithoutRef<typeof VisuallyHidden> & {
  onFocusFromOutsideViewport(): void;
};

const FocusProxy = forwardRef<FocusProxyElement, ScopedProps<FocusProxyProps>>(
  (props, forwardedRef) => {
    const { __scopeToast, onFocusFromOutsideViewport, ...proxyProps } = props;
    const context = useToastProviderContext(FOCUS_PROXY_NAME, __scopeToast);

    return (
      <VisuallyHidden
        aria-hidden
        tabIndex={0}
        {...proxyProps}
        ref={forwardedRef}
        // Avoid page scrolling when focus is on the focus proxy
        style={{ position: "fixed" }}
        onFocus={(event) => {
          const prevFocusedElement = event.relatedTarget as HTMLElement | null;
          const isFocusFromOutsideViewport =
            !context.viewport?.contains(prevFocusedElement);
          if (isFocusFromOutsideViewport) onFocusFromOutsideViewport();
        }}
      />
    );
  },
);

export type { FocusProxyElement, FocusProxyProps };
export default FocusProxy;

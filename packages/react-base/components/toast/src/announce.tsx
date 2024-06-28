import { ComponentPropsWithoutRef, FC, useEffect, useState } from "react";
import Portal from "@allygory/portal";
import VisuallyHidden from "@allygory/visually-hidden";
import useNextFrame from "@allygory/use-next-frame";
import { TOAST_NAME } from "./shared/constants";
import { ScopedProps, useToastProviderContext } from "./shared/context";

type ToastAnnounceProps = Omit<ComponentPropsWithoutRef<"div">, "children"> &
  ScopedProps<{ children: string[] }>;

const ToastAnnounce: FC<ToastAnnounceProps> = (
  props: ScopedProps<ToastAnnounceProps>,
) => {
  const { __scopeToast, children, ...anounceProps } = props;
  const context = useToastProviderContext(TOAST_NAME, __scopeToast);
  const [renderAnnounceText, setRenderAnnounceText] = useState(false);
  const [isAnnounced, setIsAnnounced] = useState(false);

  // render text content in the next frame to ensure toast is announced in NVDA
  useNextFrame(() => setRenderAnnounceText(true));

  // cleanup after announcing
  useEffect(() => {
    const timer = window.setTimeout(() => setIsAnnounced(true), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  return isAnnounced ? null : (
    <Portal asChild>
      <VisuallyHidden {...anounceProps}>
        {renderAnnounceText && (
          <>
            {context.label} {children}
          </>
        )}
      </VisuallyHidden>
    </Portal>
  );
};

export type { ToastAnnounceProps };
export default ToastAnnounce;

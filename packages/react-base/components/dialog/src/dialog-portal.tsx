import { Children, ComponentPropsWithoutRef, ReactNode, FC } from "react";
import { PortalProvider, ScopedProps, useDialogContext } from "./lib/context";
import PortalPrimitive from "@allygory/portal";
import Presence from "@allygory/presence";
import { PORTAL_NAME } from "./lib/constants";

type PortalProps = ComponentPropsWithoutRef<typeof PortalPrimitive>;
type DialogPortalProps = {
  children?: ReactNode;
  /**
   * Specify a container element to portal the content into.
   */
  container?: PortalProps["container"];
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
};

const DialogPortal: FC<DialogPortalProps> = (
  props: ScopedProps<DialogPortalProps>,
) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME, __scopeDialog);

  return (
    <PortalProvider scope={__scopeDialog} forceMount={forceMount}>
      {Children.map(children, (child) => {
        return (
          <Presence present={forceMount || context.open}>
            <PortalPrimitive asChild container={container}>
              {child}
            </PortalPrimitive>
          </Presence>
        );
      })}
    </PortalProvider>
  );
};

DialogPortal.displayName = PORTAL_NAME;

export type { DialogPortalProps };
export default DialogPortal;

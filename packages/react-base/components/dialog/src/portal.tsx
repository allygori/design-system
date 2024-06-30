import type { ComponentPropsWithoutRef, ReactNode, FC } from "react";
import { Children } from "react";
import PortalPrimitive from "@allygory/portal";
import Presence from "@allygory/presence";
import { PORTAL_NAME } from "./shared/constants";
import { type ScopedProps, PortalProvider, useRootContext } from "./shared/context";

type PortalPrimitiveProps = ComponentPropsWithoutRef<typeof PortalPrimitive>;
type PortalProps = {
  children?: ReactNode;
  /**
   * Specify a container element to portal the content into.
   */
  container?: PortalPrimitiveProps["container"];
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
};

const Portal: FC<PortalProps> = (props: ScopedProps<PortalProps>) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useRootContext(PORTAL_NAME, __scopeDialog);

  return (
    <PortalProvider forceMount={forceMount} scope={__scopeDialog}>
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

Portal.displayName = PORTAL_NAME;

export type { PortalProps };
export default Portal;

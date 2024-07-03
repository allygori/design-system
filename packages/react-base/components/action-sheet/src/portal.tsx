import { Children } from "react";
import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import PortalPrimitive from "@allygory/portal";
import Presence from "@allygory/presence";
import { PORTAL_NAME } from "./shared/constants";
import { type ScopedProps, useRootContext } from "./shared/context";
import { PortalProvider } from "./shared/context";

type PortalPrimitiveProps = ComponentPropsWithoutRef<typeof PortalPrimitive>;
type PortalProps = PortalPrimitiveProps & {
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
  const { __scopeActionSheet, children, container, forceMount } = props;
  const context = useRootContext(PORTAL_NAME, __scopeActionSheet);

  return (
    <PortalProvider forceMount={forceMount} scope={__scopeActionSheet}>
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

export type { PortalProps };
export default Portal;

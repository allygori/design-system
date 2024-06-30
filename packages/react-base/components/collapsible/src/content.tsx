import { forwardRef } from "react";
import Presence from "@allygory/presence";
import { CONTENT_NAME } from "./shared/constants";
import { type ScopedProps, useCollapsibleContext } from "./shared/context";
import CollapsibleContentImpl from "./content-impl";
import type {
  CollapsibleContentImplElement,
  CollapsibleContentImplProps,
} from "./content-impl";

type CollapsibleContentElement = CollapsibleContentImplElement;
type CollapsibleContentProps = Omit<CollapsibleContentImplProps, "present"> & {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
};

const CollapsibleContent = forwardRef<CollapsibleContentElement, CollapsibleContentProps>(
  (props: ScopedProps<CollapsibleContentProps>, forwardedRef) => {
    const { forceMount, ...contentProps } = props;
    const context = useCollapsibleContext(CONTENT_NAME, props.__scopeCollapsible);

    return (
      <Presence present={forceMount || context.open}>
        {({ present }) => (
          <CollapsibleContentImpl
            ref={forwardedRef}
            {...contentProps}
            present={present}
          />
        )}
      </Presence>
    );
  },
);

CollapsibleContent.displayName = CONTENT_NAME;

export type { CollapsibleContentElement, CollapsibleContentProps };
export default CollapsibleContent;

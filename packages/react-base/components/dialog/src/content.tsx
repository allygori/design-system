import { forwardRef } from "react";
import Presence from "@allygory/presence";
import { CONTENT_NAME } from "./shared/constants";
import { type ScopedProps, useRootContext, usePortalContext } from "./shared/context";
import ContentModal from "./content-modal";
import ContentNonModal from "./content-non-modal";
import type { ContentImplElement, ContentImplProps } from "./content-impl";

type ContentElement = ContentImplElement;
type ContentProps = ContentImplProps & {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
};

const DialogContent = forwardRef<ContentElement, ContentProps>(
  (props: ScopedProps<ContentProps>, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useRootContext(CONTENT_NAME, props.__scopeDialog);
    return (
      <Presence present={forceMount || context.open}>
        {context.modal ? (
          <ContentModal {...contentProps} ref={forwardedRef} />
        ) : (
          <ContentNonModal {...contentProps} ref={forwardedRef} />
        )}
      </Presence>
    );
  },
);

DialogContent.displayName = CONTENT_NAME;

export type { ContentElement, ContentProps };
export default DialogContent;

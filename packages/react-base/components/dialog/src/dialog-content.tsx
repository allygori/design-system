import { forwardRef } from "react";
import { ScopedProps, useDialogContext, usePortalContext } from "./lib/context";
import Presence from "@allygory/presence";
import DialogContentModal from "./dialog-content-modal";
import DialogContentNonModal from "./dialog-content-non-modal";
import type {
  DialogContentImplElement,
  DialogContentImplProps,
} from "./dialog-content-impl";
import { CONTENT_NAME } from "./lib/constants";

type DialogContentElement = DialogContentImplElement;
type DialogContentProps = DialogContentImplProps & {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
};

const DialogContent = forwardRef<DialogContentElement, DialogContentProps>(
  (props: ScopedProps<DialogContentProps>, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return (
      <Presence present={forceMount || context.open}>
        {context.modal ? (
          <DialogContentModal {...contentProps} ref={forwardedRef} />
        ) : (
          <DialogContentNonModal {...contentProps} ref={forwardedRef} />
        )}
      </Presence>
    );
  },
);

DialogContent.displayName = CONTENT_NAME;

export type { DialogContentProps };
export default DialogContent;

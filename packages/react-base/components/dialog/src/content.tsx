import { forwardRef } from "react";
import {
  ScopedProps,
  useDialogContext,
  usePortalContext,
} from "./shared/context";
import Presence from "@allygory/presence";
import DialogContentModal from "./content-modal";
import DialogContentNonModal from "./content-non-modal";
import type {
  DialogContentImplElement,
  DialogContentImplProps,
} from "./content-impl";
import { CONTENT_NAME } from "./shared/constants";

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

export type { DialogContentProps, DialogContentElement };
export default DialogContent;

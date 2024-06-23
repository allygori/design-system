import { forwardRef, useEffect, useRef } from "react";
import { hideOthers } from "aria-hidden";
import useComposedRefs from "@allygory/use-compose-refs";
import { composeEventHandlers } from "@allygory/element";
import { ScopedProps, useDialogContext } from "./lib/context";
import { CONTENT_NAME } from "./lib/constants";
import DialogContentImpl from "./dialog-content-impl";
import type {
  DialogContentImplElement,
  DialogContentImplProps,
} from "./dialog-content-impl";

type DialogContentTypeElement = DialogContentImplElement;
type DialogContentTypeProps = Omit<
  DialogContentImplProps,
  "trapFocus" | "disableOutsidePointerEvents"
>;

const DialogContentModal = forwardRef<
  DialogContentTypeElement,
  DialogContentTypeProps
>((props: ScopedProps<DialogContentTypeProps>, forwardedRef) => {
  const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
  const contentRef = useRef<HTMLDivElement>(null);
  const composedRefs = useComposedRefs(
    forwardedRef,
    context.contentRef,
    contentRef,
  );

  // aria-hide everything except the content (better supported equivalent to setting aria-modal)
  useEffect(() => {
    const content = contentRef.current;
    if (content) return hideOthers(content);
  }, []);

  return (
    <DialogContentImpl
      {...props}
      ref={composedRefs}
      // we make sure focus isn't trapped once `DialogContent` has been closed
      // (closed !== unmounted when animating out)
      trapFocus={context.open}
      disableOutsidePointerEvents
      onCloseAutoFocus={composeEventHandlers(
        props.onCloseAutoFocus,
        (event) => {
          event.preventDefault();
          context.triggerRef.current?.focus();
        },
      )}
      onPointerDownOutside={composeEventHandlers(
        props.onPointerDownOutside,
        (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick =
            originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

          // If the event is a right-click, we shouldn't close because
          // it is effectively as if we right-clicked the `Overlay`.
          if (isRightClick) event.preventDefault();
        },
      )}
      // When focus is trapped, a `focusout` event may still happen.
      // We make sure we don't trigger our `onDismiss` in such case.
      onFocusOutside={composeEventHandlers(props.onFocusOutside, (event) =>
        event.preventDefault(),
      )}
    />
  );
});

DialogContentModal.displayName = CONTENT_NAME;

export type { DialogContentTypeProps };
export default DialogContentModal;

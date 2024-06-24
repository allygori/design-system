import { forwardRef, useRef } from "react";
import { ScopedProps, useDialogContext } from "./shared/context";
import { CONTENT_NAME } from "./shared/constants";
import DialogContentImpl from "./content-impl";
import type {
  DialogContentImplElement,
  DialogContentImplProps,
} from "./content-impl";

type DialogContentTypeElement = DialogContentImplElement;
type DialogContentTypeProps = DialogContentImplProps;

const DialogContentNonModal = forwardRef<
  DialogContentTypeElement,
  DialogContentTypeProps
>((props: ScopedProps<DialogContentTypeProps>, forwardedRef) => {
  const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
  const hasInteractedOutsideRef = useRef(false);
  const hasPointerDownOutsideRef = useRef(false);

  return (
    <DialogContentImpl
      {...props}
      ref={forwardedRef}
      trapFocus={false}
      disableOutsidePointerEvents={false}
      onCloseAutoFocus={(event) => {
        props.onCloseAutoFocus?.(event);

        if (!event.defaultPrevented) {
          if (!hasInteractedOutsideRef.current)
            context.triggerRef.current?.focus();
          // Always prevent auto focus because we either focus manually or want user agent focus
          event.preventDefault();
        }

        hasInteractedOutsideRef.current = false;
        hasPointerDownOutsideRef.current = false;
      }}
      onInteractOutside={(event) => {
        props.onInteractOutside?.(event);

        if (!event.defaultPrevented) {
          hasInteractedOutsideRef.current = true;
          if (event.detail.originalEvent.type === "pointerdown") {
            hasPointerDownOutsideRef.current = true;
          }
        }

        // Prevent dismissing when clicking the trigger.
        // As the trigger is already setup to close, without doing so would
        // cause it to close and immediately open.
        const target = event.target as HTMLElement;
        const targetIsTrigger = context.triggerRef.current?.contains(target);
        if (targetIsTrigger) event.preventDefault();

        // On Safari if the trigger is inside a container with tabIndex={0}, when clicked
        // we will get the pointer down outside event on the trigger, but then a subsequent
        // focus outside event on the container, we ignore any focus outside event when we've
        // already had a pointer down outside event.
        if (
          event.detail.originalEvent.type === "focusin" &&
          hasPointerDownOutsideRef.current
        ) {
          event.preventDefault();
        }
      }}
    />
  );
});

DialogContentNonModal.displayName = CONTENT_NAME;

export type { DialogContentTypeProps };
export default DialogContentNonModal;

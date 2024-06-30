import { forwardRef, useRef } from "react";
import { type ScopedProps, useRootContext } from "./shared/context";
import { CONTENT_NAME } from "./shared/constants";
import DialogContentImpl from "./content-impl";
import type { ContentImplElement, ContentImplProps } from "./content-impl";

type ContentNonModalElement = ContentImplElement;
type ContentNonModalProps = ContentImplProps;

const ContentNonModal = forwardRef<ContentNonModalElement, ContentNonModalProps>(
  (props: ScopedProps<ContentNonModalProps>, forwardedRef) => {
    const context = useRootContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = useRef(false);
    const hasPointerDownOutsideRef = useRef(false);

    return (
      <DialogContentImpl
        {...props}
        ref={forwardedRef}
        disableOutsidePointerEvents={false}
        trapFocus={false}
        onCloseAutoFocus={(event) => {
          props.onCloseAutoFocus?.(event);

          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
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
  },
);

ContentNonModal.displayName = CONTENT_NAME;

export type { ContentNonModalElement, ContentNonModalProps };
export default ContentNonModal;

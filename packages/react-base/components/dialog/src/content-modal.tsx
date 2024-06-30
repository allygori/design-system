import { forwardRef, useEffect, useRef } from "react";
import { hideOthers } from "aria-hidden";
import { composeEventHandlers } from "@allygory/element";
import useComposedRefs from "@allygory/use-compose-refs";
import { CONTENT_NAME } from "./shared/constants";
import DialogContentImpl from "./content-impl";
import { type ScopedProps, useRootContext } from "./shared/context";
import type { ContentImplElement, ContentImplProps } from "./content-impl";

type ContentModalElement = ContentImplElement;
type ContentModalProps = Omit<
  ContentImplProps,
  "trapFocus" | "disableOutsidePointerEvents"
>;

const ContentModal = forwardRef<ContentModalElement, ContentModalProps>(
  (props: ScopedProps<ContentModalProps>, forwardedRef) => {
    const context = useRootContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);

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
        disableOutsidePointerEvents
        trapFocus={context.open}
        onCloseAutoFocus={composeEventHandlers(props.onCloseAutoFocus, (event) => {
          event.preventDefault();
          context.triggerRef.current?.focus();
        })}
        // When focus is trapped, a `focusout` event may still happen.
        // We make sure we don't trigger our `onDismiss` in such case.
        onFocusOutside={composeEventHandlers(props.onFocusOutside, (event) => {
          event.preventDefault();
        })}
        onPointerDownOutside={composeEventHandlers(
          props.onPointerDownOutside,
          (event) => {
            const originalEvent = event.detail.originalEvent;
            const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

            // If the event is a right-click, we shouldn't close because
            // it is effectively as if we right-clicked the `Overlay`.
            if (isRightClick) event.preventDefault();
          },
        )}
      />
    );
  },
);

ContentModal.displayName = CONTENT_NAME;

export type { ContentModalElement, ContentModalProps };
export default ContentModal;

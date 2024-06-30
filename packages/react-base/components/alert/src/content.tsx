import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef, useRef } from "react";
import * as Dialog from "@allygory/dialog";
import useComposeRefs from "@allygory/use-compose-refs";
import { Slotablle } from "@allygory/slot";
import { composeEventHandlers } from "@allygory/element";
import { CONTENT_NAME, TITLE_NAME } from "./shared/constants";
import { type ScopedProps } from "./shared/types";
import { AlertContentProvider, useDialogScope } from "./shared/context";
import type { AlertCancelElement } from "./cancel";

type AlertContentElement = ElementRef<typeof Dialog.Content>;
type DialogContentProps = ComponentPropsWithoutRef<typeof Dialog.Content>;
type AlertContentProps = Omit<
  DialogContentProps,
  "onPointerDownOutside" | "onInteractiveOutisde"
>;

const AlertContent = forwardRef<AlertContentElement, AlertContentProps>(
  (props: ScopedProps<AlertContentProps>, forwardedRef) => {
    const { __scopeAlert, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlert);
    const contentRef = useRef<AlertContentElement>(null);
    const composeRefs = useComposeRefs(forwardedRef, contentRef);
    const cancelRef = useRef<AlertCancelElement | null>(null);

    return (
      <Dialog.WarningProvider
        contentName={CONTENT_NAME}
        docsSlug="alert"
        titleName={TITLE_NAME}
      >
        <AlertContentProvider cancelRef={cancelRef} scope={__scopeAlert}>
          <Dialog.Content
            ref={composeRefs}
            role="alertdialog"
            {...dialogScope}
            {...contentProps}
            onInteractOutside={(event) => {
              event.preventDefault();
            }}
            onOpenAutoFocus={composeEventHandlers(
              contentProps.onOpenAutoFocus,
              (event) => {
                event.preventDefault();
                cancelRef.current?.focus({ preventScroll: true });
              },
            )}
            onPointerDownOutside={(event) => {
              event.preventDefault();
            }}
          >
            {/**
             * We have to use `Slottable` here as we cannot wrap the `AlertDialogContentProvider`
             * around everything, otherwise the `DescriptionWarning` would be rendered straight away.
             * This is because we want the accessibility checks to run only once the content is actually
             * open and that behaviour is already encapsulated in `DialogContent`.
             */}
            <Slotablle>{children}</Slotablle>
            {process.env.NODE_ENV === "development" && (
              <Dialog.DescriptionWarning contentRef={contentRef} />
            )}
          </Dialog.Content>
        </AlertContentProvider>
      </Dialog.WarningProvider>
    );
  },
);

AlertContent.displayName = CONTENT_NAME;

export type { AlertContentProps, AlertContentElement };
export default AlertContent;

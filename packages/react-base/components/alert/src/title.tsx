import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import * as Dialog from "@allygory/dialog";
import { TITLE_NAME } from "./shared/constants";
import { useDialogScope } from "./shared/context";
import type { ScopedProps } from "./shared/types";

type AlertTitleElement = ElementRef<typeof Dialog.Title>;
type AlertTitleProps = ComponentPropsWithoutRef<typeof Dialog.Title>;

const AlertTitle = forwardRef<AlertTitleElement, AlertTitleProps>(
  (props: ScopedProps<AlertTitleProps>, forwardedRef) => {
    const { __scopeAlert, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlert);

    return <Dialog.Title ref={forwardedRef} {...dialogScope} {...titleProps} />;
  },
);

AlertTitle.displayName = TITLE_NAME;

export type { AlertTitleProps };
export default AlertTitle;

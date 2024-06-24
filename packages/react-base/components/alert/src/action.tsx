import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as Dialog from "@allygory/dialog";
import { ACTION_NAME } from "./shared/constants";
import { ScopedProps } from "./shared/types";
import { useDialogScope } from "./shared/context";

type AlertActionElement = ElementRef<typeof Dialog.Close>;
type AlertActionProps = ComponentPropsWithoutRef<typeof Dialog.Close>;

const AlertAction = forwardRef<AlertActionElement, AlertActionProps>(
  (props: ScopedProps<AlertActionProps>, forwardedRef) => {
    const { __scopeAlert, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlert);

    return (
      <Dialog.Close ref={forwardedRef} {...dialogScope} {...actionProps} />
    );
  },
);

AlertAction.displayName = ACTION_NAME;

export type { AlertActionProps, AlertActionElement };
export default AlertAction;

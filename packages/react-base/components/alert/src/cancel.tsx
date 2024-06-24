import { ElementRef, forwardRef } from "react";
import * as Dialog from "@allygory/dialog";
import useComposeRefs from "@allygory/use-compose-refs";
import { CANCEL_NAME } from "./shared/constants";
import { ScopedProps } from "./shared/types";
import { useAlertContentContext, useDialogScope } from "./shared/context";

type AlertCancelElement = ElementRef<typeof Dialog.Close>;
type AlertCancelProps = Dialog.DialogCloseProps;

const AlertCancel = forwardRef<AlertCancelElement, AlertCancelProps>(
  (props: ScopedProps<AlertCancelProps>, forwardedRef) => {
    const { __scopeAlert, ...cancelProps } = props;
    const { cancelRef } = useAlertContentContext(CANCEL_NAME, __scopeAlert);
    const dialogScope = useDialogScope(__scopeAlert);
    const ref = useComposeRefs(forwardedRef, cancelRef);

    return <Dialog.Close ref={ref} {...dialogScope} {...cancelProps} />;
  },
);

AlertCancel.displayName = CANCEL_NAME;

export type { AlertCancelProps, AlertCancelElement };
export default AlertCancel;

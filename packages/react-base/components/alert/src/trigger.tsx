import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as Dialog from "@allygory/dialog";
import { Trigger } from "@allygory/dialog";
import { TRIGGER_NAME } from "./shared/constants";
import { useDialogScope } from "./shared/context";
import type { ScopedProps } from "./shared/types";

type AlertTriggerElement = ElementRef<typeof Trigger>;
type AlertTriggerProps = ComponentPropsWithoutRef<typeof Trigger>;

const AlertTrigger = forwardRef<AlertTriggerElement, AlertTriggerProps>(
  (props: ScopedProps<AlertTriggerProps>, forwardedRef) => {
    const { __scopeAlert, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlert);

    return (
      <Dialog.Trigger ref={forwardedRef} {...dialogScope} {...triggerProps} />
    );
  },
);

AlertTrigger.displayName = TRIGGER_NAME;

export type { AlertTriggerProps, AlertTriggerElement };
export default AlertTrigger;

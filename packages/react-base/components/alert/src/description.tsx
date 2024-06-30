import * as Dialog from "@allygory/dialog";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { type ScopedProps } from "./shared/types";
import { useDialogScope } from "./shared/context";
import { DESCRIPTION_NAME } from "./shared/constants";

type AlertDescriptionElement = ElementRef<typeof Dialog.Description>;
type AlertDescriptionProps = ComponentPropsWithoutRef<typeof Dialog.Description>;

const AlertDescription = forwardRef<AlertDescriptionElement, AlertDescriptionProps>(
  (props: ScopedProps<AlertDescriptionProps>, forwardedRef) => {
    const { __scopeAlert, ...descriptionProps } = props;
    const dialogScope = useDialogScope(__scopeAlert);

    return (
      <Dialog.Description ref={forwardedRef} {...dialogScope} {...descriptionProps} />
    );
  },
);

AlertDescription.displayName = DESCRIPTION_NAME;

export type { AlertDescriptionProps };
export default AlertDescription;

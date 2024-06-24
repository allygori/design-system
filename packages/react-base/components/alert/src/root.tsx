import { ComponentPropsWithoutRef, FC } from "react";
import * as Dialog from "@allygory/dialog";
import { useDialogScope } from "./shared/context";
import { ROOT_NAME } from "./shared/constants";
import type { ScopedProps } from "./shared/types";

type DialogProps = ComponentPropsWithoutRef<typeof Dialog.Root>;
type AlertRootProps = Omit<DialogProps, "modal">;

const AlertRoot: FC<AlertRootProps> = (props: ScopedProps<AlertRootProps>) => {
  const { __scopeAlert, ...alertProps } = props;
  const dialogScope = useDialogScope(__scopeAlert);

  return <Dialog.Root {...dialogScope} {...alertProps} modal={true} />;
};

AlertRoot.displayName = ROOT_NAME;

export type { AlertRootProps };
export default AlertRoot;

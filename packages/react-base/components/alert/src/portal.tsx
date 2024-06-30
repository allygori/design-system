import type { ComponentPropsWithoutRef, FC } from "react";
import * as Dialog from "@allygory/dialog";
import { PORTAL_NAME } from "./shared/constants";
import { useDialogScope } from "./shared/context";
import type { ScopedProps } from "./shared/types";

type AlertPortalProps = ComponentPropsWithoutRef<typeof Dialog.Portal>;

const AlertPortal: FC<AlertPortalProps> = (props: ScopedProps<AlertPortalProps>) => {
  const { __scopeAlert, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlert);

  return <Dialog.Portal {...dialogScope} {...portalProps} />;
};

AlertPortal.displayName = PORTAL_NAME;

export type { AlertPortalProps };
export default AlertPortal;

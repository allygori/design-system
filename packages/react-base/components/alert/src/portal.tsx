import { ComponentPropsWithoutRef, FC } from "react";
import * as Dialog from "@allygory/dialog";
import { Portal } from "@allygory/dialog";
import { PORTAL_NAME } from "./shared/constants";
import { ScopedProps } from "./shared/types";
import { useDialogScope } from "./shared/context";

type AlertPortalProps = ComponentPropsWithoutRef<typeof Portal>;

const AlertPortal: FC<AlertPortalProps> = (
  props: ScopedProps<AlertPortalProps>,
) => {
  const { __scopeAlert, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlert);

  return <Dialog.Portal {...dialogScope} {...portalProps} />;
};

AlertPortal.displayName = PORTAL_NAME;

export type { AlertPortalProps };
export default AlertPortal;

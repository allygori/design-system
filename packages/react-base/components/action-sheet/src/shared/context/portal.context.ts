import { PORTAL_NAME } from "../constants";
import { createRootContext } from "./root.context";

type PortalContextValue = { forceMount?: true };
const [PortalProvider, usePortalContext] = createRootContext<PortalContextValue>(
  PORTAL_NAME,
  {
    forceMount: undefined,
  },
);

export {
  PortalProvider,
  //
  usePortalContext,
};

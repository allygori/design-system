import type { ScopedProps } from "./root.context";
import {
  RootProvider,
  createRootContext,
  createRootScope,
  useRootContext,
  useDialogScope,
} from "./root.context";
import { PortalProvider, usePortalContext } from "./portal.context";
import { ContentProvider, useContentContext } from "./content.context";

export type { ScopedProps };
export {
  RootProvider,
  PortalProvider,
  ContentProvider,
  //
  createRootContext,
  createRootScope,
  useDialogScope,
  useRootContext,
  usePortalContext,
  useContentContext,
};

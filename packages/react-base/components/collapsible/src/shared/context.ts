import { type Scope, createContextScope } from "@allygory/context";
import { COLLAPSIBLE_NAME } from "./constants";

type ScopedProps<P> = P & { __scopeCollapsible?: Scope };
type CollapsibleContextValue = {
  contentId: string;
  disabled?: boolean;
  open: boolean;
  onOpenToggle(): void;
};

const [createCollapsibleContext, createCollapsibleScope] =
  createContextScope(COLLAPSIBLE_NAME);
const [CollapsibleProvider, useCollapsibleContext] =
  createCollapsibleContext<CollapsibleContextValue>(COLLAPSIBLE_NAME);

export type { ScopedProps };
export { createCollapsibleScope, useCollapsibleContext, CollapsibleProvider };

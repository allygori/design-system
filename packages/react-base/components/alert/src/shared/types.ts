import type { Scope } from "@allygory/context";

export type ScopedProps<P> = P & { __scopeAlert?: Scope };

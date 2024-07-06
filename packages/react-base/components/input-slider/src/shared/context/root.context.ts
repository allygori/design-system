import createCollection from "@allygory/collection";
import { createContextScope, type Scope } from "@allygory/context";
import { ROOT_NAME } from "../constants";
import type { ThumbElement } from "../../thumb";
import type { RootProps } from "../../root";

type ScopedProps<P> = P & { __scopeSlider?: Scope };
type RootContextValue = {
  name?: string;
  disabled?: boolean;
  min: number;
  max: number;
  values: number[];
  valueIndexToChangeRef: React.MutableRefObject<number>;
  thumbs: Set<ThumbElement>;
  orientation: RootProps["orientation"];
};

const [Collection, useCollection, createCollectionScope] =
  createCollection<ThumbElement>(ROOT_NAME);
const [createRootContext, createRootScope] = createContextScope(ROOT_NAME, [
  createCollectionScope,
]);
const [RootProvider, useRootContext] = createRootContext<RootContextValue>(ROOT_NAME);

export type { ScopedProps, RootContextValue };
export {
  Collection,
  RootProvider,
  //
  useCollection,
  useRootContext,
  createRootScope,
  createRootContext,
};

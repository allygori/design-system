import { useContext } from "react";
import { DirectionProvider, DirectionContext } from "./provider";
import type { Direction, DirectionProviderProps } from "./provider";

const useDirection = (localDir?: Direction): Direction => {
  const globalDir = useContext(DirectionContext);
  return localDir || globalDir || "ltr";
};

const Provider = DirectionProvider;

export type { Direction, DirectionProviderProps };
export {
  useDirection,
  //
  Provider,
  //
  DirectionProvider,
};

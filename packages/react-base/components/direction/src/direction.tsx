import type { FC, ReactNode } from "react";
import { createContext, useContext } from "react";

type Direction = "ltr" | "rtl";
const DirectionContext = createContext<Direction | undefined>(undefined);

type DirectionProviderProps = {
  children?: ReactNode;
  dir: Direction;
};

const DirectionProvider: FC<DirectionProviderProps> = (props) => {
  const { dir, children } = props;
  return <DirectionContext.Provider value={dir}>{children}</DirectionContext.Provider>;
};

const useDirection = (localDir?: Direction): Direction => {
  const globalDir = useContext(DirectionContext);
  return localDir || globalDir || "ltr";
};

const Provider = DirectionProvider;

export type { Direction };
export {
  useDirection,
  //
  Provider,
  //
  DirectionProvider,
};

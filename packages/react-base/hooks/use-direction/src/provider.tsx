import type { FC, ReactNode } from "react";
import { createContext } from "react";

type Direction = "ltr" | "rtl";

type DirectionProviderProps = {
  children?: ReactNode;
  dir: Direction;
};

const DirectionContext = createContext<Direction | undefined>(undefined);

const DirectionProvider: FC<DirectionProviderProps> = (props) => {
  const { dir, children } = props;

  return <DirectionContext.Provider value={dir}>{children}</DirectionContext.Provider>;
};

export type { Direction, DirectionProviderProps };
export { DirectionProvider, DirectionContext };

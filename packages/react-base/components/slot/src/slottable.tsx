import type { ReactNode } from "react";
import { Fragment } from "react";

type Props = {
  children: ReactNode;
};

const Slottable = ({ children }: Props) => {
  return <Fragment>{children}</Fragment>;
};

export default Slottable;

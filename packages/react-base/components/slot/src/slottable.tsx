import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Slottable = ({ children }: Props): JSX.Element => {
  return <>{children}</>;
};

export default Slottable;

import { Children, FC, ReactElement, cloneElement } from "react";
import useComposedRefs from "@allygory/use-compose-refs";
import usePresence from "./lib/use-presence";
import { getElementRef } from "./lib/utils";

type PresenceProps = {
  children: ReactElement | ((props: { present: boolean }) => ReactElement);
  present: boolean;
};

const Presence: FC<PresenceProps> = (props) => {
  const { present, children } = props;
  const presence = usePresence(present);

  const child = (
    typeof children === "function"
      ? children({ present: presence.isPresent })
      : Children.only(children)
  ) as ReactElement;

  const ref = useComposedRefs(presence.ref, getElementRef(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? cloneElement(child, { ref }) : null;
};

Presence.displayName = "Presence";

export type { PresenceProps };
export default Presence;

import {
  Children,
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";
import { composeRefs } from "@allygory/use-compose-refs";
import { getElementRef, mergeProps } from "./utils";

type SlotCloneProps = {
  children?: ReactNode;
};

const SlotClone = forwardRef<HTMLElement, SlotCloneProps>(
  (props, forwardedRef) => {
    const { children, ...slotProps } = props;

    if (isValidElement(children)) {
      const childrenRef = getElementRef(children);

      return cloneElement(children, {
        ...mergeProps(slotProps, children.props),
        // @ts-ignore
        ref: forwardedRef
          ? composeRefs(forwardedRef, childrenRef)
          : childrenRef,
      });
    }

    return Children.count(children) > 1 ? Children.only(null) : null;
  },
);

SlotClone.displayName = "SlotClone";

export default SlotClone;

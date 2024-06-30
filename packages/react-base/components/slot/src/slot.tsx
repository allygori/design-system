/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { HTMLAttributes, ReactNode } from "react";
import { Children, cloneElement, forwardRef, isValidElement } from "react";
import SlotClone from "./slot-clone";
import { isSlottable } from "./utils";

type SlotProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
};

const Slot = forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);

  if (slottable) {
    // the new element to render is the one passed as a child of `Slottable`
    const newElement = slottable.props.children as ReactNode;

    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        // because the new element will be the one rendered, we are only interested
        // in grabbing its children (`newElement.props.children`)
        if (Children.count(newElement) > 1) {
          return Children.only(null);
        }

        return isValidElement(newElement)
          ? (newElement.props.children as ReactNode)
          : null;
      }

      return child;
    });

    return (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {isValidElement(newElement)
          ? cloneElement(newElement, undefined, newChildren)
          : null}
      </SlotClone>
    );
  }

  return (
    <SlotClone {...slotProps} ref={forwardedRef}>
      {children}
    </SlotClone>
  );
});

Slot.displayName = "Slot";

export default Slot;

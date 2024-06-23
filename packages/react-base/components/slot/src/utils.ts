/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ReactNode, isValidElement, type ReactElement } from "react";
import Slottable from "./slottable";

type AnyProps = Record<string, any>;

const getElementRef = (element: ReactElement) => {
  // React <= 18 in DEV
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;

  if (mayWarn) {
    return (element as any).ref;
  }

  // React 19 in DEV
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;

  if (mayWarn) {
    return element.props.ref;
  }

  // Not DEV
  return element.props.ref || (element as any).ref;
};

const mergeProps = (slotProps: AnyProps, childProps: AnyProps) => {
  // all child props should override
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handle exists on both, we compose them
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      }
      // but if it exists only on the slot, we use only this one
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(" ");
    }
  }

  return { ...slotProps, ...overrideProps };
};

const isSlottable = (child?: ReactNode): child is ReactElement => {
  return isValidElement(child) && child.type === Slottable;
};

export { getElementRef, mergeProps, isSlottable };

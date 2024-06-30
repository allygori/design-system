import type { MutableRefObject } from "react";
import type { PossibleRef } from "./types";

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
const setRef = <T>(ref: PossibleRef<T>, value: T): void => {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as MutableRefObject<T>).current = value;
  }
};

/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
const composeRefs = <T>(...refs: PossibleRef<T>[]) => {
  return (node: T) => {
    refs.forEach((ref) => {
      setRef(ref, node);
    });
  };
};

export { composeRefs };

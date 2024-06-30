import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useState, useRef } from "react";
import useCallbackRef from "@allygory/use-callback-ref";

type UseControllableStateParams<T> = {
  prop?: T | undefined;
  defaultProp?: T | undefined;
  onChange?: (state: T) => void;
};

type SetStateFn<T> = (prevState?: T) => T;
type State<T> = [T | undefined, Dispatch<SetStateAction<T | undefined>>];

const useControlledState = <T>({
  defaultProp,
  onChange,
}: Omit<UseControllableStateParams<T>, "prop">): State<T> => {
  // eslint-disable-next-line react/hook-use-state -- ignore
  const uncontrolledState = useState<T | undefined>(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = useRef(value);
  const handleChange = useCallbackRef(onChange);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value as T);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);

  return uncontrolledState;
};

const useControllableState = <T>({
  prop,
  defaultProp,
  onChange = () => null,
}: UseControllableStateParams<T>): State<T> => {
  const [uncontrolledProp, setUncontrolledProp] = useControlledState({
    defaultProp,
    onChange,
  });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;
  const handleChange = useCallbackRef(onChange);

  const setValue: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue as SetStateFn<T>;
        const val = typeof nextValue === "function" ? setter(prop) : nextValue;
        if (val !== prop) handleChange(val as T);
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, handleChange],
  );

  return [value, setValue] as const;
};

export default useControllableState;

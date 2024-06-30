import type { Dispatch } from "react";
import { useReducer } from "react";

// 🤯 https://fettblog.eu/typescript-union-to-intersection/
type UnionToIntersection<T> = (T extends unknown ? (x: T) => unknown : never) extends (
  x: infer R,
) => unknown
  ? R
  : never;

type Machine<S> = Record<string, Record<string, S>>;
type MachineState<T> = keyof T;
type MachineEvent<T> = keyof UnionToIntersection<T[keyof T]>;

const useStateMachine = <M>(
  initialState: MachineState<M>,
  machine: M & Machine<MachineState<M>>,
): [keyof M, Dispatch<MachineEvent<M>>] => {
  return useReducer((state: MachineState<M>, event: MachineEvent<M>): MachineState<M> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any -- ignore
    const nextState = (machine[state] as any)[event];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- ignore
    return nextState ?? state;
  }, initialState);
};

export default useStateMachine;

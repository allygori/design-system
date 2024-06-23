import { useCallback } from "react";
import { composeRefs } from "./utils";
import type { PossibleRef } from "./types";

/**
 * A custom hook that compose multiple refs.
 * Accept callback refs and RefObject(s)
 */
const useComposeRefs = <T>(...refs: PossibleRef<T>[]) => {
  return useCallback(composeRefs(...refs), refs);
};

export default useComposeRefs;

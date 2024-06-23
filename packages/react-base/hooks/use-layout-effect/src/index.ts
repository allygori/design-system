import { useLayoutEffect as reactUseLayoutEffect } from "react";

const useLayoutEffect = Boolean(globalThis?.document)
  ? reactUseLayoutEffect
  : () => {};

export default useLayoutEffect;

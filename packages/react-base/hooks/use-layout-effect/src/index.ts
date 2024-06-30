import { useLayoutEffect as reactUseLayoutEffect } from "react";

// eslint-disable-next-line no-extra-boolean-cast -- ignore
const useLayoutEffect = Boolean(globalThis.document) ? reactUseLayoutEffect : () => null;

export default useLayoutEffect;

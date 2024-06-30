import useCallbackRef from "@allygory/use-callback-ref";
import { useLayoutEffect } from "react";

const useNextFrame = (callback = () => void 0): void => {
  const fn = useCallbackRef(callback);
  useLayoutEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    raf1 = window.requestAnimationFrame(() => (raf2 = window.requestAnimationFrame(fn)));

    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
    };
  }, [fn]);
};

export default useNextFrame;

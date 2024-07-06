import { useState } from "react";
import useLayoutEffect from "@allygory/use-layout-effect";

type Size = {
  width: number;
  height: number;
};

const useSize = (element: HTMLElement | null): Size | undefined => {
  const [size, setSize] = useState<Size | undefined>(undefined);

  useLayoutEffect(() => {
    if (element) {
      // provide size as early as possible
      setSize({ width: element.offsetWidth, height: element.offsetHeight });

      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }

        // Since we only observe the one element, we don't need to loop over the
        // array
        if (!entries.length) {
          return;
        }

        const entry = entries[0];
        let width: number;
        let height: number;

        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry.borderBoxSize;
          // iron out differences between browsers
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
          const borderSize = Array.isArray(borderSizeEntry)
            ? borderSizeEntry[0]
            : borderSizeEntry;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- ignore
          width = borderSize.inlineSize;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- ignore
          height = borderSize?.blockSize;
        } else {
          // for browsers that don't support `borderBoxSize`
          // we calculate it ourselves to get the correct border box.
          width = element.offsetWidth;
          height = element.offsetHeight;
        }

        setSize({ width, height });
      });

      resizeObserver.observe(element, { box: "border-box" });

      return () => {
        resizeObserver.unobserve(element);
      };
    }

    // We only want to reset to `undefined` when the element becomes `null`,
    // not if it changes to another element.
    setSize(undefined);
  }, [element]);

  return size;
};

export type { Size };
export default useSize;

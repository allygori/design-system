import type { ReactNode } from "react";
import { useEffect } from "react";

let count = 0;

const createFocusGuard = (): HTMLSpanElement => {
  const element = document.createElement("span");
  element.setAttribute(`miru-focus-guard`, "");
  element.tabIndex = 0;
  element.style.cssText =
    "outline: none; opacity: 0; position: fixed; pointer-events: none;";

  return element;
};

const useFocusGuards = (): void => {
  useEffect(() => {
    const edgeGuards = document.querySelectorAll(`[miru-focus-guard]`);

    document.body.insertAdjacentElement(
      "afterbegin",
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
      edgeGuards[0] ?? createFocusGuard(),
    );
    document.body.insertAdjacentElement(
      "beforeend",
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore
      edgeGuards[1] ?? createFocusGuard(),
    );
    count++;

    return () => {
      if (count === 1) {
        document.querySelectorAll(`[miru-focus-guard]`).forEach((node) => {
          node.remove();
        });
      }

      count--;
    };
  }, []);
};

const FocusGuards = (props: { children: ReactNode }): ReactNode => {
  useFocusGuards();

  return props.children;
};

const Root = FocusGuards;

export {
  FocusGuards,
  //
  Root,
  //
};

export default useFocusGuards;

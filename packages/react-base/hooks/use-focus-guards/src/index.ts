import { useEffect } from "react";

let count = 0;

const createFocusGuard = () => {
  const element = document.createElement("span");
  element.setAttribute(`miru-focus-guard`, "");
  element.tabIndex = 0;
  element.style.cssText =
    "outline: none; opacity: 0; position: fixed; pointer-events: none;";

  return element;
};

const useFocusGuards = () => {
  useEffect(() => {
    const edgeGuards = document.querySelectorAll(`[miru-focus-guard]`);

    document.body.insertAdjacentElement(
      "afterbegin",
      edgeGuards[0] ?? createFocusGuard(),
    );
    document.body.insertAdjacentElement(
      "beforeend",
      edgeGuards[1] ?? createFocusGuard(),
    );
    count++;

    return () => {
      if (count === 1) {
        document
          .querySelectorAll(`[miru-focus-guard]`)
          .forEach((node) => node.remove());
      }

      count--;
    };
  }, []);
};

const FocusGuards = (props: any) => {
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

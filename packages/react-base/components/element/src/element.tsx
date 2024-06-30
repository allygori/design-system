/* eslint-disable @typescript-eslint/no-explicit-any -- ignore */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- ignore */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- ignore */
import type {
  ComponentPropsWithRef,
  ElementType,
  ForwardRefExoticComponent,
} from "react";
import { forwardRef } from "react";
import Slot from "@allygory/slot";

const NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "nav",
  "ul",
  "ol",
  "li",
  "p",
  "span",
  "svg",
] as const;

type ElementPropsWithRef<E extends ElementType> = ComponentPropsWithRef<E> & {
  asChild?: boolean;
};
type ElementForwardRefComponent<E extends ElementType> = ForwardRefExoticComponent<
  ElementPropsWithRef<E>
>;
type Elements = {
  [E in (typeof NODES)[number]]: ElementForwardRefComponent<E>;
};

const Element = NODES.reduce((element, node) => {
  const Node = forwardRef(
    (props: ElementPropsWithRef<typeof node>, forwardedRef: any) => {
      const { asChild, ...elementProps } = props;
      const Comp: any = asChild ? Slot : node;

      if (typeof window !== "undefined") {
        (window as any)[Symbol.for("allygory")] = true;
      }

      return <Comp {...elementProps} ref={forwardedRef} />;
    },
  );

  Node.displayName = `Element.${node}`;

  return { ...element, [node]: Node };
}, {} as Elements);

export type { ElementPropsWithRef };
export default Element;

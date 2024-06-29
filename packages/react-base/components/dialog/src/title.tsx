import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import Element from "@allygory/element";
import { TITLE_NAME } from "./shared/constants";
import { type ScopedProps, useRootContext } from "./shared/context";

type TitleElement = ElementRef<typeof Element.h2>;
type TitleProps = ComponentPropsWithoutRef<typeof Element.h2>;

const Title = forwardRef<TitleElement, TitleProps>(
  (props: ScopedProps<TitleProps>, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useRootContext(TITLE_NAME, __scopeDialog);
    return <Element.h2 id={context.titleId} {...titleProps} ref={forwardedRef} />;
  },
);

Title.displayName = TITLE_NAME;

export type { TitleElement, TitleProps };
export default Title;

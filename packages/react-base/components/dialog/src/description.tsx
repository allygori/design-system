import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import Element from "@allygory/element";
import { DESCRIPTION_NAME } from "./shared/constants";
import { type ScopedProps, useRootContext } from "./shared/context";

type DescriptionElement = ElementRef<typeof Element.p>;
type DescriptionProps = ComponentPropsWithoutRef<typeof Element.p>;

const Description = forwardRef<DescriptionElement, DescriptionProps>(
  (props: ScopedProps<DescriptionProps>, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useRootContext(DESCRIPTION_NAME, __scopeDialog);
    return (
      <Element.p id={context.descriptionId} {...descriptionProps} ref={forwardedRef} />
    );
  },
);

Description.displayName = DESCRIPTION_NAME;

export type { DescriptionElement, DescriptionProps };
export default Description;

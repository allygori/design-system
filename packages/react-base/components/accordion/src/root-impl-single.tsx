/* eslint-disable tsdoc/syntax -- ignore */
import { forwardRef, useCallback } from "react";
import useControllableState from "@allygory/use-controllable-state";
import { ACCORDION_NAME } from "./shared/constants";
import {
  AccordionCollapsibleProvider,
  AccordionValueProvider,
} from "./shared/context/root-impl-single.context";
import AccordionImpl from "./root-impl";
import type { AccordionRootImplElement, AccordionRootImplProps } from "./root-impl";
import type { ScopedProps } from "./shared/context/base.context";

type AccordionRootImplSingleElement = AccordionRootImplElement;
type AccordionRootImplSingleProps = AccordionRootImplProps & {
  /**
   * The controlled stateful value of the accordion item whose content is expanded.
   */
  value?: string;
  /**
   * The value of the item whose content is expanded when the accordion is initially rendered. Use
   * `defaultValue` if you do not need to control the state of an accordion.
   */
  defaultValue?: string;
  /**
   * Whether an accordion item can be collapsed after it has been opened.
   * @default false
   */
  collapsible?: boolean;
  /**
   * The callback that fires when the state of the accordion changes.
   */
  onValueChange?: (value: string) => void;
};

const AccordionRootImplSingle = forwardRef<
  AccordionRootImplSingleElement,
  AccordionRootImplSingleProps
>((props: ScopedProps<AccordionRootImplSingleProps>, forwardedRef) => {
  const {
    __scopeAccordion,
    value: valueProp,
    defaultValue,
    collapsible = false,
    onValueChange = () => null,
    ...accordionSingleProps
  } = props;

  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  return (
    <AccordionValueProvider
      scope={__scopeAccordion}
      value={value ? [value] : []}
      onItemClose={useCallback(() => {
        collapsible && setValue("");
      }, [collapsible, setValue])}
      onItemOpen={setValue}
    >
      <AccordionCollapsibleProvider collapsible={collapsible} scope={__scopeAccordion}>
        <AccordionImpl {...accordionSingleProps} ref={forwardedRef} />
      </AccordionCollapsibleProvider>
    </AccordionValueProvider>
  );
});

AccordionRootImplSingle.displayName = ACCORDION_NAME;

export type { AccordionRootImplSingleElement, AccordionRootImplSingleProps };
export default AccordionRootImplSingle;

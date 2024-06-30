import { forwardRef, useCallback } from "react";
import useControllableState from "@allygory/use-controllable-state";
import { ACCORDION_NAME } from "./shared/constants";
import type { AccordionRootImplElement, AccordionRootImplProps } from "./root-impl";
import AccordionRootImpl from "./root-impl";
import {
  AccordionCollapsibleProvider,
  AccordionValueProvider,
} from "./shared/context/root-impl-single.context";
import type { ScopedProps } from "./shared/context/base.context";

type AccordionRootImplMultipleElement = AccordionRootImplElement;
type AccordionRootImplMultipleProps = AccordionRootImplProps & {
  /**
   * The controlled stateful value of the accordion items whose contents are expanded.
   */
  value?: string[];
  /**
   * The value of the items whose contents are expanded when the accordion is initially rendered. Use
   * `defaultValue` if you do not need to control the state of an accordion.
   */
  defaultValue?: string[];
  /**
   * The callback that fires when the state of the accordion changes.
   */
  onValueChange?: (value: string[]) => void;
};

const AccordionRootImplMultiple = forwardRef<
  AccordionRootImplMultipleElement,
  AccordionRootImplMultipleProps
>((props: ScopedProps<AccordionRootImplMultipleProps>, forwardedRef) => {
  const {
    __scopeAccordion,
    value: valueProp,
    defaultValue,
    onValueChange = () => null,
    ...accordionMultipleProps
  } = props;

  const [value = [], setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  const handleItemOpen = useCallback(
    (itemValue: string) => {
      setValue((prevValue = []) => [...prevValue, itemValue]);
    },
    [setValue],
  );

  const handleItemClose = useCallback(
    (itemValue: string) => {
      setValue((preValue = []) => preValue.filter((val) => val !== itemValue));
    },
    [setValue],
  );

  return (
    <AccordionValueProvider
      scope={__scopeAccordion}
      value={value}
      onItemClose={handleItemClose}
      onItemOpen={handleItemOpen}
    >
      <AccordionCollapsibleProvider collapsible scope={__scopeAccordion}>
        <AccordionRootImpl {...accordionMultipleProps} ref={forwardedRef} />
      </AccordionCollapsibleProvider>
    </AccordionValueProvider>
  );
});

AccordionRootImplMultiple.displayName = ACCORDION_NAME;

export type { AccordionRootImplMultipleElement, AccordionRootImplMultipleProps };
export default AccordionRootImplMultiple;

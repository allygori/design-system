import { forwardRef } from "react";
import { ACCORDION_NAME } from "./shared/constants";
import { Collection, type ScopedProps } from "./shared/context";
import AccordionRootImplSingle from "./root-impl-single";
import AccordionRootImplMultiple from "./root-impl-multiple";
import type {
  AccordionRootImplSingleElement,
  AccordionRootImplSingleProps,
} from "./root-impl-single";
import type {
  AccordionRootImplMultipleElement,
  AccordionRootImplMultipleProps,
} from "./root-impl-multiple";

type AccordionRootElement =
  | AccordionRootImplMultipleElement
  | AccordionRootImplSingleElement;
type AccordionSingleProps = AccordionRootImplSingleProps & {
  type: "single";
};
type AccordionMultipleProps = AccordionRootImplMultipleProps & {
  type: "multiple";
};

const AccordionRoot = forwardRef<
  AccordionRootElement,
  AccordionSingleProps | AccordionMultipleProps
>(
  (
    props: ScopedProps<AccordionSingleProps | AccordionMultipleProps>,
    forwardedRef,
  ) => {
    const { __scopeAccordion, type, ...accordionProps } = props;
    const singleProps = accordionProps as AccordionRootImplSingleProps;
    const multipleProps = accordionProps as AccordionRootImplMultipleProps;

    return (
      <Collection.Provider scope={__scopeAccordion}>
        {type === "multiple" ? (
          <AccordionRootImplMultiple {...multipleProps} ref={forwardedRef} />
        ) : (
          <AccordionRootImplSingle {...singleProps} ref={forwardedRef} />
        )}
      </Collection.Provider>
    );
  },
);

AccordionRoot.displayName = ACCORDION_NAME;

export type {
  AccordionRootElement,
  AccordionSingleProps,
  AccordionMultipleProps,
};
export default AccordionRoot;

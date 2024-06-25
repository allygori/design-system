import {
  AriaAttributes,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useRef,
} from "react";
import Element, { composeEventHandlers } from "@allygory/element";
import useComposeRefs from "@allygory/use-compose-refs";
import { useDirection, type Direction } from "@allygory/direction";
import { ACCORDION_KEYS } from "./shared/constants";
import {
  type ScopedProps,
  Collection,
  useCollection,
} from "./shared/context/base.context";
import { AccordionRootProvider } from "./shared/context/root.context";

type AccordionRootImplElement = ElementRef<typeof Element.div>;
type AccordionRootImplProps = ComponentPropsWithoutRef<typeof Element.div> & {
  /**
   * Whether or not an accordion is disabled from user interaction.
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * The layout in which the Accordion operates.
   * @default vertical
   */
  orientation?: AriaAttributes["aria-orientation"];
  /**
   * The language read direction.
   */
  dir?: Direction;
};

const AccordionRootImpl = forwardRef<
  AccordionRootImplElement,
  AccordionRootImplProps
>((props: ScopedProps<AccordionRootImplProps>, forwardedRef) => {
  const {
    __scopeAccordion,
    disabled,
    dir,
    orientation = "vertical",
    ...accordionProps
  } = props;
  const accordionRef = useRef<AccordionRootImplElement>(null);
  const composedRefs = useComposeRefs(accordionRef, forwardedRef);
  const getItems = useCollection(__scopeAccordion);
  const direction = useDirection(dir);
  const isDirectionLTR = direction === "ltr";

  const handleKeyDown = composeEventHandlers(props.onKeyDown, (event) => {
    if (!ACCORDION_KEYS.includes(event.key)) return;
    const target = event.target as HTMLElement;
    const triggerCollection = getItems().filter(
      (item) => !item.ref.current?.disabled,
    );
    const triggerIndex = triggerCollection.findIndex(
      (item) => item.ref.current === target,
    );
    const triggerCount = triggerCollection.length;

    if (triggerIndex === -1) return;

    // Prevents page scroll while user is navigating
    event.preventDefault();

    let nextIndex = triggerIndex;
    const homeIndex = 0;
    const endIndex = triggerCount - 1;

    const moveNext = () => {
      nextIndex = triggerIndex + 1;
      if (nextIndex > endIndex) {
        nextIndex = homeIndex;
      }
    };

    const movePrev = () => {
      nextIndex = triggerIndex - 1;
      if (nextIndex < homeIndex) {
        nextIndex = endIndex;
      }
    };

    switch (event.key) {
      case "Home":
        nextIndex = homeIndex;
        break;
      case "End":
        nextIndex = endIndex;
        break;
      case "ArrowRight":
        if (orientation === "horizontal") {
          if (isDirectionLTR) {
            moveNext();
          } else {
            movePrev();
          }
        }
        break;
      case "ArrowDown":
        if (orientation === "vertical") {
          moveNext();
        }
        break;
      case "ArrowLeft":
        if (orientation === "horizontal") {
          if (isDirectionLTR) {
            movePrev();
          } else {
            moveNext();
          }
        }
        break;
      case "ArrowUp":
        if (orientation === "vertical") {
          movePrev();
        }
        break;
    }

    const clempedIndex = nextIndex % triggerCount;
    triggerCollection[clempedIndex].ref.current?.focus();
  });

  return (
    <AccordionRootProvider
      scope={__scopeAccordion}
      disabled={disabled}
      direction={dir}
      orientation={orientation}
    >
      <Collection.Slot scope={__scopeAccordion}>
        <Element.div
          {...accordionProps}
          ref={composedRefs}
          data-orientation={orientation}
          onKeyDown={disabled ? undefined : handleKeyDown}
        />
      </Collection.Slot>
    </AccordionRootProvider>
  );
});

export type { AccordionRootImplElement, AccordionRootImplProps };
export default AccordionRootImpl;

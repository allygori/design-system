import type {
  ComponentPropsWithoutRef,
  ElementRef,
  PointerEvent,
  KeyboardEvent,
} from "react";
import { forwardRef } from "react";
import Element, { composeEventHandlers } from "@allygory/element";
import { ARROW_KEYS, PAGE_KEYS, ROOT_NAME } from "./shared/constants";
import { type ScopedProps, useRootContext } from "./shared/context/root.context";

type SliderImplElement = ElementRef<typeof Element.span>;
type SliderImplPrivateProps = {
  onSlideStart: (event: PointerEvent) => void;
  onSlideMove: (event: PointerEvent) => void;
  onSlideEnd: (event: PointerEvent) => void;
  onHomeKeyDown: (event: KeyboardEvent) => void;
  onEndKeyDown: (event: KeyboardEvent) => void;
  onStepKeyDown: (event: KeyboardEvent) => void;
};
type SliderImplProps = ComponentPropsWithoutRef<typeof Element.div> &
  SliderImplPrivateProps;

const SliderImpl = forwardRef<SliderImplElement, SliderImplProps>(
  (props: ScopedProps<SliderImplProps>, forwardedRef) => {
    const {
      __scopeSlider,
      onSlideStart,
      onSlideMove,
      onSlideEnd,
      onHomeKeyDown,
      onEndKeyDown,
      onStepKeyDown,
      ...sliderProps
    } = props;
    const context = useRootContext(ROOT_NAME, __scopeSlider);

    return (
      <Element.span
        {...sliderProps}
        ref={forwardedRef}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          if (event.key === "Home") {
            onHomeKeyDown(event);
            // Prevent scrolling to page start
            event.preventDefault();
          } else if (event.key === "End") {
            onEndKeyDown(event);
            // Prevent scrolling to page end
            event.preventDefault();
          } else if (PAGE_KEYS.concat(ARROW_KEYS).includes(event.key)) {
            onStepKeyDown(event);
            // Prevent scrolling for directional key presses
            event.preventDefault();
          }
        })}
        onPointerDown={composeEventHandlers(props.onPointerDown, (event) => {
          const target = event.target as HTMLElement;
          target.setPointerCapture(event.pointerId);
          // Prevent browser focus behaviour because we focus a thumb manually when values change.
          event.preventDefault();
          // Touch devices have a delay before focusing so won't focus if touch immediately moves
          // away from target (sliding). We want thumb to focus regardless.
          if (context.thumbs.has(target)) {
            target.focus();
          } else {
            onSlideStart(event);
          }
        })}
        onPointerMove={composeEventHandlers(props.onPointerMove, (event) => {
          const target = event.target as HTMLElement;
          if (target.hasPointerCapture(event.pointerId)) {
            onSlideMove(event);
          }
        })}
        onPointerUp={composeEventHandlers(props.onPointerUp, (event) => {
          const target = event.target as HTMLElement;
          if (target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId);
            onSlideEnd(event);
          }
        })}
      />
    );
  },
);

SliderImpl.displayName = `${ROOT_NAME}Impl`;

export type { SliderImplElement, SliderImplProps, SliderImplPrivateProps };
export default SliderImpl;

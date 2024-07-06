import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import Element from "@allygory/element";
import { TRACK_NAME } from "./shared/constants";
import { useRootContext } from "./shared/context";
import type { ScopedProps } from "./shared/context";

type TrackElement = ElementRef<typeof Element.span>;
type TrackProps = ComponentPropsWithoutRef<typeof Element.span>;

const Track = forwardRef<TrackElement, TrackProps>(
  (props: ScopedProps<TrackProps>, forwardedRef) => {
    const { __scopeSlider, ...trackProps } = props;
    const context = useRootContext(TRACK_NAME, __scopeSlider);

    return (
      <Element.span
        data-disabled={context.disabled ? "" : undefined}
        data-orientation={context.orientation}
        {...trackProps}
        ref={forwardedRef}
      />
    );
  },
);

Track.displayName = TRACK_NAME;

export type { TrackElement, TrackProps };
export default Track;

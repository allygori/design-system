import { forwardRef, useMemo, useState } from "react";
import useComposeRefs from "@allygory/use-compose-refs";
import type { ThumbImplElement, ThumbImplProps } from "./thumb-impl";
import { type ScopedProps, useCollection } from "./shared/context";
import { THUMB_NAME } from "./shared/constants";
import ThumbImpl from "./thumb-impl";

type ThumbElement = ThumbImplElement;
type ThumbProps = Omit<ThumbImplProps, "index">;

const Thumb = forwardRef<ThumbElement, ThumbProps>(
  (props: ScopedProps<ThumbProps>, forwardedRef) => {
    const { __scopeSlider, ...thumbProps } = props;
    const [thumb, setThumb] = useState<ThumbImplElement | null>(null);
    const getItems = useCollection(__scopeSlider);
    const composedRefs = useComposeRefs(forwardedRef, (node) => {
      setThumb(node);
    });
    const index = useMemo(() => {
      return thumb ? getItems().findIndex((item) => item.ref.current === thumb) : -1;
    }, [getItems, thumb]);

    return <ThumbImpl {...thumbProps} ref={composedRefs} index={index} />;
  },
);

Thumb.displayName = THUMB_NAME;

export type { ThumbElement, ThumbProps };
export default Thumb;

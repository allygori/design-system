import { forwardRef } from "react";
import { composeEventHandlers } from "@allygory/element";
import Presence from "@allygory/presence";
import { CONTENT_NAME } from "./shared/constants";
import { useRootContext, type ScopedProps } from "./shared/context";
import ContentImpl from "./content-impl";
import type {
  ContentImplElement,
  ContentImplPrivateProps,
  ContentImplProps,
} from "./content-impl";

type ContentElement = ContentImplElement;
type ContentProps = Omit<ContentImplProps, keyof ContentImplPrivateProps> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  forceMount?: true;
};

const Content = forwardRef<ContentElement, ContentProps>(
  (props: ScopedProps<ContentProps>, forwardedRef) => {
    const { forceMount, ...contentProps } = props;
    const context = useRootContext(CONTENT_NAME, props.__scopeActionSheet);

    return (
      <Presence present={forceMount || context.open}>
        <ContentImpl
          open={context.open}
          {...contentProps}
          ref={forwardedRef}
          onClose={() => {
            context.onOpenChange(false);
          }}
          onSwipeCancel={composeEventHandlers(props.onSwipeCancel, (event) => {
            event.currentTarget.setAttribute("data-swipe", "cancel");
            event.currentTarget.style.removeProperty(
              "--allygory-action-sheet-swipe-move-x",
            );
            event.currentTarget.style.removeProperty(
              "--allygory-action-sheet-swipe-move-y",
            );
            event.currentTarget.style.removeProperty(
              "--allygory-action-sheet-swipe-end-x",
            );
            event.currentTarget.style.removeProperty(
              "--allygory-action-sheet-swipe-end-y",
            );
          })}
          onSwipeEnd={composeEventHandlers(props.onSwipeEnd, (event) => {
            const { x, y } = event.detail.delta;
            event.currentTarget.setAttribute("data-swipe", "end");
            event.currentTarget.style.removeProperty(
              "--allygory-action-sheet-swipe-move-x",
            );
            event.currentTarget.style.removeProperty(
              "--allygory-action-sheet-swipe-move-y",
            );
            event.currentTarget.style.setProperty(
              "--allygory-action-sheet-swipe-end-x",
              `${x}px`,
            );
            event.currentTarget.style.setProperty(
              "--allygory-action-sheet-swipe-end-y",
              `${y}px`,
            );
          })}
          onSwipeMove={composeEventHandlers(props.onSwipeMove, (event) => {
            const { x, y } = event.detail.delta;
            event.currentTarget.setAttribute("data-swipe", "move");
            event.currentTarget.style.setProperty(
              "--allygory-action-sheet-swipe-move-x",
              `${x}px`,
            );
            event.currentTarget.style.setProperty(
              "--allygory-action-sheet-swipe-move-y",
              `${y}px`,
            );
          })}
          onSwipeStart={composeEventHandlers(props.onSwipeStart, (event) => {
            event.currentTarget.setAttribute("data-swipe", "start");
          })}
        />
      </Presence>
    );
  },
);

Content.displayName = CONTENT_NAME;

export type { ContentElement, ContentProps };
export default Content;

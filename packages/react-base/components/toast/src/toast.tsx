import { forwardRef } from "react";
import useControllableState from "@allygory/use-controllable-state";
import useCallbackRef from "@allygory/use-callback-ref";
import Presence from "@allygory/presence";
import { composeEventHandlers } from "@allygory/element";
import { TOAST_NAME } from "./shared/constants";
import ToastImpl from "./toast-impl";
import type {
  ToastImplElement,
  ToastImplPrivateProps,
  ToastImplProps,
} from "./toast-impl";
import type { ScopedProps } from "./shared/context";

type ToastElement = ToastImplElement;
type ToastProps = Omit<ToastImplProps, keyof ToastImplPrivateProps> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
};

const Toast = forwardRef<ToastElement, ToastProps>(
  (props: ScopedProps<ToastProps>, forwardedRef) => {
    const {
      forceMount,
      open: openProp,
      defaultOpen,
      onOpenChange,
      ...toastProps
    } = props;
    const [open = true, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });

    return (
      <Presence present={forceMount || open}>
        <ToastImpl
          open={open}
          {...toastProps}
          ref={forwardedRef}
          onClose={() => {
            setOpen(false);
          }}
          onPause={useCallbackRef(props.onPause)}
          onResume={useCallbackRef(props.onResume)}
          onSwipeCancel={composeEventHandlers(props.onSwipeCancel, (event) => {
            event.currentTarget.setAttribute("data-swipe", "cancel");
            event.currentTarget.style.removeProperty("--allygory-toast-swipe-move-x");
            event.currentTarget.style.removeProperty("--allygory-toast-swipe-move-y");
            event.currentTarget.style.removeProperty("--allygory-toast-swipe-end-x");
            event.currentTarget.style.removeProperty("--allygory-toast-swipe-end-y");
          })}
          onSwipeEnd={composeEventHandlers(props.onSwipeEnd, (event) => {
            const { x, y } = event.detail.delta;
            event.currentTarget.setAttribute("data-swipe", "end");
            event.currentTarget.style.removeProperty("--allygory-toast-swipe-move-x");
            event.currentTarget.style.removeProperty("--allygory-toast-swipe-move-y");
            event.currentTarget.style.setProperty(
              "--allygory-toast-swipe-end-x",
              `${x}px`,
            );
            event.currentTarget.style.setProperty(
              "--allygory-toast-swipe-end-y",
              `${y}px`,
            );
          })}
          onSwipeMove={composeEventHandlers(props.onSwipeMove, (event) => {
            const { x, y } = event.detail.delta;
            event.currentTarget.setAttribute("data-swipe", "move");
            event.currentTarget.style.setProperty(
              "--allygory-toast-swipe-move-x",
              `${x}px`,
            );
            event.currentTarget.style.setProperty(
              "--allygory-toast-swipe-move-y",
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

Toast.displayName = TOAST_NAME;

export type { ToastElement, ToastProps };
export default Toast;

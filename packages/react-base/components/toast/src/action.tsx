import { forwardRef } from "react";
import { ACTION_NAME } from "./shared/constants";
import ToastAnnounceExclude from "./announce-exclude";
import ToastClose, { type ToastCloseProps, type ToasCloseElement } from "./close";
import type { ScopedProps } from "./shared/context";

type ToastActionElement = ToasCloseElement;
type ToastActionProps = ToastCloseProps & {
  /**
   * A short description for an alternate way to carry out the action. For screen reader users
   * who will not be able to navigate to the button easily/quickly.
   * @example <ToastAction altText="Goto account settings to upgrade">Upgrade</ToastAction>
   * @example <ToastAction altText="Undo (Alt+U)">Undo</ToastAction>
   */
  altText: string;
};

const ToastAction = forwardRef<ToastActionElement, ToastActionProps>(
  (props: ScopedProps<ToastActionProps>, forwardedRef) => {
    const { altText, ...actionProps } = props;

    if (!altText.trim()) {
      // eslint-disable-next-line no-console -- debug
      console.error(
        `Invalid prop \`altText\` supplied tot \`${ACTION_NAME}\`. Expected non-empty \`string\`.`,
      );

      return null;
    }

    return (
      <ToastAnnounceExclude asChild altText={altText}>
        <ToastClose {...actionProps} ref={forwardedRef} />
      </ToastAnnounceExclude>
    );
  },
);

ToastAction.displayName = ACTION_NAME;

export type { ToastActionElement, ToastActionProps };
export default ToastAction;

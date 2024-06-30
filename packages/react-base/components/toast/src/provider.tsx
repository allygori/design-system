import type { FC, ReactNode } from "react";
import { useCallback, useRef, useState } from "react";
import { PROVIDER_NAME } from "./shared/constants";
import type { SwipeDirection } from "./shared/types";
import { type ScopedProps, Collection, ToastProviderProvider } from "./shared/context";
import type { ToastViewportElement } from "./viewport";

type ToastProviderProps = {
  children?: ReactNode;
  /**
   * An author-localized label for each toast. Used to help screen reader users
   * associate the interruption with a toast.
   * @defaultValue 'Notification'
   */
  label?: string;
  /**
   * Time in milliseconds that each toast should remain visible for.
   * @defaultValue 5000
   */
  duration?: number;
  /**
   * Direction of pointer swipe that should close the toast.
   * @defaultValue 'right'
   */
  swipeDirection?: SwipeDirection;
  /**
   * Distance in pixels that the swipe must pass before a close is triggered.
   * @defaultValue 50
   */
  swipeThreshold?: number;
};

const ToastProvider: FC<ToastProviderProps> = (
  props: ScopedProps<ToastProviderProps>,
) => {
  const {
    __scopeToast,
    label = "Notification",
    duration = 5000,
    swipeDirection = "right",
    swipeThreshold = 50,
    children,
  } = props;
  const [viewport, setViewport] = useState<ToastViewportElement | null>(null);
  const [toastCount, setToastCount] = useState(0);
  const isFocusedToastEscapeKeyDownRef = useRef(false);
  const isClosePausedRef = useRef(false);

  if (!label.trim()) {
    // eslint-disable-next-line no-console -- debug
    console.error(
      `Invalid prop \`label\` supplied to \`${PROVIDER_NAME}\`. Expected non-empty \`string\`.`,
    );
  }

  return (
    <Collection.Provider scope={__scopeToast}>
      <ToastProviderProvider
        duration={duration}
        isClosePausedRef={isClosePausedRef}
        isFocusedToastEscapeKeyDownRef={isFocusedToastEscapeKeyDownRef}
        label={label}
        scope={__scopeToast}
        swipeDirection={swipeDirection}
        swipeThreshold={swipeThreshold}
        toastCount={toastCount}
        viewport={viewport}
        onToastAdd={useCallback(() => {
          setToastCount((prevCount) => prevCount + 1);
        }, [])}
        onToastRemove={useCallback(() => {
          setToastCount((prevCount) => prevCount - 1);
        }, [])}
        onViewportChange={setViewport}
      >
        {children}
      </ToastProviderProvider>
    </Collection.Provider>
  );
};

export type { ToastViewportElement, ToastProviderProps };
export default ToastProvider;

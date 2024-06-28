"use client";
import { useState } from "react";
import clsx from "clsx";
import * as Toast from "@allygory/toast";

type Props = {
  className?: string;
};

const ToastComponent = ({ className = "" }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider swipeDirection="right">
      <button
        type="button"
        onClick={() => {
          if (open) {
            setOpen(false);
            setTimeout(() => {
              setOpen(true);
            }, 400);
          } else {
            setOpen(true);
          }
        }}
      >
        Open Toas
      </button>
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className={clsx(
          "fixed inset-x-4 bottom-4 z-50 w-auto rounded-lg shadow-lg md:bottom-auto md:left-auto md:right-4 md:top-4 md:w-full md:max-w-sm",
          "bg-white dark:bg-gray-800",
          "allygory-state-open:animate-toast-slide-in-bottom md:allygory-state-open:animate-toast-slide-in-right",
          // "md:allygory-state-open:animate-toast-slide-in-bottom allygory-state-open:animate-toast-slide-in-right",
          "allygory-state-closed:animate-toast-hide",
          "allygory-swipe-direction-right:allygory-swipe-end:animate-toast-swipe-out-x",
          "allygory-swipe-direction-right:translate-x-allygory-toast-swipe-move-x",
          "allygory-swipe-direction-down:allygory-swipe-end:animate-toast-swipe-out-y",
          "allygory-swipe-direction-down:translate-y-allygory-toast-swipe-move-y",
          "allygory-swipe-cancel:translate-x-0 allygory-swipe-cancel:duration-200 allygory-swipe-cancel:ease-[ease]",
          "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
        )}
      >
        <div className="flex">
          <div className="flex w-0 flex-1 items-center py-4 pl-5">
            <div className="allygory w-full">
              <Toast.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Pull Request Review
              </Toast.Title>
              <Toast.Description className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                Someone requested your review on{" "}
                <span className="font-medium">repository/branch</span>
              </Toast.Description>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col space-y-1 px-3 py-2">
              <div className="flex h-0 flex-1">
                <Toast.Action
                  altText="view now"
                  className="flex w-full items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-purple-600 hover:bg-gray-50 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 dark:text-purple-500 dark:hover:bg-gray-900"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("https://github.com");
                  }}
                >
                  Review
                </Toast.Action>
              </div>
              <div className="flex h-0 flex-1">
                <Toast.Close className="flex w-full items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 dark:text-gray-100 dark:hover:bg-gray-900">
                  Dismiss
                </Toast.Close>
              </div>
            </div>
          </div>
        </div>
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
};

export default ToastComponent;

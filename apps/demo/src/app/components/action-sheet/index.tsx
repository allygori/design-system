"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import * as ActionSheet from "@allygory/action-sheet";

type Props = {
  className?: string;
};

const ActionSheetComponent = ({ className = "" }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});

  const toggleOpen = (state: boolean) => {
    setIsOpen(state);
  };

  useEffect(() => {
    console.log("ActionSheetComponent::data", data);
  }, [data]);

  return (
    <ActionSheet.Root
      open={isOpen}
      onOpenChange={(v) => toggleOpen(v)}
      threshold={100}
      onConfirm={(d) => setData(d)}
    >
      <ActionSheet.Trigger asChild>
        <button
          role="button"
          className="rounded-md border p-4 text-base font-medium text-red-500"
        >
          Open Action Sheet
        </button>
      </ActionSheet.Trigger>
      <ActionSheet.Portal forceMount={true}>
        <ActionSheet.Overlay className="fixed inset-0 bg-black opacity-0 transition-opacity duration-700 ease-in-out delay-0 allygory-state-open:opacity-80 allygory-state-closed:w-1 allygory-state-closed:h-1 allygory-state-closed:px allygory-state-closed:-mx allygory-state-closed:border-0" />

        {/* <ActionSheet.Portal> */}
        {/* <ActionSheet.Overlay className="fixed inset-0 bg-black/60 data-[state=open]:animate-overlayShow" /> */}

        <ActionSheet.Content
          defaultOpen={false}
          className={clsx(
            "",
            "fixed inset-x-4",
            "w-full h-[400px] rounded-t-2xl shadow-lg p-6 md:w-full",
            "left-0 bottom-0",
            "bg-white text-gray-800",
            "",
            // "opacity-100 allygory-state-closed:opacity-0",
            "allygory-state-open:animate-action-sheet-slide-in-bottom",
            "allygory-state-closed:animate-action-sheet-hide",
            "",
            "allygory-swipe-direction-down:allygory-swipe-end:animate-action-sheet-swipe-out-y",
            "allygory-swipe-direction-down:translate-y-allygory-action-sheet-swipe-move-y",
            "allygory-swipe-cancel:translate-y-0",
            "allygory-swipe-cancel:duration-500",
            "allygory-swipe-cancel:ease-[ease]",
            "",
            // "allygory-state-open:animate-toast-slide-in-bottom",
            // "allygory-state-closed:animate-toast-hide",
            // "allygory-swipe-direction-right:allygory-swipe-end:animate-toast-swipe-out-x",
            // "allygory-swipe-direction-right:translate-x-allygory-toast-swipe-move-x",
            // "allygory-swipe-direction-down:allygory-swipe-end:animate-toast-swipe-out-y",
            // "allygory-swipe-direction-down:translate-y-allygory-toast-swipe-move-y",
            // "allygory-swipe-cancel:translate-x-0 allygory-swipe-cancel:duration-200 allygory-swipe-cancel:ease-[ease]",
            // "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
          )}
        >
          Content
          <p>Testas dasdjasd asdjasd asdjsad asdjas dasjdasd</p>
          <ActionSheet.Close
            className={clsx(
              "absolute right-3.5 top-3.5 inline-flex items-center justify-center rounded-full p-1",
              "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
            )}
          >
            x
          </ActionSheet.Close>
          <ActionSheet.Confirm
            className={clsx(
              "flex flex-row justify-center items-center w-full h-10 absolute left-0 bottom-0 bg-green-500 text-white",
              "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
            )}
          >
            Confirm
          </ActionSheet.Confirm>
        </ActionSheet.Content>
        {/* </ActionSheet.Portal> */}
      </ActionSheet.Portal>
    </ActionSheet.Root>
  );
};

export default ActionSheetComponent;

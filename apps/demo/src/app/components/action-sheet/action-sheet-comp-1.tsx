"use client";
import { useState } from "react";
import clsx from "clsx";
import * as ActionSheet from "@allygory/action-sheet";

type Props = {
  className?: string;
};

const ActionSheetComponent = ({ className = "" }: Props) => {
  let [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (state: boolean) => {
    setIsOpen(state);
  };

  return (
    <ActionSheet.Root
      open={isOpen}
      modal={true}
      onOpenChange={(v) => toggleOpen(v)}
    >
      <ActionSheet.Trigger asChild>
        <button
          role="button"
          className="rounded-md border p-4 text-base font-medium text-red-500"
        >
          Open Action Sheet
        </button>
      </ActionSheet.Trigger>
      <ActionSheet.Portal>
        <ActionSheet.Overlay className="fixed inset-0 bg-black/60 data-[state=open]:animate-overlayShow" />

        <ActionSheet.Content
          className={clsx(
            "fixed z-50",
            "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
            "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "bg-white dark:bg-gray-800",
            "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
            "border-2 border-gray-600",
            "data-[state=open]:animate-contentShow",
          )}
        >
          Content
          <ActionSheet.Close
            className={clsx(
              "absolute right-3.5 top-3.5 inline-flex items-center justify-center rounded-full p-1",
              "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
            )}
          >
            x
          </ActionSheet.Close>
        </ActionSheet.Content>
      </ActionSheet.Portal>
    </ActionSheet.Root>
  );
};

export default ActionSheetComponent;

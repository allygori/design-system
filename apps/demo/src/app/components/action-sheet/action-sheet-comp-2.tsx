"use client";
import { useState } from "react";
import clsx from "clsx";
// import * as ActionSheet from "@allygory/action-sheet";
import { Content } from "@allygory/action-sheet";

type Props = {
  className?: string;
};

const ActionSheetComponent = ({ className = "" }: Props) => {
  let [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (state: boolean) => {
    setIsOpen(state);
  };

  return <Content>TESTT</Content>;
};

export default ActionSheetComponent;

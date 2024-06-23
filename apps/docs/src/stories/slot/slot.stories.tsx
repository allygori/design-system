import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Slot from "@allygory/slot";
// import React from "react";

const SlotWithoutSlottable = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>((props, forwardedRef) => {
  return <Slot {...props} className="test" ref={forwardedRef} />;
});

SlotWithoutSlottable.displayName = "SlotWithoutSlottable";

const meta: Meta<typeof Slot> = {
  component: Slot,
  // argTypes: {
  //   type: {
  //     control: { type: "radio" },
  //     options: ["button", "submit", "reset"],
  //   },
  // },
};

export default meta;

type Story = StoryObj<typeof Slot>;

export const WithoutSlottable: Story = {
  render: () => (
    <SlotWithoutSlottable>
      <b data-slot-element>hello</b>
    </SlotWithoutSlottable>
  ),
  // name: "Without Slottable",
  args: {
    // children: "Hello",
    // type: "button",
    // style: {
    //   color: "blue",
    //   border: "1px solid gray",
    //   padding: 10,
    //   borderRadius: 10,
    // },
  },
};

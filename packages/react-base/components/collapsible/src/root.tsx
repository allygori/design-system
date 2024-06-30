import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef, useCallback } from "react";
import Element from "@allygory/element";
import useId from "@allygory/use-id";
import useControllableState from "@allygory/use-controllable-state";
import { type ScopedProps, CollapsibleProvider } from "./shared/context";
import { getState } from "./shared/utils";
import { COLLAPSIBLE_NAME } from "./shared/constants";

type CollapsibleElement = ElementRef<typeof Element.div>;
type CollapsibleProps = ComponentPropsWithoutRef<typeof Element.div> & {
  defaultOpen?: boolean;
  open?: boolean;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const Collapsible = forwardRef<CollapsibleElement, CollapsibleProps>(
  (props: ScopedProps<CollapsibleProps>, forwardedRef) => {
    const {
      __scopeCollapsible,
      open: openProp,
      defaultOpen,
      disabled,
      onOpenChange,
      ...collapsibleProps
    } = props;

    const [open = false, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });

    return (
      <CollapsibleProvider
        contentId={useId()}
        disabled={disabled}
        open={open}
        scope={__scopeCollapsible}
        onOpenToggle={useCallback(() => {
          setOpen((prevOpen) => !prevOpen);
        }, [setOpen])}
      >
        <Element.div
          ref={forwardedRef}
          data-disabled={disabled ? "" : undefined}
          data-state={getState(open)}
          {...collapsibleProps}
        />
      </CollapsibleProvider>
    );
  },
);

Collapsible.displayName = COLLAPSIBLE_NAME;

export type { CollapsibleElement, CollapsibleProps };
export default Collapsible;

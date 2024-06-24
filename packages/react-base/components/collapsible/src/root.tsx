import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useCallback,
} from "react";
import Element from "@allygory/element";
import useId from "@allygory/use-id";
import useControllableState from "@allygory/use-controllable-state";
import { CollapsibleProvider, ScopedProps } from "./shared/context";
import { getState } from "./shared/utils";
import { COLLAPSIBLE_NAME } from "./shared/constants";

type CollapsibleElement = ElementRef<typeof Element.div>;
type CollapsibleProps = ComponentPropsWithoutRef<typeof Element.div> & {
  defaultOpen?: boolean;
  open?: boolean;
  disabled?: boolean;
  onOpenChange?(open: boolean): void;
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
        scope={__scopeCollapsible}
        disabled={disabled}
        contentId={useId()}
        open={open}
        onOpenToggle={useCallback(
          () => setOpen((prevOpen) => !prevOpen),
          [setOpen],
        )}
      >
        <Element.div
          ref={forwardedRef}
          data-state={getState(open)}
          data-disabled={disabled ? "" : undefined}
          {...collapsibleProps}
        />
      </CollapsibleProvider>
    );
  },
);

Collapsible.displayName = COLLAPSIBLE_NAME;

export type { CollapsibleElement, CollapsibleProps };
export default Collapsible;

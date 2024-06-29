import { useCallback, useRef, ReactNode, FC } from "react";
import useControllableState from "@allygory/use-controllable-state";
import useId from "@allygory/use-id";
import { ROOT_NAME } from "./shared/constants";
import { type ScopedProps, RootProvider } from "./shared/context";
import type { ContentElement } from "./content";

type RootProps = {
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
  onOpenChange?(open: boolean): void;
};

const Root: FC<RootProps> = (props: ScopedProps<RootProps>) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true,
  } = props;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<ContentElement>(null);
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <RootProvider
      scope={__scopeDialog}
      triggerRef={triggerRef}
      contentRef={contentRef}
      contentId={useId()}
      titleId={useId()}
      descriptionId={useId()}
      open={open}
      modal={modal}
      onOpenChange={setOpen}
      onOpenToggle={useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen])}
    >
      {children}
    </RootProvider>
  );
};

Root.displayName = ROOT_NAME;

export type { RootProps };
export default Root;

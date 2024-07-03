import type { FC, ReactNode } from "react";
import { useCallback, useRef } from "react";
import useControllableState from "@allygory/use-controllable-state";
import useId from "@allygory/use-id";
import { ROOT_NAME } from "./shared/constants";
import { RootProvider } from "./shared/context";
import type { ScopedProps } from "./shared/context";
import type { ContentElement } from "./content";

type RootProps = {
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  threshold?: number;
  modal?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: (flag: boolean) => void;
};

const Root: FC<RootProps> = (props: ScopedProps<RootProps>) => {
  const {
    __scopeActionSheet,
    children,
    open: openProp,
    defaultOpen,
    threshold = 250,
    modal = true,
    onOpenChange,
    onConfirm,
  } = props;

  const direction = "down";
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<ContentElement>(null);
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <RootProvider
      contentId={useId()}
      contentRef={contentRef}
      direction={direction}
      modal={modal}
      open={open}
      scope={__scopeActionSheet}
      threshold={threshold}
      triggerRef={triggerRef}
      onConfirm={onConfirm}
      onOpenChange={setOpen}
      onOpenToggle={useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
      }, [setOpen])}
    >
      {children}
    </RootProvider>
  );
};

Root.displayName = ROOT_NAME;

export type { RootProps };
export default Root;

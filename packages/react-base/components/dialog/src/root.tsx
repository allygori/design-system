import { useCallback, useRef, ReactNode, FC } from "react";
import useControllableState from "@allygory/use-controllable-state";
import useId from "@allygory/use-id";
import { DIALOG_NAME } from "./shared/constants";
import { type ScopedProps, DialogProvider } from "./shared/context";
import { type DialogContentElement } from "./shared/types";

type DialogRootProps = {
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
  onOpenChange?(open: boolean): void;
};

const DialogRoot: FC<DialogRootProps> = (
  props: ScopedProps<DialogRootProps>,
) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true,
  } = props;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<DialogContentElement>(null);
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <DialogProvider
      scope={__scopeDialog}
      triggerRef={triggerRef}
      contentRef={contentRef}
      contentId={useId()}
      titleId={useId()}
      descriptionId={useId()}
      open={open}
      modal={modal}
      onOpenChange={setOpen}
      onOpenToggle={useCallback(
        () => setOpen((prevOpen) => !prevOpen),
        [setOpen],
      )}
    >
      {children}
    </DialogProvider>
  );
};

DialogRoot.displayName = DIALOG_NAME;

export type { DialogRootProps };
export default DialogRoot;

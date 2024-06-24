import { ElementRef, forwardRef, useRef } from "react";
import useComposedRefs from "@allygory/use-compose-refs";
import useFocusGuards from "@allygory/use-focus-guards";
import DismissableLayer, {
  type DismissableLayerProps,
} from "@allygory/dismissable-layer";
import FocusScope, { type FocusScopeProps } from "@allygory/focus-scope";
import { type ScopedProps, useDialogContext } from "./shared/context";
import { getState } from "./shared/utils";
import { CONTENT_NAME } from "./shared/constants";
import TitleWarning from "./title-warning";
import DescriptionWarning from "./description-warning";

type DialogContentImplElement = ElementRef<typeof DismissableLayer>;
type DialogContentImplProps = Omit<DismissableLayerProps, "onDismiss"> & {
  /**
   * When `true`, focus cannot escape the `Content` via keyboard,
   * pointer, or a programmatic focus.
   * @defaultValue false
   */
  trapFocus?: FocusScopeProps["trapped"];

  /**
   * Event handler called when auto-focusing on open.
   * Can be prevented.
   */
  onOpenAutoFocus?: FocusScopeProps["onMountAutoFocus"];

  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  onCloseAutoFocus?: FocusScopeProps["onUnmountAutoFocus"];
};

const DialogContentImpl = forwardRef<
  DialogContentImplElement,
  DialogContentImplProps
>((props: ScopedProps<DialogContentImplProps>, forwardedRef) => {
  const {
    __scopeDialog,
    trapFocus,
    onOpenAutoFocus,
    onCloseAutoFocus,
    ...contentProps
  } = props;
  const context = useDialogContext(CONTENT_NAME, __scopeDialog);
  const contentRef = useRef<HTMLDivElement>(null);
  const composeRefs = useComposedRefs(forwardedRef, contentRef);

  // Make sure the whole tree has focus guards as our `Dialog` will be
  // the last element in the DOM (beacuse of the `Portal`)
  useFocusGuards();

  return (
    <>
      <FocusScope
        asChild
        loop
        trapped={trapFocus}
        onMountAutoFocus={onOpenAutoFocus}
        onUnmountAutoFocus={onCloseAutoFocus}
      >
        <DismissableLayer
          role="dialog"
          ref={composeRefs}
          id={context.contentId}
          aria-describedby={context.descriptionId}
          aria-labelledby={context.titleId}
          data-state={getState(context.open)}
          {...contentProps}
          onDismiss={() => context.onOpenChange(false)}
        />
      </FocusScope>
      {process.env.NODE_ENV !== "production" && (
        <>
          <TitleWarning titleId={context.titleId} />
          <DescriptionWarning
            contentRef={contentRef}
            descriptionId={context.descriptionId}
          />
        </>
      )}
    </>
  );
});

DialogContentImpl.displayName = CONTENT_NAME;

export type { DialogContentImplElement, DialogContentImplProps };
export default DialogContentImpl;

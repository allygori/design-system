import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";
import Element, { composeEventHandlers } from "@allygory/element";
import useComposeRefs from "@allygory/use-compose-refs";
import usePointerDownOutside from "@allygory/use-pointer-down-outside";
import useFocusOutside from "@allygory/use-focus-outside";
import useEscapeKeydown from "@allygory/use-escape-keydown";
import DismissableLayerContext from "./lib/context";
import { dispatchUpdate } from "./lib/utils";
import type { PointerDownOutsideEvent, FocusOutsideEvent } from "./lib/types";

const DISPLAY_NAME = "DismissableLayer";
const CONTEXT_UPDATE = "dismissableLayer.update";
const POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
const FOCUS_OUTSIDE = "dismissableLayer.focusOutside";

let originalBodyPointerEvents: string;

type DismissableLayerElement = ElementRef<typeof Element.div>;
type ElementDivProps = ComponentPropsWithoutRef<typeof Element.div>;
type DismissableLayerProps = ElementDivProps & {
  /**
   * When `true`, hover/focus/click interactions will be disabled on elements outside
   * the `DismissableLayer`. Users will need to click twice on outside elements to
   * interact with them: once to close the `DismissableLayer`, and again to trigger the element.
   */
  disableOutsidePointerEvents?: boolean;
  /**
   * Event handler called when the escape key is down.
   * Can be prevented.
   */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /**
   * Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`.
   * Can be prevented.
   */
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
  /**
   * Event handler called when the focus moves outside of the `DismissableLayer`.
   * Can be prevented.
   */
  onFocusOutside?: (event: FocusOutsideEvent) => void;
  /**
   * Event handler called when an interaction happens outside the `DismissableLayer`.
   * Specifically, when a `pointerdown` event happens outside or focus moves outside of it.
   * Can be prevented.
   */
  onInteractOutside?: (
    event: PointerDownOutsideEvent | FocusOutsideEvent,
  ) => void;
  /**
   * Handler called when the `DismissableLayer` should be dismissed
   */
  onDismiss?: () => void;
};

const DismissableLayer = forwardRef<
  DismissableLayerElement,
  DismissableLayerProps
>((props, forwardedRef) => {
  const {
    disableOutsidePointerEvents = false,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    onDismiss,
    ...layerProps
  } = props;
  const context = useContext(DismissableLayerContext);
  const [node, setNode] = useState<DismissableLayerElement | null>(null);
  const ownerDocument = node?.ownerDocument ?? globalThis?.document;
  const [, force] = useState({});
  const composedRefs = useComposeRefs(forwardedRef, (node) => setNode(node));
  const layers = Array.from(context.layers);

  const [highestLayerWithOutsidePointerEventsDisabled] = [
    ...context.layersWithOutsidePointerEventsDisabled,
  ].slice(-1);
  const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(
    highestLayerWithOutsidePointerEventsDisabled,
  );

  const index = node ? layers.indexOf(node) : -1;
  const isBodyPointerEventsDisabled =
    context.layersWithOutsidePointerEventsDisabled.size > 0;
  const isPointerEventsEnabled =
    index >= highestLayerWithOutsidePointerEventsDisabledIndex;

  const pointerDownOutside = usePointerDownOutside(
    POINTER_DOWN_OUTSIDE,
    (event) => {
      const target = event.target as HTMLElement;
      const isPointerDownOnBranch = [...context.branches].some((branch) =>
        branch.contains(target),
      );

      if (!isPointerEventsEnabled || isPointerDownOnBranch) return;

      onPointerDownOutside?.(event);
      onInteractOutside?.(event);

      if (!event.defaultPrevented) onDismiss?.();
    },
    ownerDocument,
  );

  const focusOutside = useFocusOutside(
    FOCUS_OUTSIDE,
    (event) => {
      const target = event.target as HTMLElement;
      const isFocusInBranch = [...context.branches].some((branch) =>
        branch.contains(target),
      );

      if (isFocusInBranch) return;

      onFocusOutside?.(event);
      onInteractOutside?.(event);

      if (!event.defaultPrevented) {
        return onDismiss?.();
      }
    },
    ownerDocument,
  );

  useEscapeKeydown((event) => {
    const isHighestLayer = index === context.layers.size - 1;
    if (!isHighestLayer) return;
    onEscapeKeyDown?.(event);
    if (!event.defaultPrevented && onDismiss) {
      event.preventDefault();
      onDismiss();
    }
  }, ownerDocument);

  useEffect(() => {
    if (!node) return;
    if (disableOutsidePointerEvents) {
      if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
        originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
        ownerDocument.body.style.pointerEvents = "none";
      }

      context.layersWithOutsidePointerEventsDisabled.add(node);
    }
    context.layers.add(node);
    dispatchUpdate(CONTEXT_UPDATE);

    return () => {
      if (
        disableOutsidePointerEvents &&
        context.layersWithOutsidePointerEventsDisabled.size === 1
      ) {
        ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
      }
    };
  }, [node, ownerDocument, disableOutsidePointerEvents, context]);

  /**
   * We purposefully prevent combining this effect with the `disableOutsidePointerEvents` effect
   * because a change to `disableOutsidePointerEvents` would remove this layer from the stack
   * and add it to the end again so the layering order wouldn't be _creation order_.
   * We only want them to be removed from context stacks when unmounted.
   */
  useEffect(() => {
    return () => {
      if (!node) return;
      context.layers.delete(node);
      context.layersWithOutsidePointerEventsDisabled.delete(node);
      dispatchUpdate(CONTEXT_UPDATE);
    };
  }, [node, context]);

  useEffect(() => {
    const handleUpdate = () => force({});
    document.addEventListener(CONTEXT_UPDATE, handleUpdate);

    return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
  }, []);

  return (
    <Element.div
      {...layerProps}
      ref={composedRefs}
      style={{
        pointerEvents: isBodyPointerEventsDisabled
          ? isPointerEventsEnabled
            ? "auto"
            : "none"
          : undefined,
        ...props.style,
      }}
      onFocusCapture={composeEventHandlers(
        props.onFocusCapture,
        focusOutside.onFocusCapture,
      )}
      onBlurCapture={composeEventHandlers(
        props.onBlurCapture,
        focusOutside.onBlurCapture,
      )}
      onPointerDownCapture={composeEventHandlers(
        props.onPointerDownCapture,
        pointerDownOutside.onPointerDownCapture,
      )}
    />
  );
});

DismissableLayer.displayName = DISPLAY_NAME;

export type { DismissableLayerElement, DismissableLayerProps };
export default DismissableLayer;

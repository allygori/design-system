import { dispatchDiscreteCustomEvent } from "@allygory/element";
import type { SwipeDirection } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
export const isHTMLElement = (node: any): node is HTMLElement => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ignore
  return node?.nodeType === node?.ELEMENT_NODE;
};

export const focusFirst = (candidates: HTMLElement[]): boolean => {
  const previouslyFocusedElement = document.activeElement;
  return candidates.some((candidate) => {
    // if focus is already where we want to go, we don't want to keep going through the candidates
    if (candidate === previouslyFocusedElement) return true;
    candidate.focus();
    return document.activeElement !== previouslyFocusedElement;
  });
};

export const handleAndDispatchCustomEvent = <
  E extends CustomEvent,
  ReactEvent extends React.SyntheticEvent,
>(
  name: string,
  handler: ((event: E) => void) | undefined,
  detail: { originalEvent: ReactEvent } & (E extends CustomEvent<infer D> ? D : never),
  { discrete }: { discrete: boolean },
): void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ignore
  const currentTarget = detail.originalEvent.currentTarget as HTMLElement;
  const event = new CustomEvent(name, {
    bubbles: true,
    cancelable: true,
    detail,
  });
  if (handler)
    currentTarget.addEventListener(name, handler as EventListener, {
      once: true,
    });

  if (discrete) {
    dispatchDiscreteCustomEvent(currentTarget, event);
  } else {
    currentTarget.dispatchEvent(event);
  }
};

export const isDeltaInDirection = (
  delta: { x: number; y: number },
  direction: SwipeDirection,
  threshold = 0,
): boolean => {
  const deltaX = Math.abs(delta.x);
  const deltaY = Math.abs(delta.y);
  const isDeltaX = deltaX > deltaY;
  if (direction === "left" || direction === "right") {
    return isDeltaX && deltaX > threshold;
  }

  return !isDeltaX && deltaY > threshold;
};

export const getAnnounceTextContent = (container: HTMLElement): string[] => {
  const textContent: string[] = [];
  const childNodes = Array.from(container.childNodes);

  childNodes.forEach((node) => {
    if (node.nodeType === node.TEXT_NODE && node.textContent)
      textContent.push(node.textContent);
    if (isHTMLElement(node)) {
      const isHidden = node.ariaHidden || node.hidden || node.style.display === "none";
      const isExcluded = node.dataset.radixToastAnnounceExclude === "";

      if (!isHidden) {
        if (isExcluded) {
          const altText = node.dataset.radixToastAnnounceAlt;
          if (altText) textContent.push(altText);
        } else {
          textContent.push(...getAnnounceTextContent(node));
        }
      }
    }
  });

  // We return a collection of text rather than a single concatenated string.
  // This allows SR VO to naturally pause break between nodes while announcing.
  return textContent;
};

export const getTabbableCandidates = (container: HTMLElement): HTMLElement[] => {
  const nodes: HTMLElement[] = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
    acceptNode: (node: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ignore
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ignore
      if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
      // `.tabIndex` is not the same as the `tabindex` attribute. It works on the
      // runtime's understanding of tabbability, so this automatically accounts
      // for any kind of element that could be tabbed to.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ignore
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  while (walker.nextNode()) nodes.push(walker.currentNode as HTMLElement);
  // we do not take into account the order of nodes with positive `tabIndex` as it
  // hinders accessibility to have tab order different from visual order.
  return nodes;
};

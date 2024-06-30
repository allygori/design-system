import { dispatchDiscreteCustomEvent } from "@allygory/element";

const handleAndDispatchCustomEvent = <E extends CustomEvent, OriginalEvent extends Event>(
  name: string,
  handler: ((event: E) => void) | undefined,
  detail: { originalEvent: OriginalEvent } & (E extends CustomEvent<infer D> ? D : never),
  { discrete }: { discrete: boolean },
): void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- ignore
  const target = detail?.originalEvent?.target;
  const event = new CustomEvent(name, {
    bubbles: false,
    cancelable: true,
    detail,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- ignore
  if (handler) target?.addEventListener(name, handler as EventListener, { once: true });

  if (discrete) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- ignore
    dispatchDiscreteCustomEvent(target, event);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- ignore
    target.dispatchEvent(event);
  }
};

export default handleAndDispatchCustomEvent;

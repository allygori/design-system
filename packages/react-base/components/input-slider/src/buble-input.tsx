import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useRef } from "react";
import usePrevious from "@allygory/use-previous";

type Props = ComponentPropsWithoutRef<"input">;

const BubbleInput = (props: Props): JSX.Element => {
  const { value, ...inputProps } = props;
  const ref = useRef<HTMLInputElement>(null);
  const prevValue = usePrevious(value);

  // Bubble value change to parents (e.g form change event)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- ignore
    const input = ref.current!;
    const inputProto = window.HTMLInputElement.prototype;
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style -- ignore
    const descriptor = Object.getOwnPropertyDescriptor(
      inputProto,
      "value",
    ) as PropertyDescriptor;
    // eslint-disable-next-line @typescript-eslint/unbound-method -- ignore
    const setValue = descriptor.set;

    if (prevValue !== value && setValue) {
      const event = new Event("input", { bubbles: true });
      setValue.call(input, value);
      input.dispatchEvent(event);
    }
  }, [prevValue, value]);

  /**
   * We purposefully do not use `type="hidden"` here otherwise forms that
   * wrap it will not be able to access its value via the FormData API.
   *
   * We purposefully do not add the `value` attribute here to allow the value
   * to be set programatically and bubble to any parent form `onChange` event.
   * Adding the `value` will cause React to consider the programatic
   * dispatch a duplicate and it will get swallowed.
   */
  return (
    <input style={{ display: "none" }} {...inputProps} ref={ref} defaultValue={value} />
  );
};

export default BubbleInput;

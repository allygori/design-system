import { FC, RefObject, useEffect } from "react";
import { AlertContentElement } from "./content";
import { CONTENT_NAME, DESCRIPTION_NAME } from "./shared/constants";

type AlertDescriptionWarningProps = {
  contentRef: RefObject<AlertContentElement>;
};

const AlertDescriptionWarning: FC<AlertDescriptionWarningProps> = ({
  contentRef,
}) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

  You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.
  
  Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.
  
  For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;

  useEffect(() => {
    const ariaDescribeBy = contentRef.current?.getAttribute("aria-describeby");
    if (ariaDescribeBy) {
      const hasDescription = document.getElementById(ariaDescribeBy);
      if (!hasDescription) console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef]);

  return null;
};

export type { AlertDescriptionWarningProps };
export default AlertDescriptionWarning;

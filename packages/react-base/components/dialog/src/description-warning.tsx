import { FC, RefObject, useEffect } from "react";
import { DESCRIPTION_WARNING_NAME } from "./shared/constants";
import { useWarningContext } from "./shared/context";
import type { DialogContentElement } from "./content";

type DialogDescriptionWarningProps = {
  contentRef: RefObject<DialogContentElement>;
  descriptionId?: string;
};

const DialogDescriptionWarning: FC<DialogDescriptionWarningProps> = ({
  contentRef,
  descriptionId,
}) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;

  useEffect(() => {
    const describedById = contentRef.current?.getAttribute("aria-describeby");

    // if we have an id and the user hasn't set aria-describedby={undefined}
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) {
        console.warn(MESSAGE);
      }
    }
  }, [MESSAGE, contentRef, descriptionId]);

  return null;
};

DialogDescriptionWarning.displayName = DESCRIPTION_WARNING_NAME;

export type { DialogDescriptionWarningProps };
export default DialogDescriptionWarning;

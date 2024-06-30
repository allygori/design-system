import type { FC, RefObject } from "react";
import { useEffect } from "react";
import { DESCRIPTION_WARNING_NAME } from "./shared/constants";
import { useWarningContext } from "./shared/context";
import type { ContentElement } from "./content";

type DescriptionWarningProps = {
  contentRef: RefObject<ContentElement>;
  descriptionId?: string;
};

const DescriptionWarning: FC<DescriptionWarningProps> = ({
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
        // eslint-disable-next-line no-console -- debug purpose
        console.warn(MESSAGE);
      }
    }
  }, [MESSAGE, contentRef, descriptionId]);

  return null;
};

DescriptionWarning.displayName = DESCRIPTION_WARNING_NAME;

export type { DescriptionWarningProps };
export default DescriptionWarning;

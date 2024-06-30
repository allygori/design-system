import type { FC } from "react";
import { useEffect } from "react";
import { TITLE_WARNING_NAME } from "./shared/constants";
import { useWarningContext } from "./shared/context";

type TitleWarningProps = { titleId?: string };

const TitleWarning: FC<TitleWarningProps> = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);

  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see docs`;

  useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      // eslint-disable-next-line no-console -- debug purpose
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);

  return null;
};

export type { TitleWarningProps };
export default TitleWarning;

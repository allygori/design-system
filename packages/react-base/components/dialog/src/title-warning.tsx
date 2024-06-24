import { FC, useEffect } from "react";
import { useWarningContext } from "./shared/context";
import { TITLE_WARNING_NAME } from "./shared/constants";

type DialogTitleWarningProps = { titleId?: string };

const DialogTitleWarning: FC<DialogTitleWarningProps> = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);

  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see docs`;

  useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);

  return null;
};

export type { DialogTitleWarningProps };
export default DialogTitleWarning;

import { createContext } from "@allygory/context";
import { CONTENT_NAME, TITLE_NAME, TITLE_WARNING_NAME } from "../constants";

const [WarningProvider, useWarningContext] = createContext(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME,
  titleName: TITLE_NAME,
  docsSlug: "dialog",
});

export {
  WarningProvider,
  //
  useWarningContext,
};

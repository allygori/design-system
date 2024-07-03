import { CONTENT_NAME } from "../constants";
import { createRootContext } from "./root.context";

const [ContentProvider, useContentContext] = createRootContext(CONTENT_NAME, {
  onClose() {},
});

export {
  ContentProvider,
  //
  useContentContext,
};

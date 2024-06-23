import * as React from "react";
import useLayoutEffect from "@allygory/use-layout-effect";

// We `toString()` to prevent bundlers from trying to `import { useId } from 'react';`
const useReactId = (React as any)["useId".toString()] || (() => undefined);

let count = 0;

const useId = (deterministicId?: string): string => {
  const [id, setId] = React.useState<string | undefined>(useReactId());

  useLayoutEffect(() => {
    if (!deterministicId) setId((reactId) => reactId ?? String(count++));
  }, [deterministicId]);

  return deterministicId || (id ? `miru-${id}` : "");
};

export default useId;

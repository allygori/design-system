import * as React from "react";
import useLayoutEffect from "@allygory/use-layout-effect";

// We `toString()` to prevent bundlers from trying to `import { useId } from 'react';`
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any -- ignore
const useReactId = (React as any)["useId".toString()] || (() => undefined);

let count = 0;

const useId = (deterministicId?: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call -- ignore
  const [id, setId] = React.useState<string | undefined>(useReactId());

  useLayoutEffect(() => {
    if (!deterministicId) setId((reactId) => reactId ?? String(count++));
  }, [deterministicId]);

  return deterministicId || (id ? `allygory-${id}` : "");
};

export default useId;

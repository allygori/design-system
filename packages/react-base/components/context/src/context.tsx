/* eslint-disable @typescript-eslint/explicit-function-return-type -- ignore */
import {
  createContext as reactCreateContext,
  useContext as reactUseContext,
  useMemo,
} from "react";

export function createContext<ContextValueType extends object | null>(
  rootComponentName: string,
  defaultContext?: ContextValueType,
) {
  const Context = reactCreateContext<ContextValueType | undefined>(defaultContext);

  const Provider = (props: ContextValueType & { children: React.ReactNode }) => {
    const { children, ...context } = props;
    // Only re-memoize when prop values change
    const value = useMemo(
      () => context,
      // eslint-disable-next-line react-hooks/exhaustive-deps -- ignore
      Object.values(context),
    ) as ContextValueType;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  function useContext(consumerName: string) {
    const context = reactUseContext(Context);
    if (context) return context;
    if (defaultContext !== undefined) return defaultContext;
    // if a defaultContext wasn't specified, it's a required context.
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }

  Provider.displayName = `${rootComponentName}Provider`;

  return [Provider, useContext] as const;
}

import type { Context, ReactNode } from "react";
import {
  createContext as reactCreateContext,
  useContext as reactUseContext,
  useMemo,
} from "react";
import { composeContextScopes } from "./compose-context";

export type Scope<C = any> = { [scopeName: string]: Context<C>[] } | undefined;
type ScopeHook = (scope: Scope) => { [__scopeProp: string]: Scope };

export interface CreateScope {
  scopeName: string;
  (): ScopeHook;
}

export function createContextScope(
  scopeName: string,
  createContextScopeDeps: CreateScope[] = [],
) {
  let defaultContexts: any[] = [];

  /* -----------------------------------------------------------------------------------------------
   * createContext
   * ---------------------------------------------------------------------------------------------*/

  function createContext<ContextValueType extends object | null>(
    rootComponentName: string,
    defaultContext?: ContextValueType,
  ) {
    const BaseContext = reactCreateContext<ContextValueType | undefined>(
      defaultContext,
    );
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];

    function Provider(
      props: ContextValueType & {
        scope: Scope<ContextValueType>;
        children: ReactNode;
      },
    ) {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName][index] || BaseContext;
      // Only re-memoize when prop values change
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const value = useMemo(
        () => context,
        Object.values(context),
      ) as ContextValueType;
      return <Context.Provider value={value}>{children}</Context.Provider>;
    }

    function useContext(
      consumerName: string,
      scope: Scope<ContextValueType | undefined>,
    ) {
      const Context = scope?.[scopeName][index] || BaseContext;
      const context = reactUseContext(Context);
      if (context) return context;
      if (defaultContext !== undefined) return defaultContext;
      // if a defaultContext wasn't specified, it's a required context.
      throw new Error(
        `\`${consumerName}\` must be used within \`${rootComponentName}\``,
      );
    }

    Provider.displayName = rootComponentName + "Provider";
    return [Provider, useContext] as const;
  }

  /* -----------------------------------------------------------------------------------------------
   * createScope
   * ---------------------------------------------------------------------------------------------*/

  const createScope: CreateScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactCreateContext(defaultContext);
    });
    return function useScope(scope: Scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return useMemo(
        () => ({
          [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts },
        }),
        [scope, contexts],
      );
    };
  };

  createScope.scopeName = scopeName;

  return [
    createContext,
    composeContextScopes(createScope, ...createContextScopeDeps),
  ] as const;
}

import { Provider, createContext as createReactContext, useContext as useReactContext } from 'react';

type Options<T> = {
  defaultValue?: T,
  strict?: boolean
}

export function createContext<T>({ defaultValue, strict }: Options<T> = {}) {
  const Context = createReactContext<T | undefined>(defaultValue)
  
  function useContext() {
    const ctx = useReactContext(Context);
    if (!ctx && strict) {
      const error = new Error()
      error.name = "ContextError"
      throw error
    }

    return ctx
  }

  return [Context.Provider, useContext, Context] as [Provider<T>, () => T, React.Context<T>];
}
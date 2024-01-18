import { Provider, createContext as createReactContext, useContext as useReactContext } from 'react';

type Options<T> = {
  defaultValue?: T,
}

export function createContext<T>({ defaultValue }: Options<T> = {}) {
  const Context = createReactContext<T | undefined>(defaultValue)
  
  function useContext() {
    const ctx = useReactContext(Context);
    if (!ctx) {
      const error = new Error()
      error.name = "ContextError"
      throw error
    }

    return ctx
  }

  return [Context.Provider, useContext, Context] as [Provider<T>, () => T, React.Context<T>];
}
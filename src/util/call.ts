// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction<T = any> = (...args: T[]) => any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function callAllHandlers<T extends (event: any) => void>(...fns: (T | undefined)[]) {
  return function (event: Parameters<T>[0]) {
    fns.forEach(fn => {
      fn?.(event);
    });
  };
}

export function callAll<T extends AnyFunction>(...fns: (T | undefined)[]) {
  return function (...args: Parameters<T>) {
    fns.forEach(fn => fn?.(...args));
  };
}

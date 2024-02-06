import { MutableRefObject, RefCallback, useMemo } from 'react';

export type ReactRef<T> = RefCallback<T> | MutableRefObject<T>;

export function assignRef<T = unknown>(ref: ReactRef<T> | null | undefined, value: T) {
  if (ref === null) return;
  if (typeof ref === 'function') {
    ref?.(value);
    return;
  }
  try {
    (ref as MutableRefObject<T | null>).current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
}

export function mergeRefs<T>(...refs: (ReactRef<T> | null | undefined)[]) {
  return (node: T | null) => {
    refs.forEach(ref => {
      assignRef(ref, node);
    });
  };
}

export function useMergeRefs<T = unknown>(
  ...refs: (ReactRef<T> | null | undefined)[]
): (node: T) => void {
  return useMemo(() => mergeRefs(...refs), [refs]);
}

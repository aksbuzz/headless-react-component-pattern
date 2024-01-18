import { SetStateAction, useCallback, useState } from 'react';

type UseUncontrolledInput<T> = {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
};

/** use-uncontrolled manages state for both
 *  controlled and uncontrolled components: */
export function useUncontrolled<T>({
  value: propValue,
  defaultValue,
  onChange,
}: UseUncontrolledInput<T>) {
  const [stateValue, setStateValue] = useState(defaultValue as T);
  const controlled = propValue !== undefined;
  const value = controlled ? propValue : stateValue;

  const handleChange = useCallback(
    (nextValue: SetStateAction<T>) => {
      const newValue =
        typeof nextValue === 'function' ? (nextValue as (prevState?: T) => T)(value) : nextValue;

      if (!controlled) {
        setStateValue(newValue as T);
      }

      onChange?.(newValue);
    },
    [controlled, onChange, value]
  );

  return [value, handleChange] as const;
}

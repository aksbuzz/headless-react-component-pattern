import { ChangeEvent, useCallback } from 'react';
import { useUncontrolled } from '../hooks/use-uncontrolled';
import { UseCheckboxGroupProps } from './types';

export function useCheckboxGroup(props: UseCheckboxGroupProps = {}) {
  const { value: valueProp, defaultValue, onChange, isDisabled } = props;

  const [value, setValue] = useUncontrolled({
    value: valueProp,
    defaultValue: defaultValue || [],
    onChange: onChange,
  });

  const handleChange = useCallback(
    (nextValue: ChangeEvent<HTMLInputElement> | string | number) => {
      if (!value) return;

      let isChecked, selectedValue: string | number, newValue;
      if (typeof nextValue === 'string' || typeof nextValue === 'number') {
        isChecked = !value.includes(nextValue);
        selectedValue = nextValue;
        newValue = isChecked
          ? [...value, selectedValue]
          : value.filter(val => val !== selectedValue);
      } else {
        isChecked = nextValue.target.checked;
        selectedValue = nextValue.target.value;
        newValue = isChecked
          ? [...value, selectedValue]
          : value.filter(val => val !== selectedValue);
      }

      setValue(newValue);
    },
    [setValue, value]
  );

  return { value, setValue, onChange: handleChange, isDisabled };
}

export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>;

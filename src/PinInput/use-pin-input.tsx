import { ChangeEvent, ClipboardEvent, KeyboardEvent, useCallback, useEffect, useRef } from 'react';
import { useUncontrolled } from '../hooks/use-uncontrolled';
import { UsePinInputProps } from './types';

export function usePinInput(props: UsePinInputProps) {
  const {
    defaultValue,
    value: valueProp,
    onChange: onChangeProp,
    ariaLabel,
    isDisabled,
    length = 4,
    onComplete,
    ...rest
  } = props;

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const [value, setValue] = useUncontrolled({
    defaultValue,
    value: valueProp,
    onChange: onChangeProp,
  });

  const validate = useCallback(
    (str: string) => {
      if (str.length > length) return false;
      return new RegExp(`^\\d{1,${length}}$`).test(str);
    },
    [length]
  );

  const setPinValue = useCallback(
    (val: string, index: number) => {
      const values = [...(value || '')];
      values[index] = val;
      setValue(values.join(''));
    },
    [setValue, value]
  );

  const focusNextInputField = useCallback(
    (index: number) => {
      const nextIndex = index + 1;
      inputRefs.current[nextIndex < length ? nextIndex : index].focus();
    },
    [length]
  );

  const focusPrevInputField = useCallback((index: number) => {
    const prevIndex = index - 1;
    inputRefs.current[prevIndex > -1 ? prevIndex : index].focus();
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, index: number) => {
      const value = event.target.value;
      // We're not using maxLength={1} in input field
      // If field already has a value, we will overwrite it with new value
      // and focus to next input field
      const nextValue = value.length === 2 ? value.slice(-1) : value;
      const isValid = validate(value);

      if (nextValue.length < 2) {
        if (isValid) {
          setPinValue(nextValue, index);
          focusNextInputField(index);
        } else {
          setPinValue('', index);
        }
      } else {
        isValid && setPinValue(nextValue, index);
      }
    },
    [validate, setPinValue, focusNextInputField]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>, index: number) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        focusPrevInputField(index);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        focusNextInputField(index);
      } else if (event.key === 'Delete') {
        event.preventDefault();
        setPinValue('', index);
      } else if (event.key === 'Backspace') {
        event.preventDefault();
        setPinValue('', index);
        // if last input field
        if (index + 1 === length) {
          // if value is empty only then focus previous
          if ((event.target as HTMLInputElement).value === '') {
            focusPrevInputField(index);
          }
        } else {
          focusPrevInputField(index);
        }
      }
    },
    [focusNextInputField, focusPrevInputField, length, setPinValue]
  );

  const handlePaste = useCallback(
    (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      const copiedValue = event.clipboardData.getData('Text');
      const isValid = validate(copiedValue);

      if (isValid) setValue(copiedValue);
    },
    [validate, setValue]
  );

  const getAriaAttributes = useCallback(
    () => ({
      'aria-label': ariaLabel,
      'aria-disabled': isDisabled,
      disabled: isDisabled,
    }),
    [ariaLabel, isDisabled]
  );

  useEffect(() => {
    if (value && value.length === length) {
      onComplete?.(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return {
    value,
    length,
    inputRefs,
    getAriaAttributes,
    handleKeyDown,
    handleChange,
    handlePaste,
    ...rest,
  };
}

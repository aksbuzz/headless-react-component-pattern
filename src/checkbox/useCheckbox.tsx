import { ChangeEvent, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ReactRef, mergeRefs } from '../hooks/use-merge-refs';
import { UseCheckboxProps } from './types';
import { callAllHandlers } from '../util/call';

export function useCheckbox(props: UseCheckboxProps = {}) {
  const {
    isDisabled,
    isChecked: checkedProp,
    name,
    id,
    ariaLabel,
    ariaLabelledby,
    defaultChecked,
    value,
    onBlur,
    onChange,
    isIndeterminate,
    isRequired,
    onFocus,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [checkedState, setCheckedState] = useState(!!defaultChecked);
  const isControlled = checkedProp !== undefined;
  const isChecked = isControlled ? checkedProp : checkedState;

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!isIndeterminate;
    }
  }, [isIndeterminate]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }

      if (!isControlled) {
        if (isChecked) {
          setCheckedState(event.target.checked);
        } else {
          setCheckedState(isIndeterminate ? true : event.target.checked);
        }
      }

      onChange?.(event);
    },
    [isChecked, isControlled, isDisabled, isIndeterminate, onChange]
  );

  const getInputProps = useCallback(
    (props = {}, forwaredRef: ReactRef<HTMLInputElement | null> | null | undefined) => {
      return {
        ...props,
        type: 'checkbox',
        name,
        id,
        ref: mergeRefs(inputRef, forwaredRef),
        value,
        onChange: callAllHandlers(onChange, handleChange),
        onBlur: onBlur,
        onFocus: onFocus,
        required: isRequired,
        disabled: isDisabled,
        checked: isChecked,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        'aria-disabled': isDisabled,
      };
    },
    [
      ariaLabel,
      ariaLabelledby,
      handleChange,
      id,
      isChecked,
      isDisabled,
      isRequired,
      name,
      onBlur,
      onChange,
      onFocus,
      value,
    ]
  );

  const getLabelProps = useCallback(
    (props = {}) => {
      return {
        ...props,
        'data-disabled': isDisabled ? '' : undefined,
        'data-checked': isChecked ? '' : undefined,
      };
    },
    [isChecked, isDisabled]
  );

  return { getLabelProps, getInputProps, htmlProps: rest };
}

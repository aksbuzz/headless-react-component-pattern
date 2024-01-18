import { InputHTMLAttributes, forwardRef } from 'react';
import { callAll } from '../util/call';
import { useCheckboxGroupContext } from './CheckboxContext';
import { UseCheckboxProps } from './types';
import { useCheckbox } from './useCheckbox';

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof UseCheckboxProps>,
    UseCheckboxProps {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
  const { isChecked: isCheckedProp, children, isDisabled, onChange: onChangeProp, ...rest } = props;
  const group = useCheckboxGroupContext();

  let isChecked = isCheckedProp;
  if (group?.value && props.value) {
    isChecked = group.value.includes(props.value);
  }

  let onChange = onChangeProp;
  if (group?.onChange && props.value) {
    onChange = callAll(group?.onChange, onChangeProp);
  }

  const { getInputProps, getLabelProps, htmlProps } = useCheckbox({
    ...rest,
    isChecked,
    onChange,
    isDisabled,
  });

  return (
    <label>
      <input {...getInputProps(htmlProps, ref)} />
      {children && <span {...getLabelProps()}>{children}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

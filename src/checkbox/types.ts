import { ChangeEvent, FocusEvent } from 'react';
import { UseCheckboxGroupReturn } from './useCheckboxGroup';

export interface UseCheckboxGroupProps {
  value?: Array<string | number>;
  defaultValue?: Array<string | number>;
  onChange?: (value: Array<string | number>) => void;
  isDisabled?: boolean;
}

export interface UseCheckboxProps {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;

  defaultChecked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string | number;
  id?: string;

  ariaLabel?: string;
  ariaLabelledby?: string;
}

export interface CheckboxGroupContextValue
  extends Pick<UseCheckboxGroupReturn, 'value' | 'onChange'> {}

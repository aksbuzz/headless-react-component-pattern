import { createContext } from '../hooks/createContext';
import { CheckboxGroupContextValue } from './types';

export const [CheckboxGroupProvider, useCheckboxGroupContext] =
  createContext<CheckboxGroupContextValue>();

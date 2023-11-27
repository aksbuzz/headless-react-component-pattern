/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import type { UseDropdownReturn } from './useDropdown';

export type DropdownContextValue = Omit<
  UseDropdownReturn,
  'ref' | 'getAriaAttributes' | 'onKeyDown'
>;

export const DropdownContext = createContext<DropdownContextValue | null>(null);

export const useDropdownContext = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error('Components must be used within <Dropdown />');
  }

  return ctx;
};

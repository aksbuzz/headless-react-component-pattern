import { type ReactNode, RefObject } from 'react';
import { DropdownContext } from './DropdownContext';
import { DropdownList } from './DropdownList';
import { DropdownListItem } from './DropdownListItem';
import { DropdownTrigger } from './DropdownTrigger';
import type { DropdownItem } from './types';
import { useDropdown } from './useDropdown';

type DropdownProps<T> = {
  children: ReactNode;
  items: Array<T>;
};

export function Dropdown(props: DropdownProps<DropdownItem>) {
  const { children, items } = props;
  const { ref, getAriaAttributes, onKeyDown, ...ctx } = useDropdown(items);

  return (
    <DropdownContext.Provider value={ctx}>
      <div
        ref={ref as unknown as RefObject<HTMLDivElement>}
        tabIndex={0}
        {...getAriaAttributes()}
        onKeyDown={onKeyDown}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Trigger = DropdownTrigger;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownListItem;

import { RefObject } from 'react';
import { DropdownMenu } from './DropdownMenu';
import { DropdownTrigger } from './DropdownTrigger';
import { DropdownItem } from './types';
import { useDropdown } from './useDropdown';

type DropdownProps = {
  items: Array<DropdownItem>;
};

export function Dropdown(props: DropdownProps) {
  const { items } = props;
  const {
    isOpen,
    ref,
    onItemClick,
    onKeyDown,
    onToggle,
    selectedIndex,
    getAriaAttributes,
    selectedItem,
  } = useDropdown(items);

  return (
    <div
      className="dropdown"
      tabIndex={0}
      ref={ref as RefObject<HTMLDivElement>}
      onKeyDown={onKeyDown}
      {...getAriaAttributes()}
    >
      <DropdownTrigger
        label={selectedItem ? selectedItem.text : 'Select an item...'}
        onClick={onToggle}
      />
      {isOpen && (
        <DropdownMenu
          items={items}
          selectedIndex={selectedIndex}
          onItemClick={onItemClick}
        />
      )}
    </div>
  );
}

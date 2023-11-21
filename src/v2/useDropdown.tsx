import { RefObject, useRef, useState } from 'react';
import { DropdownItem } from './types';

export function useDropdown(items: Array<DropdownItem>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const dropdownRef = useRef<RefObject<HTMLDivElement>>(null);

  function getAriaAttributes() {
    return {
      role: 'combobox',
      'aria-expanded': isOpen,
      'aria-activedescendant': selectedItem ? selectedItem.text : undefined,
    };
  }

  function onItemClick(item: DropdownItem, index: number) {
    setSelectedItem(item);
    setSelectedIndex(index);
    setIsOpen(false);
  }

  function onToggle() {
    setIsOpen((prev) => !prev);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    switch (e.code) {
      case 'Space':
      case 'Enter': {
        if (isOpen) {
          onItemClick(items[selectedIndex], selectedIndex);
        } else {
          onToggle();
        }
        break;
      }
      case 'Escape':
      case 'Tab': {
        if (isOpen) {
          onToggle();
        }
        break;
      }
      case 'ArrowDown': {
        if (isOpen && selectedIndex < items.length - 1) {
          setSelectedIndex((prev) => prev + 1);
        }
        break;
      }
      case 'ArrowUp': {
        if (isOpen && selectedIndex > 0) {
          setSelectedIndex((prev) => prev - 1);
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  return {
    isOpen,
    ref: dropdownRef,
    onItemClick,
    onKeyDown,
    onToggle,
    selectedItem,
    selectedIndex,
    getAriaAttributes,
  };
}

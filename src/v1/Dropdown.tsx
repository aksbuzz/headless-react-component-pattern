import { useState } from 'react';
import { DropdownMenu } from './DropdownMenu';
import { DropdownTrigger } from './DropdownTrigger';
import { DropdownItem } from './types';

type DropdownProps = {
  items: Array<DropdownItem>;
};

export function Dropdown(props: DropdownProps) {
  const { items } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  function handleItemClick(item: DropdownItem) {
    setSelectedItem(item);
    setIsOpen(false);
  }

  return (
    <div className="dropdown">
      <DropdownTrigger
        label={selectedItem ? selectedItem.text : 'Select an item...'}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && <DropdownMenu items={items} onItemClick={handleItemClick} />}
    </div>
  );
}

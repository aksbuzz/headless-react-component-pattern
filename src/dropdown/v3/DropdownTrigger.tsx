import { ButtonHTMLAttributes } from 'react';
import { useDropdownContext } from './DropdownContext';

type TriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function DropdownTrigger({ children, ...props }: TriggerProps) {
  const { onToggle, selectedItem } = useDropdownContext();

  return (
    <button {...props} className="dropdown__trigger" tabIndex={0} onClick={onToggle}>
      {selectedItem ? selectedItem.label : children}
    </button>
  );
}

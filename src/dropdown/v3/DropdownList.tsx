import { ReactNode } from 'react';
import { useDropdownContext } from './DropdownContext';

type DropdownListProps = {
  children: ReactNode;
  className?: string;
};

export function DropdownList(props: DropdownListProps) {
  const { children, ...listProps } = props;
  const { isOpen } = useDropdownContext()

  if (!isOpen) return null

  return (
    <div {...listProps} role="listbox">
      {children}
    </div>
  );
}

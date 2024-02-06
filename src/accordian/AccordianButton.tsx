import { ButtonHTMLAttributes } from 'react';
import { useAccordianContext } from './AccordianContext';

type AccordianButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function AccordianButton(props: AccordianButtonProps) {
  const { children, ...rest } = props;
  const { isOpen, onToggle } = useAccordianContext();

  if (!isOpen) return null;

  return (
    <button {...rest} onClick={onToggle}>
      {children}
    </button>
  );
}

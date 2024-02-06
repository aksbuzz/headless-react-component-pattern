import { HTMLAttributes } from 'react';
import { useAccordianContext } from './AccordianContext';

type AccordianPanelProps = HTMLAttributes<HTMLDivElement>;

export function AccordianPanel(props: AccordianPanelProps) {
  const { children, ...rest } = props;
  const { isOpen } = useAccordianContext();

  if (!isOpen) return null;

  return <div {...rest}>{children}</div>;
}

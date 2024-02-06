import { HTMLAttributes, useMemo } from 'react';
import { AccordianContextValue } from './types';
import { AccordianProvider } from './AccordianContext';

type AccordianItemProps = HTMLAttributes<HTMLDivElement> & AccordianContextValue;

export function AccordianItem(props: AccordianItemProps) {
  const { isOpen, onToggle, children, ...rest } = props;

  const value = useMemo(() => ({ isOpen, onToggle }), [isOpen, onToggle]);

  return (
    <AccordianProvider value={value}>
      <div {...rest}>{children}</div>
    </AccordianProvider>
  );
}

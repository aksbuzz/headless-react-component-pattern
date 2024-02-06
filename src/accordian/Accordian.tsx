import { Children, HTMLAttributes, cloneElement, useState } from 'react';
import { AccordianItem } from './AccordianItem';

type AccordianProps = HTMLAttributes<HTMLDivElement>;

export function Accordian(props: AccordianProps) {
  const { children, ...rest } = props;
  const [openPanelIndexes, setOpenPanelIndexes] = useState<number[]>([]);

  function handleAccordianPanelClick(index: number) {
    if (openPanelIndexes.includes(index)) {
      setOpenPanelIndexes(openPanelIndexes.filter(i => i !== index));
    } else {
      setOpenPanelIndexes([...openPanelIndexes, index]);
    }
  }

  return (
    <div {...rest}>
      {Children.map(children, (child, index) => {
        if (!child || child?.type !== AccordianItem) {
          throw new Error('<AccordianItem /> can only be used inside <Accordian />');
        }

        return cloneElement(child, {
          index,
          isOpen: openPanelIndexes.includes(index),
          onToggle: () => handleAccordianPanelClick(index),
        });
      })}
    </div>
  );
}

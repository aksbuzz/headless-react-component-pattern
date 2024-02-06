import { ChangeEvent, useCallback, useState } from 'react';
import { useUncontrolled } from '../hooks/use-uncontrolled';
import { UseRatingProps } from './types';

const randomName = `rating-${Math.random().toString(36).slice(2, 11)}`;

export function useRating(props: UseRatingProps) {
  const { count = 5, defaultValue, name, onChange, onHover, readonly, value, ...rest } = props;
  const _name = name || randomName;

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [rating, setRating] = useUncontrolled({
    defaultValue,
    value,
    onChange,
  });

  const percentage = Math.floor((rating / count) * 100);

  const handleMouseEnter = useCallback(
    (index: number) => {
      if (readonly) return;

      setHoverIndex(index);
      onHover?.(index);
    },
    [readonly, onHover]
  );
  const handleMouseLeave = useCallback(() => {
    if (readonly) return;
    setHoverIndex(null);
  }, [readonly]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement> | number) => {
      if (readonly) return;
      if (typeof event === 'number') {
        setRating(event);
      } else {
        setRating(parseFloat(event.target.value));
      }
    },
    [readonly, setRating]
  );

  const handleRatingClick = useCallback(
    (index: number) => {
      if (readonly) return;
      setRating(index);
    },
    [readonly, setRating]
  );

  const getInputProps = useCallback(
    ({ index, ...props }: { index: number }) => {
      const value = index + 1;
      const isChecked = value <= (hoverIndex || rating);

      return {
        name: `${_name}-${value}`,
        type: 'radio',
        onChange: () => handleInputChange(value),
        onMouseEnter: () => handleMouseEnter(value),
        onMouseLeave: handleMouseLeave,
        onClick: () => handleRatingClick(value),
        title: `Change rating to ${value}`,
        'aria-valuemax': count,
        'aria-valuemin': 0,
        'aria-valuenow': value,
        value: value,
        disabled: readonly,
        checked: isChecked,
        id: `id-${_name}-${value}`,
        ...props,
      };
    },
    [
      _name,
      rating,
      count,
      readonly,
      hoverIndex,
      handleInputChange,
      handleMouseEnter,
      handleMouseLeave,
      handleRatingClick,
    ]
  );

  return { getInputProps, percentage, count, readonly, ...rest };
}

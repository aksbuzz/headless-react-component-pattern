import { InputHTMLAttributes, ReactNode } from 'react';
import { StarIcon } from './icon';

import './Rating.css';

interface RatingItemProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  emptySymbol?: ReactNode | ((value: number) => ReactNode);
  fullSymbol?: ReactNode | ((value: number) => ReactNode);
  value: number;
}

export function RatingItem(props: RatingItemProps) {
  const {
    className,
    checked,
    onClick,
    onMouseEnter,
    onMouseLeave,
    emptySymbol,
    fullSymbol,
    value,
    ...rest
  } = props;

  const iconFull = typeof fullSymbol === 'function' ? fullSymbol(value) : fullSymbol;
  const iconEmpty = typeof emptySymbol === 'function' ? emptySymbol(value) : emptySymbol;

  return (
    <div
      className="rating__item"
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      onMouseLeave={onMouseLeave}
    >
      <input className={`${className || ''} input`} {...rest} {...{ checked, value }} />
      <label
        htmlFor={rest.id}
        ref={node => {
          node?.getBoundingClientRect();
        }}
      >
        {checked ? iconFull || <StarIcon fill="#f08c00" /> : iconEmpty || <StarIcon />}
      </label>
    </div>
  );
}

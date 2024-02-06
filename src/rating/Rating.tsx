import { HTMLAttributes } from 'react';
import './Rating.css';
import { RatingItem } from './RatingItem';
import { UseRatingProps } from './types';
import { useRating } from './use-rating';

interface RatingProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof UseRatingProps>,
    UseRatingProps {}

export function Rating(props: RatingProps) {
  const { count, getInputProps, percentage, readonly, ...rest } = useRating(props);

  const ratingItems = new Array(count).fill(null).map((_, index) => {
    const inputProps = getInputProps({ index });
    return <RatingItem key={index} {...inputProps} {...rest} />;
  });

  return (
    <div className="rating__container">
      {ratingItems}
      {readonly && <div className="rating__overlay" style={{ width: `${100 - percentage}%` }} />}
    </div>
  );
}

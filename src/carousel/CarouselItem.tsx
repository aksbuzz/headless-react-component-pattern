import type { TCarouselItem } from './types';

interface CarouselItemProps extends TCarouselItem {
  isActive?: boolean;
}

export function CarouselItem(props: CarouselItemProps) {
  const { placeholder, url } = props;

  return (
    <div className="carousel__item">
      <img src={url} loading='lazy' alt={placeholder} />
    </div>
  );
}

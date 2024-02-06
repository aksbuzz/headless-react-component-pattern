import { HTMLAttributes } from 'react';
import { CarouselItem } from './CarouselItem';
import { UseCarouselProps } from './types';
import { useCarousel } from './use-carousel';

import './Carousel.css';

interface CarouselProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof UseCarouselProps>,
    UseCarouselProps {
  height?: number;
}

export function Carousel(props: CarouselProps) {
  const {
    carouselRef,
    items,
    currentSlide,
    handleChangeNextSlide,
    handleChangePrevSlide,
    handleKeyDown,
    handleMouseEnter,
    handleMouseLeave,
    handleSlideChange,
    ...rest
  } = useCarousel(props);

  return (
    <div
      {...rest}
      className="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ height: `${props.height || 200}px` }}
    >
      <div className="carousel__container" ref={carouselRef}>
        {items?.map((item, index) => (
          <CarouselItem key={index} {...item} />
        ))}
      </div>
      <div className="carousel__indicators">
        {Array.from({ length: items?.length || 0 }).map((_, index) => (
          <button
            key={index}
            className={`carousel__indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleSlideChange(index)}
          ></button>
        ))}
      </div>
      <div className="carousel__controls">
        <button
          className="carousel__control carousel__control--prev"
          onClick={handleChangePrevSlide}
        >
          Prev
        </button>
        <button
          className="carousel__control carousel__control--next"
          onClick={handleChangeNextSlide}
        >
          Next
        </button>
      </div>
    </div>
  );
}

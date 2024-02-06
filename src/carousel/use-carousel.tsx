import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { UseCarouselProps } from './types';

export function useCarousel(props: UseCarouselProps) {
  const {
    duration = 2500,
    initialSlide = 0,
    isAutoplay = false,
    isLoop = true,
    items,
    onSlideChange,
    ...htmlProps
  } = props;
  const totalSlides = items?.length || 0;

  const carouselRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [isPlaying, setIsPlaying] = useState(isAutoplay);

  const handleSlideChange = useCallback(
    (index: number) => {
      setCurrentSlide(index);
      onSlideChange?.(index);
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(-${index * 100}%)`;
      }
    },
    [onSlideChange]
  );

  const handleChangeNextSlide = useCallback(() => {
    if (!isLoop && currentSlide === totalSlides - 1) return;
    if (isLoop && currentSlide === totalSlides - 1) handleSlideChange(0);
    else handleSlideChange(currentSlide + 1);
  }, [isLoop, currentSlide, totalSlides, handleSlideChange]);

  const handleChangePrevSlide = useCallback(() => {
    if (!isLoop && currentSlide === 0) return;
    if (isLoop && currentSlide === 0) handleSlideChange(totalSlides - 1);
    else handleSlideChange(currentSlide - 1);
  }, [currentSlide, handleSlideChange, isLoop, totalSlides]);

  const handleMouseEnter = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const handleMouseLeave = useCallback(() => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const code = event.code;
      if (code === 'ArrowRight') {
        handleChangeNextSlide();
      } else if (code === 'ArrowLeft') {
        handleChangePrevSlide();
      }
    },
    [handleChangeNextSlide, handleChangePrevSlide]
  );

  useEffect(() => {
    let timerId: number;

    if (isAutoplay && isPlaying) {
      timerId = setTimeout(() => {
        handleChangeNextSlide();
      }, duration);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [duration, handleChangeNextSlide, isAutoplay, isPlaying]);

  return {
    carouselRef,
    items,
    currentSlide,
    handleKeyDown,
    handleSlideChange,
    handleChangeNextSlide,
    handleChangePrevSlide,
    handleMouseEnter,
    handleMouseLeave,
    ...htmlProps,
  };
}

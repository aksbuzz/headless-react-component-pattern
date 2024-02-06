export interface TCarouselItem {
  placeholder?: string
  url?: string
}

export interface UseCarouselProps {
  initialSlide?: number
  items: Array<TCarouselItem>
  isLoop?: boolean
  isAutoplay?: boolean
  duration?: number
  onSlideChange?: (index: number) => void
}
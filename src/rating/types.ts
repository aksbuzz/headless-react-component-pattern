import { ReactNode } from 'react';

export interface UseRatingProps {
  count?: number;
  defaultValue?: number;
  name?: string;
  onChange?: (value: number) => boolean;
  onHover?: (value: number) => boolean;
  readonly?: boolean;
  value?: number;
  emptySymbol?: ReactNode | ((value: number) => ReactNode);
  fullSymbol?: ReactNode | ((value: number) => ReactNode);
}

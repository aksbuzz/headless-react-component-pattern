export interface UsePinInputProps {
  ariaLabel?: string;
  autoFocus?: boolean;
  defaultValue?: string;
  id?: string;
  isDisabled?: boolean;
  length?: number;
  mask?: boolean;
  name?: string;
  onChange?: (value: string) => void;
  /**
   * When all inputs are filled
   */
  onComplete?: (value: string) => void;
  value?: string;
}

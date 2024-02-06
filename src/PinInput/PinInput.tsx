import { forwardRef } from 'react';
import { UsePinInputProps } from './types';
import { usePinInput } from './use-pin-input';
import { assignRef } from '../hooks/use-merge-refs';

export const PinInput = forwardRef<HTMLInputElement, UsePinInputProps>(function PinInput(
  props,
  ref
) {
  const {
    value,
    length,
    inputRefs,
    handleChange,
    handleKeyDown,
    handlePaste,
    getAriaAttributes,
    ...rest
  } = usePinInput(props);

  return (
    <div>
      {[...Array(length)].map((_, index) => (
        <input
          autoComplete="one-time-code"
          key={index}
          ref={node => {
            // assign first input ref
            index === 0 && assignRef(ref, node);
            inputRefs.current[index] = node as HTMLInputElement;
          }}
          inputMode="numeric"
          value={value?.charAt(index) || ''}
          onChange={e => handleChange(e, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onPaste={handlePaste}
          id={`${index}-${rest.id}`}
          name={`${index}-${rest.name}`}
          autoFocus={index === 0 && rest.autoFocus}
          {...getAriaAttributes()}
        />
      ))}
    </div>
  );
});

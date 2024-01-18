import { ReactNode, useMemo } from 'react';
import { CheckboxGroupProvider } from './CheckboxContext';
import { UseCheckboxGroupProps } from './types';
import { useCheckboxGroup } from './useCheckboxGroup';

interface CheckboxGroupProps extends UseCheckboxGroupProps {
  children?: ReactNode;
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const { children } = props;
  const { value, onChange } = useCheckboxGroup(props);

  const group = useMemo(() => {
    return {
      onChange,
      value,
    };
  }, [onChange, value]);

  return <CheckboxGroupProvider value={group}>{children}</CheckboxGroupProvider>;
}

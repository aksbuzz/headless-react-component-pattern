import { createContext } from '../hooks/createContext';
import { AccordianContextValue } from './types';

export const [AccordianProvider, useAccordianContext] = createContext<AccordianContextValue>({
  strict: true,
});

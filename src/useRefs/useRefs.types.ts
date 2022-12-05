import type { MutableRefObject } from 'react';

/**
 * Type utility to create an object type where all values are MutableRefObjects
 */
export type Refs<T extends Record<string | number | symbol, unknown>> = {
  [P in keyof T]: MutableRefObject<T[P] | null>;
};

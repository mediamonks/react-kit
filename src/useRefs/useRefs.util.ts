import type { MutableRefObject } from 'react';
import { createRefArray } from '../createRefArray/createRefArray';

/**
 * Helper to set element in RefObject<Array>
 */
export function arrayRef<T extends MutableRefObject<Array<unknown> | null>>(
  ref: T,
  index: number,
): (element: NonNullable<T['current']>[number]) => void {
  return (element) => {
    if (ref.current === null) {
      ref.current = createRefArray();
    }

    ref.current[index] = element;
  };
}

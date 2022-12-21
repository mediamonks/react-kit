import type { MutableRefObject } from 'react';
import { trimEnd } from '../../_utils/trimEnd/trimEnd';

/**
 * Helper to set element in RefObject<Array>
 */
export function arrayRef<T extends MutableRefObject<Array<unknown> | null>>(
  ref: T,
  index: number,
): (element: NonNullable<T['current']>[number]) => void {
  return (element) => {
    if (ref.current === null) {
      ref.current = [];
    }

    ref.current[index] = element;

    if (element === null) {
      trimEnd(ref.current, null);
    }
  };
}

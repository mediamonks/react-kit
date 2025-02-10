import { memoize } from 'lodash-es';
import type { RefObject } from 'react';
import { trimEnd } from '../../_utils/trimEnd/trimEnd.js';

/**
 * Helper to set element in RefObject<Array>
 */
function arrayRefInternal<T extends RefObject<Array<unknown> | null>>(
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

const refMap = new Map<RefObject<Array<unknown> | null>, number>();
let uniqueValueCounter = 0;

/**
 * Turns a ref and index into a unique key
 * This is needed because the memoize function only uses string keys,
 * and we need to use a ref as a key.
 * The Map is used to make sure that the same ref always gets the same unique number,
 * since Maps can use objects as keys.
 *
 * @param ref
 * @param index
 */
function getMemoizeKeyForRefAndIndex(ref: RefObject<Array<unknown> | null>, index: number): string {
  if (!refMap.has(ref)) {
    refMap.set(ref, ++uniqueValueCounter);
  }
  return `${refMap.get(ref)}_${index}`;
}

export const arrayRef = memoize(arrayRefInternal, (ref, index) =>
  getMemoizeKeyForRefAndIndex(ref, index),
);

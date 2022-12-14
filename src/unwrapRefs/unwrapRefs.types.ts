import type { RefObject } from 'react';

/**
 * Unwrap RefObject values in Record
 */
export type UnwrapRefs<T extends Record<string | number | symbol, RefObject<unknown>>> = {
  [K in keyof T]: T[K]['current'];
};

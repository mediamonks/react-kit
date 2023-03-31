import type { RefObject } from 'react';

/**
 * Type for a value that is optionally wrapped in a RefObject type
 */
export type RefObjectOption<T> = RefObject<T> | T;

/**
 * Type to get the value of a RefObjectOption
 */
export type RefObjectOptionValue<T extends RefObjectOption<unknown>> = T extends RefObject<infer U>
  ? U
  : T;

/**
 * This function allows you to get the current value of a ref object, or the
 * value as is.
 */
export function getRefObjectOptionValue<T>(target: RefObjectOption<T>): T | null {
  return target !== null && typeof target === 'object' && 'current' in target
    ? target.current
    : target;
}

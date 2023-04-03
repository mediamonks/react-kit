import type { RefObject } from 'react';
import { isRefObject } from '../isRefObject/isRefObject.js';

/**
 * Type for a value that is optionally wrapped in a RefObject type
 */
export type Unreffable<T> = RefObject<T> | T;

/**
 * Type to get the value of a Unreffable
 */
export type Unref<T extends Unreffable<unknown>> = T extends RefObject<infer U> ? U : T;

/**
 * This function returns the current value of a ref object, or the plain value.
 */
export function unref<T>(target: Unreffable<T>): T | null {
  return isRefObject(target) ? target.current : target;
}

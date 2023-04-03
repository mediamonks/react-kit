import { type RefObject } from 'react';

/**
 * Type guard to check if a value is a RefObject
 */
export function isRefObject(target: unknown): target is RefObject<unknown> {
  return target !== null && typeof target === 'object' && 'current' in target;
}

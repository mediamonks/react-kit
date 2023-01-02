import type { Refs } from '../../useRefs.types.js';
import type { UnwrapRefs } from './unwrapRefs.types.js';

/**
 * Unwraps RefObjects in object
 */
export function unwrapRefs<T extends Refs>(refs: T): UnwrapRefs<T> {
  const unwrappedRefs = {} as UnwrapRefs<T>;

  for (const key in refs) {
    if (Object.hasOwn(refs, key)) {
      unwrappedRefs[key] = refs[key].current;
    }
  }

  return unwrappedRefs;
}

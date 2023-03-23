import { type RefObject, useRef } from 'react';

/**
 * Keeps a ref up to date with a changing value.
 *
 * Normal values are captured in scopes, while refs are not. This means that if you want to use a
 * changing value in a callback, you need to use a ref.
 *
 * @param value The value to keep in the ref.
 * @returns A ref object that is updated with the value.
 */
export function useRefValue<T>(value: T): RefObject<T> {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

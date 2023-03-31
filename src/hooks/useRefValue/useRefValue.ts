import { type RefObject, useRef } from 'react';

export function useRefValue<T>(value: T): RefObject<T> {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

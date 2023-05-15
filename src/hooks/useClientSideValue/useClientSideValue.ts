import { useState } from 'react';
import { useMount } from '../useMount/useMount.js';

/**
 * Hook that returns the value returned by a callback function that is only called on client-side.
 *
 * @example
 * function MyComponent() {
 *   const value = useClientSideValue(Date.now);
 *
 *   return <div>{value ?? 'Fallback value'}</div>;
 * }
 */
export function useClientSideValue<T extends () => unknown>(callback: T): ReturnType<T> | null {
  const [value, setValue] = useState<ReturnType<T> | null>(null);

  useMount(() => {
    // @ts-expect-error - we don't know what the callback returns
    setValue(callback);
  });

  return value;
}

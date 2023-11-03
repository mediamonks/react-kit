import { useState } from 'react';
import { useMount } from '../../lifecycle/hooks/useMount/useMount.js';

/**
 * Hook that returns the value returned by a callback function that is only called on client-side.
 *
 * @example
 * function MyComponent() {
 *   const value = useClientSideValue(Date.now, null);
 *
 *   return <div>{value ?? 'n/a'}</div>;
 * }
 */
export function useClientSideValue<T>(callback: () => T, initialValue?: T): typeof initialValue {
  const [value, setValue] = useState(initialValue);

  useMount(() => {
    setValue(callback);
  });

  return value;
}

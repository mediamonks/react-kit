/* eslint-disable  @typescript-eslint/unified-signatures, @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { unref, type Unreffable } from '../../utils/unref/unref.js';
import { useRefValue } from '../useRefValue/useRefValue.js';

export function useEventListener<T extends EventTarget | null>(
  targetOption: Unreffable<T> | undefined,
  type: string,
  listener: EventListener,
  options?: boolean | AddEventListenerOptions,
): void {
  const listenerRef = useRefValue(listener);

  useEffect(() => {
    const target = unref(targetOption);

    if (!target) {
      return;
    }

    function callback(this: unknown, event: Event): void {
      listenerRef.current?.(event);
    }

    target.addEventListener(type, callback, options);

    return () => {
      target.removeEventListener(type, callback, options);
    };
  }, [listenerRef, options, targetOption, type]);
}

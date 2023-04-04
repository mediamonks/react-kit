/* eslint-disable  @typescript-eslint/unified-signatures, @typescript-eslint/no-explicit-any */
import { useEffect, type RefObject } from 'react';
import { unref } from '../../utils/unref/unref.js';
import { useRefValue } from '../useRefValue/useRefValue.js';

export function useEventListener<T extends EventTarget>(
  targetOption: RefObject<T> | T | null | undefined,
  type: string,
  listener: EventListener,
  options?: boolean | AddEventListenerOptions,
): void {
  const listenerRef = useRefValue(listener);

  useEffect(() => {
    const target = unref(targetOption);

    function callback(this: unknown, event: Event): void {
      listenerRef.current?.(event);
    }

    target?.addEventListener(type, callback, options);

    return () => {
      target?.removeEventListener(type, callback, options);
    };
  }, [listenerRef, options, targetOption, type]);
}

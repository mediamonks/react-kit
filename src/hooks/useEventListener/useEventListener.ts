/* eslint-disable  @typescript-eslint/unified-signatures, @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import {
  getRefObjectOptionValue,
  type RefObjectOption,
} from '../../utils/getRefObjectOption/getRefObjectOption.js';
import { useRefValue } from '../useRefValue/useRefValue.js';

export function useEventListener<T extends EventTarget>(
  targetOption: RefObjectOption<T> | null | undefined,
  type: string,
  listener: EventListener,
  options?: boolean | AddEventListenerOptions,
): void {
  const listenerRef = useRefValue(listener);

  useEffect(() => {
    const target = getRefObjectOptionValue(targetOption);

    function callback(this: unknown, event: Event): void {
      listenerRef.current?.(event);
    }

    target?.addEventListener(type, callback, options);

    return () => {
      target?.removeEventListener(type, callback, options);
    };
  }, [listenerRef, options, targetOption, type]);
}

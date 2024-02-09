import { useRef, type RefObject, useCallback } from 'react';
import { useMount } from '../../lifecycle/hooks/useMount/useMount.js';
import { unref, type Unreffable } from '../../utils/unref/unref.js';
import { useResizeObserver } from '../useResizeObserver/useResizeObserver.js';

/**
 * A hook that returns a ref object containing the content rectangle of the target
 * element. The content rectangle is updated whenever the target element is resized.
 */
export function useContentRect(
  target: Unreffable<Element | null>,
): RefObject<DOMRectReadOnly | null> {
  const contentRectRef = useRef<DOMRectReadOnly | null>(null);

  const onResize = useCallback<ResizeObserverCallback>((entries): void => {
    contentRectRef.current = entries.at(0)?.contentRect ?? null;
  }, []);

  useResizeObserver(target, onResize);

  useMount(() => {
    contentRectRef.current = unref(target)?.getBoundingClientRect() ?? null;
  });

  return contentRectRef;
}

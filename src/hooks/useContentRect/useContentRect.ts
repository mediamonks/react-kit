import { useRef, type RefObject } from 'react';
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

  useResizeObserver(target, (entries): void => {
    contentRectRef.current = entries.at(0)?.contentRect ?? null;
  });

  useMount(() => {
    contentRectRef.current = unref(target)?.getBoundingClientRect() ?? null;
  });

  return contentRectRef;
}

import { useRef, useState } from 'react';
import { useMount } from '../../index.js';
import { unref, type Unreffable } from '../../utils/unref/unref.js';
import { useResizeObserver } from '../useResizeObserver/useResizeObserver.js';

/**
 * A hook that returns the content rectangle of the target element.
 * The content rectangle is updated whenever the target element is resized.
 */
export function useContentRectState(target: Unreffable<Element | null>): DOMRectReadOnly | null {
  const [contentRect, setContentRect] = useState<DOMRectReadOnly | null>(null);
  const rafRef = useRef(0);

  useResizeObserver(target, (entries) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setContentRect(entries.at(0)?.contentRect ?? null);
    });
  });

  useMount(() => {
    setContentRect(unref(target)?.getBoundingClientRect() ?? null);
  });

  return contentRect;
}

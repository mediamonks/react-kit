import { useCallback, useMemo } from 'react';
import { unref, type Unreffable } from '../../utils/unref/unref.js';
import { useEventListener } from '../useEventListener/useEventListener.js';

/**
 * Registers a click event listener on the document that triggers a callback function when the
 * click event occurs outside of the specified element.
 *
 * @param ref
 * @param listener
 * @param options
 */
export function useClickedOutside(
  target: Unreffable<Element | null>,
  listener: (mouseEvent: MouseEvent) => void,
  options?: EventListenerOptions,
): void {
  const memoizedOptions = useMemo(
    () => options,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...Object.keys(options ?? {}), ...Object.values(options ?? {})],
  );

  const onClick = useCallback(
    (event: Event) => {
      // Using element bounds because a click on a shadow element (e.g. dialog backdrop) is also
      // considered to be a click outside an element
      const {
        top = 0,
        right = 0,
        bottom = 0,
        left = 0,
      } = unref(target)?.getBoundingClientRect() ?? {};

      if (event instanceof MouseEvent) {
        const { clientX, clientY } = event;

        if (clientX >= left && clientX <= right && clientY >= top && clientY <= bottom) {
          // Clicked inside bounding box of the element
          return;
        }
      } else {
        throw new TypeError('Expected MouseEvent');
      }

      listener(event);
    },
    [listener, target],
  );

  useEventListener(globalThis.document, 'click', onClick, memoizedOptions);
}

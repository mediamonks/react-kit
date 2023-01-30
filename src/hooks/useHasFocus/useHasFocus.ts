import { useCallback, useState, type RefObject } from 'react';
import { useDocumentEvent } from '../useDocumentEvent/useDocumentEvent.js';

export type FocusPseudoSelector = ':focus' | ':focus-visible' | ':focus-within';

/**
 * This hook allows you to determine if an element matches the :focus, :focus-visible, or :focus-within pseudo selectors.
 *
 * @param ref - The ref to the element to check
 * @param selector - The pseudo selector to check for
 */
export function useHasFocus(
  ref: RefObject<HTMLElement>,
  selector: FocusPseudoSelector = ':focus',
): boolean {
  const matches = useCallback(() => ref.current?.matches(selector) ?? false, [ref, selector]);

  const [state, setState] = useState(matches);

  useDocumentEvent('focusin', () => {
    setState(matches());
  });

  return state;
}

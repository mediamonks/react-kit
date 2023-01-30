import { renderHook } from '@testing-library/react';
import { useEventListener } from './useEventListener.js';

describe('useEventListener', () => {
  it('should not crash', () => {
    renderHook(
      () => {
        useEventListener(typeof document === 'undefined' ? undefined : document, 'focusin', () => {
          // eslint-disable-next-line no-console
          console.log(document.activeElement);
        });
      },
      {
        initialProps: undefined,
      },
    );
  });
});

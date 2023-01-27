import { renderHook } from '@testing-library/react';
import { useDocumentEvent } from './useDocumentEvent.js';

describe('useDocumentEvent', () => {
  it('should not crash', () => {
    renderHook(
      () => {
        useDocumentEvent('focusin', () => {
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

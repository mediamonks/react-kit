import { renderHook } from '@testing-library/react';
import { useDocumentEventListener } from './useDocumentEventListener.js';

describe('useDocumentEventListener', () => {
  it('should not crash', () => {
    renderHook(
      () => {
        useDocumentEventListener('focusin', () => {
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

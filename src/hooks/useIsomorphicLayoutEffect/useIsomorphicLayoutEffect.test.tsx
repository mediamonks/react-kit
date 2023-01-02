import { renderHook } from '@testing-library/react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect.js';

describe('useIsomorphicLayoutEffect', () => {
  it('should not crash', async () => {
    renderHook(useIsomorphicLayoutEffect, {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      initialProps: () => {},
    });
  });
});

import { act, renderHook } from '@testing-library/react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

describe('useIsomorphicLayoutEffect', () => {
  it('should not crash', async () => {
    renderHook(useIsomorphicLayoutEffect, {
      initialProps: () => console.log('test'),
    });
  });
});

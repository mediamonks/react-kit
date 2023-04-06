import { renderHook } from '@testing-library/react';
import { useAnimationLoop } from './useAnimationLoop.js';

describe('useAnimationLoop', () => {
  it('should not crash', async () => {
    renderHook(useAnimationLoop, {
      initialProps: undefined,
    });
  });
});

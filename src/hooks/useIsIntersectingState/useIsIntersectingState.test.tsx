import { renderHook } from '@testing-library/react';
import { describe, it } from 'vitest';
import { useIsIntersectingState } from './useIsIntersectingState.js';

describe('useIsIntersectingState', () => {
  it('should not crash', async () => {
    renderHook(() => {
      return useIsIntersectingState();
    });
  });
});

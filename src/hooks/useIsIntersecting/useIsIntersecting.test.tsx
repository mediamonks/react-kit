import { renderHook } from '@testing-library/react';
import { describe, it } from 'vitest';
import { useIsIntersecting } from './useIsIntersecting.js';

describe('useIsIntersecting', () => {
  it('should not crash', async () => {
    renderHook(() => {
      return useIsIntersecting();
    });
  });
});

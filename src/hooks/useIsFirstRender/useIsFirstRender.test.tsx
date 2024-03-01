import { act, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useIsFirstRender } from './useIsFirstRender.js';

describe('useIsFirstRender', () => {
  it('should return true on first render and false on subsequent renders', async () => {
    const { result, rerender } = renderHook(() => useIsFirstRender());

    // Check if the hook returns true on the first render
    expect(result.current).toBe(true);

    // Force a rerender
    await act(async () => {
      rerender();
    });

    // Check if the hook returns false on subsequent renders
    expect(result.current).toBe(false);
  });
});

import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useClientSideValue } from './useClientSideValue.js';

describe('useClientSideValue', () => {
  it('should not crash', async () => {
    renderHook(() => useClientSideValue(Date.now, 0));
  });

  it('should set the value once', async () => {
    let count = 0;

    const { result, rerender } = renderHook(() => useClientSideValue(() => ++count, 0));

    expect(result.current).toBe(1);

    rerender();

    expect(result.current).toBe(1);
  });
});

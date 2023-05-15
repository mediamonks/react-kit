import { renderHook } from '@testing-library/react';
import { useClientSideValue } from './useClientSideValue.js';

describe('useClientSideValue', () => {
  it('should not crash', async () => {
    renderHook(() => useClientSideValue(Date.now));
  });

  it('should set the value once', async () => {
    let count = 0;

    const { result, rerender } = renderHook(() => useClientSideValue(() => ++count));

    expect(result.current).toBe(1);

    rerender();

    expect(result.current).toBe(1);
  });
});

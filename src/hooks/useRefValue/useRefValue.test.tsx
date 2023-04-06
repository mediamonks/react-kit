import { renderHook } from '@testing-library/react';
import { useRefValue } from './useRefValue.js';

describe('useRefValue', () => {
  it('should not crash', async () => {
    renderHook(() => useRefValue(1));
  });

  it('should have the correct initial value', async () => {
    const { result } = renderHook(() => useRefValue(1));

    expect(result.current.current).toBe(1);
  });

  it('should update the value', async () => {
    const { result, rerender } = renderHook((value) => useRefValue(value), {
      initialProps: 1,
    });

    expect(result.current.current).toBe(1);
    rerender(2);
    expect(result.current.current).toBe(2);
  });
});

import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { describe, expect, it, vitest } from 'vitest';
import { useObjectRef } from './useObjectRef.js';

describe('useObjectRef', () => {
  it('should work with RefObject', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useObjectRef(ref);
    });

    expect(result.current).toHaveProperty('current');
    expect(result.current.current).toBe(null);
  });

  it('should call function ref when value changes', () => {
    const refCallback = vitest.fn();
    const { result } = renderHook(() => useObjectRef(refCallback));

    const element = document.createElement('div');
    result.current.current = element;

    expect(refCallback).toHaveBeenCalledWith(element);
  });

  it('should maintain reference equality on rerenders', () => {
    const { result, rerender } = renderHook(() => {
      const ref = useRef(null);
      return useObjectRef(ref);
    });

    const firstRender = result.current;
    rerender();
    expect(result.current).toBe(firstRender);
  });

  it('should handle null ref', () => {
    const { result } = renderHook(() => useObjectRef(null));
    expect(result.current).toHaveProperty('current');
    expect(result.current.current).toBe(null);
  });
});

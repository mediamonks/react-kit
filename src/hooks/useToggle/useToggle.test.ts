import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useToggle } from './useToggle.js';

describe('useToggle', () => {
  it('should not crash', () => {
    renderHook(useToggle, {
      initialProps: true,
    });
  });

  it('should have correct initial state', () => {
    const { result: result1 } = renderHook(useToggle, {
      initialProps: true,
    });
    const { result: result2 } = renderHook(useToggle, {
      initialProps: false,
    });

    expect(result1.current[0]).toEqual(true);
    expect(result2.current[0]).toEqual(false);
  });

  it('should switch the value when calling toggle', () => {
    const { result } = renderHook(useToggle, {
      initialProps: false,
    });
    expect(result.current[0]).toEqual(false);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toEqual(true);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toEqual(false);
  });

  it('should set the value explicitly', () => {
    const { result } = renderHook(useToggle, {
      initialProps: false,
    });
    expect(result.current[0]).toEqual(false);

    act(() => {
      result.current[1](false);
    });
    expect(result.current[0]).toEqual(false);

    act(() => {
      result.current[1](true);
    });
    expect(result.current[0]).toEqual(true);

    act(() => {
      result.current[1](true);
    });
    expect(result.current[0]).toEqual(true);
  });
});

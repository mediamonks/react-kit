import { renderHook } from '@testing-library/react';
import { describe, it, vitest, expect } from 'vitest';
import { useUpdateEffect } from './useUpdateEffect.js';

describe('useUpdateEffect', () => {
  it('callback function should have been called on update', () => {
    const effect = vitest.fn();
    const { rerender } = renderHook(() => {
      useUpdateEffect(effect);
    });

    expect(effect).not.toHaveBeenCalled();

    rerender();

    expect(effect).toHaveBeenCalledTimes(1);
  });
});

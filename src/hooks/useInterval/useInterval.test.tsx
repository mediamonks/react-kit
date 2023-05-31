import { renderHook } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { useInterval } from './useInterval.js';

describe('useInterval', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should not crash', async () => {
    renderHook(() => {
      useInterval(
        // eslint-disable-next-line unicorn/no-useless-undefined
        () => undefined,
      );
    });
  });

  it('should not call callback immediately', () => {
    const spy = vi.fn();

    renderHook(() => {
      useInterval(spy);
    });

    expect(spy).not.toHaveBeenCalled();
  });

  it('should call callback after time passed', async () => {
    const spy = vi.fn();

    renderHook(() => {
      useInterval(spy, 500);
    });

    await vi.advanceTimersByTimeAsync(501);

    expect(spy).toHaveBeenCalled();
  });

  it('should not call callback after time passed', async () => {
    const spy = vi.fn();

    renderHook(() => {
      useInterval(spy, 500, false);
    });

    await vi.advanceTimersByTimeAsync(501);

    expect(spy).not.toHaveBeenCalled();
  });
});

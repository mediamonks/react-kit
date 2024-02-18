import { renderHook } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { useMount } from '../useMount/useMount.js';
import { useBeforeMount } from './useBeforeMount.js';

describe('useBeforeMount', () => {
  it('should not crash', async () => {
    renderHook(() => {
      useBeforeMount(
        // eslint-disable-next-line no-empty-function
        () => {},
      );
    });
  });

  it('should execute a callback on first render', async () => {
    const spy = vi.fn();
    renderHook(() => {
      useBeforeMount(spy);
    });
    expect(spy).toBeCalledTimes(1);
  });

  it('should execute during synchronous render, before mount', async () => {
    const beforeMount = vi.fn();
    const inlineSpy = vi.fn();
    const mountedSpy = vi.fn();
    renderHook(() => {
      useEffect(() => {
        mountedSpy();
      }, []);

      useBeforeMount(beforeMount);

      inlineSpy();
    });

    expect(beforeMount).toBeCalledTimes(1);
    expect(mountedSpy).toBeCalledTimes(1);
    expect(inlineSpy).toBeCalledTimes(1);
    expect(beforeMount.mock.invocationCallOrder[0]).toBeLessThan(
      mountedSpy.mock.invocationCallOrder[0],
    );
    expect(beforeMount.mock.invocationCallOrder[0]).toBeLessThan(
      inlineSpy.mock.invocationCallOrder[0],
    );
  });

  it('should not execute a callback on re-renders', async () => {
    const spy = vi.fn();
    const { rerender } = renderHook(() => {
      useBeforeMount(spy);
    });
    expect(spy).toBeCalledTimes(1);

    await Promise.resolve();
    rerender();
    expect(spy).toBeCalledTimes(1);

    await Promise.resolve();
    rerender();
    expect(spy).toBeCalledTimes(1);
  });

  it('should only execute once when setState is called during useMount', async () => {
    const spy = vi.fn();
    const { rerender } = renderHook(() => {
      // eslint-disable-next-line react/hook-use-state
      const [, setState] = useState(false);

      useBeforeMount(spy);

      useMount(() => {
        setState(true);
      });
    });
    expect(spy).toBeCalledTimes(1);

    await Promise.resolve();
    rerender();
    expect(spy).toBeCalledTimes(1);
  });
});

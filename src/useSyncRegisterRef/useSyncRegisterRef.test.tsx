import { act, renderHook } from '@testing-library/react';
import { jest } from '@jest/globals';
import { useSyncRegisterRef } from './useSyncRegisterRef';

describe('useSyncRegisterRef', () => {
  it('should not crash', async () => {
    renderHook(({ refs, key, forwardedRef }) => useSyncRegisterRef(refs, key, forwardedRef), {
      initialProps: {
        refs: { element: 'Element' },
        key: 'element' as const,
        forwardedRef: (ref: any) => undefined,
      },
    });
  });

  it('should have correct initial state', () => {
    const refs = { element: 'Element' };
    const forwardedRef = jest.fn();
    renderHook(({ refs, key, forwardedRef }) => useSyncRegisterRef(refs, key, forwardedRef), {
      initialProps: {
        refs,
        key: 'element' as const,
        forwardedRef,
      },
    });

    expect(forwardedRef).toHaveBeenCalledWith('Element');
  });

  it('should update the forwardRef when the ref is changed', async () => {
    type Refs = {
      element: string | null;
    };
    let refs: Refs = { element: null };
    const forwardedRef = jest.fn();

    const { rerender } = renderHook(
      ({ refs, key, forwardedRef }) => useSyncRegisterRef(refs, key, forwardedRef),
      {
        initialProps: {
          refs,
          key: 'element' as const,
          forwardedRef,
        },
      },
    );

    expect(forwardedRef).toHaveBeenCalledWith(null);

    // change the ref
    refs = { ...refs, element: 'Element' };

    await rerender({
      refs,
      key: 'element' as const,
      forwardedRef: forwardedRef,
    });

    expect(forwardedRef).toHaveBeenCalledWith('Element');
  });

  it('should update the forwardRef when the forwardRef is changed', async () => {
    type Refs = {
      element: string | null;
    };
    let refs: Refs = { element: 'Element' };
    let forwardedRef = jest.fn();
    const { rerender } = renderHook(
      ({ refs, key, forwardedRef }) => useSyncRegisterRef(refs, key, forwardedRef),
      {
        initialProps: {
          refs,
          key: 'element' as const,
          forwardedRef,
        },
      },
    );

    expect(forwardedRef).toHaveBeenCalledWith('Element');

    // change the forwardRef
    forwardedRef = jest.fn();

    await rerender({
      refs,
      key: 'element' as const,
      forwardedRef: forwardedRef,
    });

    expect(forwardedRef).toHaveBeenCalledWith('Element');
  });
});

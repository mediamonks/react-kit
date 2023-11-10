import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useIsMountedState } from './useIsMountedState.js';

describe('useIsMountedState', () => {
  it('should not crash', async () => {
    await act(async () => {
      renderHook(() => useIsMountedState());
    });
  });

  it('should update after rendering', async () => {
    const spy = vi.fn();

    const {
      result: { current: isMounted },
    } = await act(async () =>
      renderHook(() => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const isMounted = useIsMountedState();

        // this hook automatically re-renders because the `useIsMountedState` hook uses `useEffect`
        // to update its state, so we need to capture the value _before_ the useEffect is executed.
        spy(isMounted);

        return isMounted;
      }),
    );

    expect(isMounted).toBe(true);
    expect(spy).toBeCalledTimes(2);
    expect(spy).toHaveBeenNthCalledWith(1, false);
    expect(spy).toHaveBeenNthCalledWith(2, true);
  });
});

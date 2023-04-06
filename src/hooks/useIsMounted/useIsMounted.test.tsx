import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useEffect } from 'react';
import { useUnmount } from '../useUnmount/useUnmount.js';
import { useIsMounted } from './useIsMounted.js';

describe('useIsMounted', () => {
  it('should not crash', async () => {
    renderHook(() => useIsMounted());
  });

  it('should return false on first render, before mounting', async () => {
    const {
      result: { current: isMounted },
    } = renderHook(() => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const isMounted = useIsMounted();

      // special setup to capture this value _before_ the useEffect is executed and the ref is set
      return isMounted.current;
    });

    expect(isMounted).toBe(false);
  });

  it('should return false on first useEffect execution, before mounting', async () => {
    const spy = jest.fn();

    const {
      result: { current: isMounted },
    } = renderHook(() => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const isMounted = useIsMounted();

      useEffect(() => {
        spy(isMounted.current);
      }, [isMounted]);

      // special setup to capture this value _before_ the useEffect is executed and the ref is set
      return isMounted.current;
    });

    expect(isMounted).toBe(false);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(false);
  });

  it('should return true on second render, after mounting', async () => {
    const { result, rerender } = renderHook(() => useIsMounted());

    await Promise.resolve();
    rerender();
    expect(result.current.current).toBe(true);
  });

  it('should return false on third render, after unmounting', async () => {
    const { result, rerender, unmount } = renderHook(() => useIsMounted());

    rerender();
    unmount();
    expect(result.current.current).toBe(false);
  });

  it('should be false during cleanup of the unmount', async () => {
    const duringCleanupSpy = jest.fn();
    const { rerender, unmount } = renderHook(() => {
      const isMounted = useIsMounted();

      useUnmount(() => {
        duringCleanupSpy(isMounted.current);
      });
    });

    rerender();
    unmount();
    expect(duringCleanupSpy).toBeCalledTimes(1);
    expect(duringCleanupSpy).toBeCalledWith(false);
  });

  it('should be true during cleanup of in between renders', async () => {
    const duringCleanupSpy = jest.fn();
    const { rerender, unmount } = renderHook(() => {
      const isMounted = useIsMounted();

      useEffect(() => (): void => {
        duringCleanupSpy(isMounted.current);
      });
    });

    await Promise.resolve();
    rerender();
    expect(duringCleanupSpy).toBeCalledTimes(1);
    expect(duringCleanupSpy).toBeCalledWith(true);

    await Promise.resolve();
    unmount();
    expect(duringCleanupSpy).toBeCalledTimes(2);
    expect(duringCleanupSpy).toBeCalledWith(false);
  });
});

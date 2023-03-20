import { renderHook } from '@testing-library/react';
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

  it('should return true on second render, after mounting', async () => {
    const { result, rerender } = renderHook(() => useIsMounted());

    rerender();
    expect(result.current.current).toBe(true);
  });

  it('should return false on third render, after unmounting', async () => {
    const { result, rerender, unmount } = renderHook(() => useIsMounted());

    rerender();
    unmount();
    expect(result.current.current).toBe(false);
  });
});

import { renderHook } from '@testing-library/react';
import { useUpdate } from './useUpdate';

describe('useUpdate', () => {
  it('should not crash', async () => {
    const { result } = renderHook(useUpdate);

    expect(await result.current()).toEqual(undefined);
  });
});

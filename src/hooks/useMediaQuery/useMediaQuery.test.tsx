import { renderHook } from '@testing-library/react';
import { useMediaQuery } from './useMediaQuery.js';

describe('useMediaQuery', () => {
  it('should not crash', async () => {
    renderHook(useMediaQuery, {
      initialProps: undefined,
    });
  });
});

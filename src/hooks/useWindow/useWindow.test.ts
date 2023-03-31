import { renderHook } from '@testing-library/react';
import { useWindow } from './useWindow.js';

describe('useWindow', () => {
  it('Should return the window', () => {
    const result = renderHook(useWindow);

    expect(result.result.current).toBe(window);
  });
});

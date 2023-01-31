import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useWindowEventListener } from './useWindowEventListener.js';

describe('useWindowEventListener', () => {
  it('should not crash', async () => {
    const spy = jest.fn();

    renderHook(() => {
      useWindowEventListener('resize', () => {
        spy();

        // eslint-disable-next-line no-console
        console.log('window resized');
      });
    });

    expect(spy).not.toHaveBeenCalled();
  });
});

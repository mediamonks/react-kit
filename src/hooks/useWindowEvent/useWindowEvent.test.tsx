import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useWindowEvent } from './useWindowEvent.js';

describe('useWindowEvent', () => {
  it('should not crash', async () => {
    const spy = jest.fn();

    renderHook(() => {
      useWindowEvent('resize', () => {
        spy();

        // eslint-disable-next-line no-console
        console.log('window resized');
      });
    });

    expect(spy).not.toHaveBeenCalled();
  });
});

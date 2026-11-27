import { jest } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { useAnimationLoop } from './useAnimationLoop.js';

describe('useAnimationLoop', () => {
  it('should not crash', async () => {
    renderHook(useAnimationLoop, {
      initialProps: undefined,
    });
  });

  it('should not execute the callback function when enabled is set to false', async () => {
    const spy = jest.fn();

    renderHook(
      ({ callback }) => {
        useAnimationLoop(callback, false);
      },
      {
        initialProps: {
          callback: spy,
        },
      },
    );

    await waitFor(() => {
      expect(spy).toBeCalledTimes(0);
    });
  });

  it('should execute the callback function when useAnimationLoop is enabled', async () => {
    const spy = jest.fn();

    renderHook(
      ({ callback }) => {
        useAnimationLoop(callback);
      },
      {
        initialProps: {
          callback: spy,
        },
      },
    );

    await waitFor(() => {
      expect(spy).toBeCalled();
    });
  });

  it('should not execute previous callback function when callback function is updated', async () => {
    const spyFirstRender = jest.fn();
    const spySecondRender = jest.fn();

    const { rerender } = renderHook(
      ({ callback }) => {
        useAnimationLoop(callback);
      },
      {
        initialProps: {
          callback: spyFirstRender,
        },
      },
    );

    await waitFor(() => {
      expect(spyFirstRender).toBeCalled();
      expect(spySecondRender).toBeCalledTimes(0);
    });

    rerender({ callback: spySecondRender });
    const amountOfCalls = spyFirstRender.mock.calls.length;

    await waitFor(() => {
      expect(spyFirstRender).toBeCalledTimes(amountOfCalls);
      expect(spySecondRender).toBeCalled();
    });
  });

  it('should execute the callback function when useAnimationLoop is enabled and should not execute the callback function when useAnimationLoop is disabled', async () => {
    const spy = jest.fn();

    const { rerender } = renderHook(
      ({ callback, enabled }) => {
        useAnimationLoop(callback, enabled);
      },
      {
        initialProps: {
          callback: spy,
          enabled: true,
        },
      },
    );

    await waitFor(() => {
      expect(spy).toBeCalled();
    });

    rerender({ callback: spy, enabled: false });

    const amountOfCalls = spy.mock.calls.length;

    await waitFor(() => {
      expect(spy).toBeCalledTimes(amountOfCalls);
    });
  });
});

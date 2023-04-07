import { jest } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { useAnimationLoop } from './useAnimationLoop.js';

describe('useAnimationLoop', () => {
  it('should not crash', async () => {
    renderHook(useAnimationLoop, {
      initialProps: undefined,
    });
  });

  it('should not execute the callback function when enabled is not passed', async () => {
    const spy = jest.fn();
    renderHook(
      ({ callback }) => {
        useAnimationLoop(callback);
      },
      {
        initialProps: {
          callback: () => {
            spy();
          },
        },
      },
    );

    waitFor(() => {
      expect(spy).toBeCalledTimes(0);
    });
  });

  it('should execute the callback function when useAnimationLoop is enabled', async () => {
    const spy = jest.fn();
    renderHook(
      ({ callback, enabled }) => {
        useAnimationLoop(callback, enabled);
      },
      {
        initialProps: {
          callback: () => {
            spy();
          },
          enabled: true,
        },
      },
    );

    expect(spy).toBeCalledTimes(0);
    await waitFor(() => {
      expect(spy).toBeCalled();
    });
  });

  it('should execute another callback function when it is passed to useAnimationLoop and not execute previously passed callback function', async () => {
    const spyFirstRender = jest.fn();
    const spySecondRender = jest.fn();
    const { rerender } = renderHook(
      ({ callback, enabled }) => {
        useAnimationLoop(callback, enabled);
      },
      {
        initialProps: {
          callback: () => {
            spyFirstRender();
          },
          enabled: true,
        },
      },
    );

    await waitFor(() => {
      expect(spyFirstRender).toBeCalled();
      expect(spySecondRender).toBeCalledTimes(0);
    });

    rerender({ callback: spySecondRender, enabled: true });
    const amountOfCalls = spyFirstRender.mock.calls.length;
    await waitFor(() => {
      expect(spyFirstRender).toBeCalledTimes(amountOfCalls);
      expect(spySecondRender).toBeCalled();
    });
  });

  it('should execute the callback function when useAnimationLoop is enabled on the first render and should not execute the callback function when useAnimationLoop is disabled on the second render', async () => {
    const spy = jest.fn();
    const { rerender } = renderHook(
      ({ callback, enabled }) => {
        useAnimationLoop(callback, enabled);
      },
      {
        initialProps: {
          callback: () => {
            spy();
          },
          enabled: true,
        },
      },
    );

    waitFor(() => {
      expect(spy).toBeCalled();
    });

    rerender({ callback: spy, enabled: false });
    waitFor(() => {
      expect(spy).toBeCalledTimes(0);
    });
  });
});

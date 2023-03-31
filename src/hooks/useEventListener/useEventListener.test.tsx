/* eslint-disable react/no-multi-comp */
import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { createRef, useEffect, useState, type ReactElement } from 'react';
import { useEventListener } from './useEventListener.js';

describe('useEventListener', () => {
  it('Should listen to event attached to element from RefObject', () => {
    const spy = jest.fn();
    const ref = createRef<HTMLDivElement>();

    function Test(): ReactElement {
      useEventListener(ref, 'click', spy);

      return <div ref={ref} />;
    }

    render(<Test />);

    ref.current?.click();

    expect(spy).toBeCalledTimes(1);
  });

  it('Should listen to event attached to element from state', async () => {
    const spy = jest.fn();
    let exposedRef: HTMLDivElement | null = null;

    function Test(): ReactElement {
      const [ref, setRef] = useState<HTMLDivElement | null>(null);

      useEffect(() => {
        exposedRef = ref;
      }, [ref]);

      useEventListener(ref, 'click', spy);

      return <div ref={setRef} />;
    }

    render(<Test />);

    // @ts-expect-error typescript doesn't infer type for exposedRef correctly
    exposedRef?.click();

    expect(spy).toBeCalledTimes(1);
  });
});

import { jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { createRef, type MutableRefObject } from 'react';
import { ensuredForwardRef } from './ensuredForwardRef.js';

describe('ensuredForwardRef', () => {
  it('should store ref in refObject', () => {
    const TestComponent = ensuredForwardRef<HTMLDivElement>((_, ref) => (
      <div ref={ref} data-testid="test" />
    ));

    const ref: MutableRefObject<HTMLDivElement | null> = {
      current: null,
    };

    const { getByTestId } = render(<TestComponent ref={ref} />);
    expect(getByTestId('test')).toEqual(ref.current);
  });

  it('should accept ref functions', () => {
    const TestComponent = ensuredForwardRef<HTMLDivElement>((_, ref) => (
      <div ref={ref} data-testid="test" />
    ));

    let ref1: HTMLDivElement | null = null;

    const ref1Function = jest.fn((ref: HTMLDivElement | null) => {
      ref1 = ref;
    });

    // First render
    const { getByTestId, rerender, unmount } = render(<TestComponent ref={ref1Function} />);
    expect(ref1).toEqual(getByTestId('test'));

    let ref2: HTMLDivElement | null = null;

    const ref2Function = jest.fn((ref: HTMLDivElement | null) => {
      ref2 = ref;
    });

    // New instance with key update
    rerender(<TestComponent ref={ref2Function} key="rerender" />);
    expect(ref1).toEqual(null);
    expect(ref2).toEqual(getByTestId('test'));

    // Sets ref to null
    unmount();
    expect(ref2).toEqual(null);
  });

  it('should update ref when no ref object/ref function is provided', () => {
    // eslint-disable-next-line no-underscore-dangle
    let _ref: MutableRefObject<HTMLDivElement | null> = createRef();

    const Component = ensuredForwardRef<HTMLDivElement>((_, ref) => {
      _ref = ref;

      return <div ref={ref} data-testid="test" />;
    });

    const result = render(<Component />);

    expect(_ref.current).toEqual(result.getByTestId('test'));
  });

  it('should not break when passing undefined as a ref', () => {
    // eslint-disable-next-line no-underscore-dangle
    let _ref: MutableRefObject<HTMLDivElement | null> = createRef();

    const Component = ensuredForwardRef<HTMLDivElement>((_, ref) => {
      _ref = ref;

      return <div ref={ref} data-testid="test" />;
    });

    // Note; even though it passes undefined, it's still passed as `null`
    // when the ensuredForwardRef is called. So this test doesn't do much.
    const result = render(<Component ref={undefined} />);

    expect(_ref.current).toEqual(result.getByTestId('test'));
  });
});

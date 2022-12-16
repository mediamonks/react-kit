import { render } from '@testing-library/react';
import type { MutableRefObject } from 'react';
import { ensuredForwardRef } from './ensuredForwardRef';

const TestComponent = ensuredForwardRef<HTMLDivElement>((_, ref) => {
  if (!('current' in ref)) {
    throw new Error('ref is not a RefObject');
  }

  return <div ref={ref} data-testid="test" />;
});

describe('ensuredForwardRef', () => {
  it('should not crash', () => {
    render(<TestComponent />);
  });

  it('should store ref in refObject', () => {
    const ref: MutableRefObject<HTMLDivElement | null> = {
      current: null,
    };

    const { getByTestId } = render(<TestComponent ref={ref} />);
    expect(getByTestId('test')).toEqual(ref.current);
  });

  it('should accept ref functions', () => {
    let ref1: HTMLDivElement | null = null;

    const ref1Function = jest.fn((_ref: HTMLDivElement | null) => {
      ref1 = _ref;
    });

    // First render
    const { getByTestId, rerender, unmount } = render(<TestComponent ref={ref1Function} />);
    expect(ref1).toEqual(getByTestId('test'));

    let ref2: HTMLDivElement | null = null;

    const ref2Function = jest.fn((_ref: HTMLDivElement | null) => {
      ref2 = _ref;
    });

    // New instance with key update
    rerender(<TestComponent ref={ref2Function} key="rerender" />);
    expect(ref1).toEqual(null);
    expect(ref2).toEqual(getByTestId('test'));

    // Sets ref to null
    unmount();
    expect(ref2).toEqual(null);
  });
});

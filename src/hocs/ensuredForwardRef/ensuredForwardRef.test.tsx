import { render } from '@testing-library/react';
import { createRef, type MutableRefObject } from 'react';
import { describe, expect, it, vi } from 'vitest';
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

    const ref1Function = vi.fn((_ref: HTMLDivElement | null) => {
      ref1 = _ref;
    });

    // First render
    const { getByTestId, rerender, unmount } = render(<TestComponent ref={ref1Function} />);
    expect(ref1).toEqual(getByTestId('test'));

    let ref2: HTMLDivElement | null = null;

    const ref2Function = vi.fn((ref: HTMLDivElement | null) => {
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
    let ref1: MutableRefObject<HTMLDivElement | null> = createRef();

    const Component = ensuredForwardRef<HTMLDivElement>((_, ref) => {
      ref1 = ref;

      return <div ref={ref} data-testid="test" />;
    });

    const result = render(<Component />);

    expect(ref1.current).toEqual(result.getByTestId('test'));
  });

  it('should not break when passing undefined as a ref', () => {
    let ref1: MutableRefObject<HTMLDivElement | null> = createRef();

    const Component = ensuredForwardRef<HTMLDivElement>((_, ref) => {
      ref1 = ref;

      return <div ref={ref} data-testid="test" />;
    });

    // Note; even though it passes undefined, it's still passed as `null`
    // when the ensuredForwardRef is called. So this test doesn't do much.
    const result = render(<Component ref={undefined} />);

    expect(ref1.current).toEqual(result.getByTestId('test'));
  });
});

/* eslint-disable react/jsx-no-literals */
/* eslint-disable react/no-multi-comp */
import { act, render, waitFor } from '@testing-library/react';
import { useRef, type ReactElement } from 'react';
import { useHasFocus } from './useHasFocus.js';

describe('useHasFocus', () => {
  it('should not crash', async () => {
    function TestComponent(): ReactElement {
      const ref = useRef<HTMLDivElement>(null);
      const hasFocus = useHasFocus(ref);

      return <div ref={ref}>{hasFocus && <div data-testid="focus" />}</div>;
    }

    const result = render(<TestComponent />);

    expect(result.queryByTestId('focus')).not.toBeInTheDocument();
  });

  it('should update when element has focus within', async () => {
    function TestComponent(): ReactElement {
      const ref = useRef<HTMLButtonElement>(null);
      const hasFocus = useHasFocus(ref, ':focus');

      return (
        <div>
          <button type="button" data-testid="button" ref={ref}>
            Click me
          </button>

          {hasFocus && <div data-testid="focus" />}
        </div>
      );
    }

    const result = render(<TestComponent />);

    await act(() => {
      result.getByTestId('button').focus();
    });

    expect(result.queryByTestId('focus')).toBeInTheDocument();
  });
});

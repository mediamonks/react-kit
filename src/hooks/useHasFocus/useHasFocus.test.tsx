/* eslint-disable react/jsx-no-literals */
/* eslint-disable react/no-multi-comp */
import { render, waitFor } from '@testing-library/react';
import { type ReactElement, useRef } from 'react';
import { useHasFocus } from './useHasFocus.js';

describe('useHasFocus', () => {
  it('should not crash', async () => {
    function TestComponent(): ReactElement {
      const ref = useRef<HTMLDivElement>(null);
      const hasFocus = useHasFocus(ref);

      return <div ref={ref}>{hasFocus && <div data-testid="focus" />}</div>;
    }

    const result = render(<TestComponent />);

    await waitFor(() => {
      expect(result.queryByTestId('focus')).toBeNull();
    });
  });

  it('should update when element has focus within', async () => {
    function TestComponent(): ReactElement {
      const ref = useRef<HTMLDivElement>(null);
      const hasFocus = useHasFocus(ref);

      return (
        <div ref={ref}>
          <button type="button" data-testid="button">
            Click me
          </button>

          {hasFocus && <div data-testid="focus" />}
        </div>
      );
    }

    const result = render(<TestComponent />);

    await waitFor(() => {
      result.getByTestId('button').focus();

      expect(result.queryByTestId('focus')).toBeDefined();
    });
  });
});

/* eslint-disable react/no-multi-comp, react/jsx-no-literals */
import { jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import { useRef, type ReactElement } from 'react';
import { useClickedOutside } from './useClickedOutside.js';

describe('useClickedOutside', () => {
  it('should call the callback function when clicked outside of the element', () => {
    const callback = jest.fn();

    function MyComponent(): ReactElement {
      const ref = useRef(null);
      useClickedOutside(ref, callback);

      return (
        <div ref={ref} style={{ inlineSize: 100, blockSize: 100 }}>
          My Component
        </div>
      );
    }

    render(<MyComponent />);

    fireEvent.click(document.body, { clientX: 150, clientY: 150 });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should call the callback function when clicked inside of the element', () => {
    const callback = jest.fn();

    function MyComponent(): ReactElement {
      const ref = useRef(null);
      useClickedOutside(ref, callback);

      return (
        <div ref={ref} style={{ inlineSize: 100, blockSize: 100 }}>
          My Component
        </div>
      );
    }

    render(<MyComponent />);

    fireEvent.click(document.body, { clientX: 50, clientY: 50 });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(expect.objectContaining({ clientX: 50, clientY: 50 }));
  });

  it('should call the callback function when clicked inside of the element stored in state', () => {
    const callback = jest.fn();

    function MyComponent(): ReactElement {
      const ref = useRef(null);
      useClickedOutside(ref, callback);

      return (
        <div ref={ref} style={{ inlineSize: 100, blockSize: 100 }}>
          My Component
        </div>
      );
    }

    render(<MyComponent />);

    fireEvent.click(document.body, { clientX: 50, clientY: 50 });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(expect.objectContaining({ clientX: 50, clientY: 50 }));
  });
});

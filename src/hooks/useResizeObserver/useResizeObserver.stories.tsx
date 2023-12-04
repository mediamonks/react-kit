/* eslint-disable react/jsx-no-literals, react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useRef, useState } from 'react';
import { useToggle } from '../useToggle/useToggle.js';
import { useResizeObserver } from './useResizeObserver.js';

const meta = {
  title: 'Hooks / useResizeObserver',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render() {
    const [enabled, onClick] = useToggle(true);

    const elementRef = useRef<HTMLDivElement>(null);
    const [elementRefWidth, setElementRefWidth] = useState(Number.NaN);

    const [element, setElement] = useState<HTMLDivElement | null>(null);
    const [elementWidth, setElementWidth] = useState(Number.NaN);

    const onResizeElementRef = useCallback(() => {
      setElementRefWidth(elementRef.current?.clientWidth ?? Number.NaN);
    }, []);

    const onResizeElement = useCallback(() => {
      setElementWidth(element?.clientWidth ?? Number.NaN);
    }, [element?.clientWidth]);

    useResizeObserver(elementRef, enabled ? onResizeElementRef : undefined);
    useResizeObserver(element, enabled ? onResizeElement : undefined);

    return (
      <>
        <h4>Resize the window to update the width of the elements</h4>
        <div ref={elementRef} style={{ outline: '1px solid red', marginBlock: 20 }}>
          Enabled: {enabled.toString()};<br />
          Width: {elementRefWidth};
        </div>
        <div ref={setElement} style={{ outline: '1px solid red', marginBlock: 20 }}>
          Enabled: {enabled.toString()};<br />
          Width: {elementWidth};
        </div>
        <button
          type="button"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={(): void => {
            onClick();
          }}
        >
          Toggle enabled
        </button>
      </>
    );
  },
};

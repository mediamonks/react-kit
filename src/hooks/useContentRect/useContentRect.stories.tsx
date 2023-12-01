/* eslint-disable react/jsx-no-literals, react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';
import { useForceRerender } from '../../index.js';
import { useContentRect } from './useContentRect.js';

const meta = {
  title: 'Hooks / useContentRect',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const UseContentRect: Story = {
  render() {
    const onClick = useForceRerender();
    const ref = useRef<HTMLDivElement>(null);
    const contentRectRef = useContentRect(ref);

    useEffect(() => {
      const animation = ref.current?.animate(
        [
          // keyframes
          { inlineSize: '300px', blockSize: '300px' },
          { inlineSize: '500px', blockSize: '500px' },
          { inlineSize: '300px', blockSize: '300px' },
        ],
        {
          // timing options
          duration: 2000,
          iterations: Number.POSITIVE_INFINITY,
        },
      );

      return () => animation?.cancel();
    }, []);

    return (
      <>
        <h4>
          Element size:{' '}
          <button type="button" onClick={onClick}>
            Rerender
          </button>
        </h4>
        <div
          ref={ref}
          style={{
            outline: '1px solid red',
            padding: 18,
            marginBlock: 20,
          }}
        >
          <code
            style={{
              display: 'block',
              whiteSpace: 'pre',
            }}
          >
            {JSON.stringify(contentRectRef.current, null, 2)}
          </code>
        </div>
      </>
    );
  },
};

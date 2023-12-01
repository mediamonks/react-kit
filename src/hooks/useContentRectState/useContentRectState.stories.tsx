/* eslint-disable react/jsx-no-literals, react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';
import { useContentRectState } from './useContentRectState.js';

const meta = {
  title: 'Hooks / useContentRectState',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const UseContentRectState: Story = {
  render() {
    const ref = useRef<HTMLDivElement>(null);
    const contentRect = useContentRectState(ref);

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
        <h4>Element size:</h4>
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
            {JSON.stringify(contentRect, null, 2)}
          </code>
        </div>
      </>
    );
  },
};

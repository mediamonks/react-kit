/* eslint-disable react/jsx-no-literals */
import type { Meta, StoryObj } from '@storybook/react';
import { type ReactElement, useRef, useState, useCallback } from 'react';
import { useMutationObserver } from './useMutationObserver.js';

const meta = {
  title: 'Hooks / useMutationObserver',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function DemoComponent(): ReactElement {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLUListElement>(null);

  useMutationObserver(
    ref,
    () => {
      // eslint-disable-next-line no-console
      console.log('Child added');
    },
    {
      childList: true,
    },
  );

  const onClick = useCallback(() => {
    setCount((previousCount) => previousCount + 1);
  }, []);

  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">
          When clicking the button a child is added, triggering the callback passed to the
          MutationObserver (check the console).
        </p>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        // eslint-disable-next-line react/jsx-no-bind
        onClick={onClick}
      >
        Add child
      </button>
      <div className="card border-dark" style={{ marginBlock: 20 }}>
        <div className="card-header">Test Area</div>
        <div className="card-body">
          <ul ref={ref}>
            {Array.from({ length: count }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>Child {index}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export const Demo: Story = {
  render() {
    return <DemoComponent />;
  },
};

/* eslint-disable react/jsx-no-literals */
import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ReactElement, useCallback, useEffect } from 'react';
import { useUpdateEffect } from './useUpdateEffect.js';

const meta = {
  title: 'Hooks / useUpdateEffect',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function DemoComponent(): ReactElement {
  const [date, setDate] = useState<number>();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Normal useEffect', date);
  }, [date]);

  useUpdateEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Update useUpdateEffect only', date);
  }, [date]);

  const onClick = useCallback(() => {
    setDate(Date.now());
  }, []);

  return (
    <div>
      <div>
        <p>Open your console</p>
        <p>
          Value: <span className="badge rounded-pill bg-primary">{date ? 'true' : 'false'}</span>
        </p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button type="button" onClick={onClick} className="btn btn-primary">
          Update
        </button>
      </div>
    </div>
  );
}

export const Demo: Story = {
  render() {
    return <DemoComponent />;
  },
};

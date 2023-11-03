/* eslint-disable react-hooks/rules-of-hooks, react/jsx-no-literals */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useRafCallback } from './useRafCallback.js';

const meta = {
  title: 'Hooks / useRafCallback',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render() {
    const [time, setTime] = useState(0);
    const onUpdate = useRafCallback(setTime);

    return (
      <div>
        <div className="alert alert-primary">
          <h4 className="alert-heading">Instructions!</h4>
          <p className="mb-0">Click the button to update the time in the next frame.</p>
        </div>
        <div>
          Value: <span className="badge rounded-pill bg-primary">{time}</span>
        </div>
        <div className="card border-dark" style={{ marginBlockStart: 20 }}>
          <div className="card-header">Test Area</div>
          <div className="card-body">
            <button type="button" onClick={onUpdate} className="btn btn-primary">
              Update time
            </button>
          </div>
        </div>
      </div>
    );
  },
};

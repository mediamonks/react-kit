/* eslint-disable react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import { useState, type ReactElement } from 'react';
import { useToggle } from '../useToggle/useToggle.js';
import { useAnimationLoop } from './useAnimationLoop.js';

export default {
  title: 'hooks/useAnimationLoop',
};

function DemoComponent(): ReactElement {
  const [timestamp, setTimestamp] = useState(0);
  const [delta, setDelta] = useState(0);
  const [isRunning, toggleIsRunning] = useToggle(true);

  useAnimationLoop((_timestamp: DOMHighResTimeStamp) => {
    setDelta(_timestamp - timestamp);
    setTimestamp(_timestamp);
  }, isRunning);

  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">Click on the button to toggle the animation loop</p>
      </div>
      <div className="card border-dark" data-ref="test-area">
        <div className="card-header">Test Area</div>
        <div className="card-body">
          <p>Timestamp: {timestamp}</p>
          <p>Delta: {delta}</p>

          <button
            type="button"
            // eslint-disable-next-line react/jsx-handler-names, react/jsx-no-bind
            onClick={(): void => {
              toggleIsRunning();
            }}
          >
            Toggle animation loop
          </button>
        </div>
      </div>
    </div>
  );
}

export const Demo: StoryObj = {
  render() {
    return <DemoComponent />;
  },
};

/* eslint-disable react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import { useState, type ReactElement } from 'react';
import { useToggle } from '../useToggle/useToggle.js';
import { useAnimationLoop } from './useAnimationLoop.js';

export default {
  title: 'hooks/useAnimationLoop',
};

function DemoComponent(): ReactElement {
  const [currentTimestamp, setCurrentTimestamp] = useState(Date.now);
  const [state, toggle] = useToggle(true);
  useAnimationLoop(() => {
    setCurrentTimestamp(Date.now);
  }, state);

  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">Click on the button to toggle the animation loop</p>
      </div>
      <div className="card border-dark" data-ref="test-area">
        <div className="card-header">Test Area</div>
        <div className="card-body">
          <p>{currentTimestamp}</p>

          <button
            type="button"
            // eslint-disable-next-line react/jsx-handler-names, react/jsx-no-bind
            onClick={(): void => {
              toggle();
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

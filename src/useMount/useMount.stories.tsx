import type { StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useMount } from './useMount';

export default {
  title: 'useMount',
};

function ChildComponent() {
  useMount(() => {
    console.log('mounted');
  });
  return <div>I'm here!</div>;
}

type DemoComponentProps = {};
function DemoComponent({}: DemoComponentProps) {
  const [render, setRender] = useState(false);

  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">
          Open your console, you should see a <code>mounted</code> log when the component is
          mounted.
        </p>
      </div>
      <div className="card border-dark" data-ref="test-area">
        <div className="card-header">Test Area</div>
        <div className="card-body">
          <button
            type="button"
            className={`btn btn-${render ? 'danger' : 'primary'}`}
            onClick={() => setRender((oldValue) => !oldValue)}
          >
            {render ? 'Unmount' : 'Re-mount'}
          </button>
          {render && <ChildComponent />}
        </div>
      </div>
    </div>
  );
}
export const Demo: StoryObj<DemoComponentProps> = {
  render(args) {
    return <DemoComponent {...args} />;
  },
  name: 'demo',
  args: {
    initialValue: true,
  },
};

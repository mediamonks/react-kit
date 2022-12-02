import type { StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useUnmount } from './useUnmount';

export default {
  title: 'useUnmount',
};

function ChildComponent() {
  useUnmount(() => {
    console.log('unmounted');
  });
  return <div>I'm here!</div>;
}

type DemoComponentProps = {};
function DemoComponent({}: DemoComponentProps) {
  const [render, setRender] = useState(true);

  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">
          Open your console, you should see a <code>unmounted</code> log when the component is
          unmounted.
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

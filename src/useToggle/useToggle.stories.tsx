import type { StoryObj } from '@storybook/react';
import { useToggle } from './useToggle';

export default {
  title: 'useToggle',
};

type DemoComponentProps = {
  initialValue?: boolean;
};
function DemoComponent({ initialValue = false }: DemoComponentProps) {
  const [state, toggle] = useToggle(initialValue);

  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">When clicking the buttons, the value should update accordingly.</p>
      </div>
      <div>
        Value: <span className="badge rounded-pill bg-primary">{state ? 'true' : 'false'}</span>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button type="button" onClick={() => toggle()} className="btn btn-primary">
          Toggle
        </button>
        &nbsp;
        <button type="button" onClick={() => toggle(true)} className="btn btn-success">
          Enable
        </button>
        &nbsp;
        <button type="button" onClick={() => toggle(false)} className="btn btn-danger">
          Disable
        </button>
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

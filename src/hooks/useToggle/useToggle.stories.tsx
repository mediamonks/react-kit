/* eslint-disable react/jsx-no-bind, react/no-multi-comp, react/jsx-no-literals */
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';
import { useToggle } from './useToggle.js';

const meta = {
  title: 'Hooks / useToggle',
  args: {
    initialValue: false,
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

type DemoComponentProps = {
  initialValue?: boolean;
};

function DemoComponent({ initialValue = false }: DemoComponentProps): ReactElement {
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
        <button
          type="button"
          onClick={(): void => {
            toggle();
          }}
          className="btn btn-primary"
        >
          Toggle
        </button>
        &nbsp;
        <button
          type="button"
          onClick={(): void => {
            toggle(true);
          }}
          className="btn btn-success"
        >
          Enable
        </button>
        &nbsp;
        <button
          type="button"
          onClick={(): void => {
            toggle(false);
          }}
          className="btn btn-danger"
        >
          Disable
        </button>
      </div>
    </div>
  );
}

export const Demo: Story = {
  name: 'Demo',
  render(_arguments: DemoComponentProps) {
    return <DemoComponent {..._arguments} />;
  },
};

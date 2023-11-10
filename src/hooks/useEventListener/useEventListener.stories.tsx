/* eslint-disable react/jsx-no-literals */
import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ReactElement } from 'react';
import { useEventListener } from './useEventListener.js';

const meta = {
  title: 'Hooks / useEventListener',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function DemoComponent(): ReactElement {
  const [text, setText] = useState<ReadonlyArray<string>>([]);

  useEventListener(globalThis.document, 'focusin', (event) => {
    // eslint-disable-next-line no-console
    setText((previous) => [
      ...previous,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (event.target as HTMLButtonElement).textContent!,
    ]);
  });

  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">Change focus to listen to the focusin event on the document.</p>
      </div>

      <button type="button">Button 1</button>
      <button type="button">Button 2</button>
      <button type="button">Button 3</button>

      <ul>
        {text.map((key, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{key}</li>
        ))}
      </ul>
    </div>
  );
}

export const Demo: Story = {
  render() {
    return <DemoComponent />;
  },
};

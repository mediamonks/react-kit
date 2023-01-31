/* eslint-disable react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import { type ReactElement, useState } from 'react';
import { useDocumentEventListener } from './useDocumentEventListener.js';

export default {
  title: 'hooks/useDocumentEventListener',
};

function DemoComponent(): ReactElement {
  const [keydown, setKeydown] = useState<ReadonlyArray<string>>([]);

  useDocumentEventListener('keydown', (event) => {
    setKeydown((previous) => [...previous, event.key]);
  });

  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">Press a key to trigger the document keydown event.</p>
      </div>

      <ul>
        {keydown.map((key, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{key}</li>
        ))}
      </ul>
    </div>
  );
}

export const Demo: StoryObj = {
  render() {
    return <DemoComponent />;
  },
};

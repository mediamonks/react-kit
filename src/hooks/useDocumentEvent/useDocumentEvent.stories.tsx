/* eslint-disable react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import { type ReactElement, useState } from 'react';
import { useDocumentEvent } from './useDocumentEvent.js';

export default {
  title: 'hooks/useDocumentEvent',
};

function DemoComponent(): ReactElement {
  const [keydown, setKeydown] = useState<ReadonlyArray<string>>([]);

  useDocumentEvent('keydown', (event) => {
    setKeydown((previous) => [...previous, event.key]);
  });

  return (
    <div>
      <p>Press a key to trigger the document keydown event</p>

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

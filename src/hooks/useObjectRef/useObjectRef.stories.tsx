/* eslint-disable react/jsx-no-literals, react/no-multi-comp */
import type { Meta } from '@storybook/react';
import { type ComponentPropsWithRef, type ReactNode, useRef, useState } from 'react';
import { useObjectRef } from './useObjectRef.js';

const meta: Meta = {
  title: 'Hooks/useObjectRef',
};

export default meta;

type MyComponentProps = ComponentPropsWithRef<'div'>;

function MyComponent({ ref, ...props }: MyComponentProps): ReactNode {
  const objectRef = useObjectRef(ref);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  return (
    <div {...props} style={{ background: 'lightblue' }} ref={objectRef}>
      <button
        type="button"
        // eslint-disable-next-line react/jsx-no-bind
        onClick={() => {
          if (objectRef.current) {
            setDimensions({
              width: objectRef.current.offsetWidth,
              height: objectRef.current.offsetHeight,
            });
          }
        }}
      >
        Get Dimensions
      </button>
      <pre>Dimensions: {JSON.stringify(dimensions, null, 2)}</pre>
    </div>
  );
}

export function InComponent(): ReactNode {
  return <MyComponent />;
}

export function WithRefObject(): ReactNode {
  const elementRef = useRef<HTMLDivElement>(null);
  const objRef = useObjectRef(elementRef);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  return (
    <div>
      <div ref={objRef} style={{ width: '200px', height: '100px', background: 'lightblue' }} />
      <button
        type="button"
        // eslint-disable-next-line react/jsx-no-bind
        onClick={() => {
          if (objRef.current) {
            setDimensions({
              width: objRef.current.offsetWidth,
              height: objRef.current.offsetHeight,
            });
          }
        }}
      >
        Get Dimensions
      </button>
      <pre>Dimensions: {JSON.stringify(dimensions, null, 2)}</pre>
    </div>
  );
}

export function WithFunctionRef(): ReactNode {
  const [elementInfo, setElementInfo] = useState<string>('No element yet');
  const objRef = useObjectRef((element: HTMLDivElement | null) => {
    setElementInfo(element ? 'Element mounted' : 'Element unmounted');
  });

  return (
    <div>
      <div ref={objRef} style={{ width: '200px', height: '100px', background: 'lightgreen' }} />
      <p>Status: {elementInfo}</p>
    </div>
  );
}

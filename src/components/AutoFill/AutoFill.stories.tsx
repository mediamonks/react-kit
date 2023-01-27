/* eslint-disable react/jsx-no-literals, react/no-multi-comp */
import type { ReactElement } from 'react';
import { AutoFill } from './AutoFill.js';

export default {
  title: 'components/AutoFill',
};

export function Horizontal(): ReactElement {
  return (
    <div
      style={{
        width: 520,
        display: 'flex',
        outline: '1px solid blue',
      }}
    >
      <AutoFill axis="x">
        <div
          style={{
            padding: 15,
            flex: '0 1 auto',
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              outline: '1px solid red',
            }}
          />
        </div>

        <div
          style={{
            padding: 15,
            flex: '0 1 auto',
          }}
        >
          <div
            style={{
              width: 75,
              height: 50,
              outline: '1px solid yellow',
            }}
          />
        </div>
      </AutoFill>
    </div>
  );
}

export function Vertical(): ReactElement {
  return (
    <div
      style={{
        height: 520,
        width: 80,
        display: 'flex',
        flexDirection: 'column',
        outline: '1px solid blue',
      }}
    >
      <AutoFill axis="y">
        <div
          style={{
            padding: 15,
            flex: '0 1 auto',
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              outline: '1px solid red',
            }}
          />
        </div>
      </AutoFill>
    </div>
  );
}

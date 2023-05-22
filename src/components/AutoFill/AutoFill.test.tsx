import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AutoFill } from './AutoFill.js';

describe('AutoFill', () => {
  it('should not crash', async () => {
    const result = render(
      <AutoFill>
        <div />
      </AutoFill>,
    );

    expect(result.baseElement.firstElementChild).toBeDefined();
  });

  it('should fill parent element', async () => {
    const result = render(
      <div style={{ width: 500 }}>
        <AutoFill>
          <div data-testid="child" style={{ width: 100 }} />
        </AutoFill>
      </div>,
      {},
    );

    waitFor(async () => {
      const children = await result.findAllByTestId('child');

      expect(children.length).toBe(5);
    });
  });

  it('should overflow parent element', async () => {
    const result = render(
      <div style={{ width: 500 }}>
        <AutoFill>
          <div data-testid="child" style={{ width: 90 }} />
        </AutoFill>
      </div>,
      {},
    );

    waitFor(async () => {
      const children = await result.findAllByTestId('child');

      expect(children.length).toBe(6);
    });
  });

  it('should fill parent element', async () => {
    const result = render(
      <div style={{ height: 500 }}>
        <AutoFill axis="y">
          <div data-testid="child" style={{ height: 100 }} />
        </AutoFill>
      </div>,
      {},
    );

    waitFor(async () => {
      const children = await result.findAllByTestId('child');

      expect(children.length).toBe(5);
    });
  });
});

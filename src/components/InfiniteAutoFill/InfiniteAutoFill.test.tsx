import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InfiniteAutoFill } from './InfiniteAutoFill.js';

describe('InfiniteAutoFill', () => {
  it('should not crash', async () => {
    const result = render(
      <InfiniteAutoFill>
        <div />
      </InfiniteAutoFill>,
    );

    expect(result.baseElement.firstElementChild).toBeDefined();
  });

  it('should fill parent element', async () => {
    const result = render(
      <div style={{ width: 500 }}>
        <InfiniteAutoFill>
          <div data-testid="child" style={{ width: 100 }} />
        </InfiniteAutoFill>
      </div>,
      {},
    );

    waitFor(async () => {
      const children = await result.findAllByTestId('child');

      expect(children.length).toBe(6);
    });
  });

  it('should overflow parent element', async () => {
    const result = render(
      <div style={{ width: 500 }}>
        <InfiniteAutoFill>
          <div data-testid="child" style={{ width: 90 }} />
        </InfiniteAutoFill>
      </div>,
      {},
    );

    waitFor(async () => {
      const children = await result.findAllByTestId('child');

      expect(children.length).toBe(7);
    });
  });

  it('should fill parent element', async () => {
    const result = render(
      <div style={{ height: 500 }}>
        <InfiniteAutoFill axis="y">
          <div data-testid="child" style={{ height: 100 }} />
        </InfiniteAutoFill>
      </div>,
      {},
    );

    waitFor(async () => {
      const children = await result.findAllByTestId('child');

      expect(children.length).toBe(6);
    });
  });
});

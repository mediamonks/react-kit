/* eslint-disable react/no-multi-comp */
import { act, fireEvent, render } from '@testing-library/react';
import { type ReactElement, useRef } from 'react';
import { useMediaDuration } from './useMediaDuration.js';

describe('useMediaDuration', () => {
  it('should return media duration once the video is loaded', async () => {
    let mediaDuration = Number.NaN;
    function TestComponent(): ReactElement {
      const ref = useRef<HTMLVideoElement>(null);
      mediaDuration = useMediaDuration(ref);

      return (
        <video data-testid="test" ref={ref} src="https://www.w3schools.com/html/mov_bbb.mp4">
          <track kind="captions" />
        </video>
      );
    }
    const result = render(<TestComponent />);
    const video = await result.findByTestId('test');
    Object.defineProperty(video, 'duration', {
      writable: true,
      value: 10,
    });
    await act(async () => fireEvent.durationChange(video));
    expect(mediaDuration).toBe(10);
  });
});

/* eslint-disable react/no-multi-comp */
import { act, fireEvent, renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { describe, expect, it } from 'vitest';
import { useMediaDuration } from './useMediaDuration.js';

describe('useMediaDuration', () => {
  it('should return media duration when the video is already loaded', async () => {
    const video = document.createElement('video');
    Object.defineProperty(video, 'duration', {
      writable: true,
      value: 10,
    });

    const { result } = renderHook(() => {
      const ref = useRef<HTMLVideoElement>(video);
      const mediaDuration = useMediaDuration(ref);
      return mediaDuration;
    });

    expect(result.current).toBe(10);
  });

  it('should return media duration once the video is loaded', async () => {
    const video = document.createElement('video');

    const { result } = renderHook(() => {
      const ref = useRef<HTMLVideoElement>(video);
      const mediaDuration = useMediaDuration(ref);
      return mediaDuration;
    });

    expect(result.current).toBeNaN();
    Object.defineProperty(video, 'duration', {
      writable: true,
      value: 10,
    });
    await act(async () => fireEvent.durationChange(video));
    expect(result.current).toBe(10);
  });
});

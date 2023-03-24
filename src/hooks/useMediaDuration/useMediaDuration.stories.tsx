/* eslint-disable react/jsx-no-literals */
import type { StoryObj } from '@storybook/react';
import { type ReactElement, useRef } from 'react';
import { useMediaDuration } from './useMediaDuration.js';

export default {
  title: 'hooks/useMediaDuration',
};

function DemoComponent(): ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoDuration = useMediaDuration(videoRef);
  const audioDuration = useMediaDuration(audioRef);

  return (
    <div>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Instructions!</h4>
        <p className="mb-0">See the media duration</p>
      </div>
      <div className="card border-dark" data-ref="test-area">
        <div className="card-header">Test Area</div>
        <div className="card-body">
          <div>
            Video Duration:{' '}
            <span className="badge rounded-pill bg-primary">{`${Math.floor(
              videoDuration,
            )}sec`}</span>
          </div>
          <video controls ref={videoRef} src="https://www.w3schools.com/html/mov_bbb.mp4">
            <track kind="captions" />
          </video>
        </div>
        <div className="card-body">
          <div>
            Audio Duration:{' '}
            <span className="badge rounded-pill bg-primary">{`${Math.floor(
              audioDuration,
            )}sec`}</span>
          </div>
          <audio controls ref={audioRef} src="https://www.w3schools.com/html/horse.mp3">
            <track kind="captions" />
          </audio>
        </div>
      </div>
    </div>
  );
}

export const Demo: StoryObj = {
  render() {
    return <DemoComponent />;
  },
};

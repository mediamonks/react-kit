/* eslint-disable react/jsx-no-literals */
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';
import { useRefs } from '../useRefs/useRefs.js';
import type { Refs } from '../useRefs/useRefs.types.js';
import { useMediaDuration } from './useMediaDuration.js';

const meta = {
  title: 'Hooks / useMediaDuration',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export type DemoComponentRefs = Refs<{
  video: HTMLVideoElement;
  audio: HTMLAudioElement;
}>;

function DemoComponent(): ReactElement {
  const refs = useRefs<DemoComponentRefs>();
  const videoDuration = useMediaDuration(refs.video);
  const audioDuration = useMediaDuration(refs.audio);

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
          <video controls ref={refs.video} src="https://www.w3schools.com/html/mov_bbb.mp4">
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
          <audio controls ref={refs.audio} src="https://www.w3schools.com/html/horse.mp3">
            <track kind="captions" />
          </audio>
        </div>
      </div>
    </div>
  );
}

export const Demo: Story = {
  render() {
    return <DemoComponent />;
  },
};

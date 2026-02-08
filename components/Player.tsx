'use client';

import MuxPlayer from '@mux/mux-player-react';

interface HeroVideoProps {
  playbackId: string;
}

export default function HeroVideo({ playbackId }: HeroVideoProps) {
  return (
    <section>
      <MuxPlayer
        playbackId={playbackId}
        thumbnailTime={94}
        loop
        playsInline
        className={"w-full h-auto"}
        style={{
          '--controls': '',
        }}
        disableTracking
        defaultHiddenCaptions
      />
    </section>
  );
}
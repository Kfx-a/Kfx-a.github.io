import React from 'react';
import ReactPlayer from 'react-player';

export default function VideoPlayer({ video }) {
  const Player = ReactPlayer;
  const isOdysee = video.videoUrl.includes('odysee.com/$/embed');

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl">
        {isOdysee ? (
          <iframe
            src={video.videoUrl}
            className="w-full h-full border-none"
            allowFullScreen
          />
        ) : (
          <Player
            url={video.videoUrl}
            width="100%"
            height="100%"
            controls={true}
            playing={true}
            light={video.thumbnail}
            style={{ borderRadius: '0.75rem', overflow: 'hidden' }}
          />
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-white text-xl font-bold leading-tight">
          {video.title}
        </h1>
      </div>
    </div>
  );
}

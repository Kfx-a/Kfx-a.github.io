import React, { useState } from 'react';
import ReactPlayer from 'react-player';

export default function VideoPlayer({ video, isDarkMode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const Player = ReactPlayer;
  const isOdysee = video.videoUrl.includes('odysee.com/$/embed');

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl">
        {/* Thumbnail Placeholder to prevent white flash */}
        {!isLoaded && (
          <div className={`absolute inset-0 z-10 flex items-center justify-center ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
            <img 
              src={video.thumbnail} 
              alt="" 
              className="w-full h-full object-cover opacity-50 blur-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 ${isDarkMode ? 'border-white/30' : 'border-purple-500'}`}></div>
            </div>
          </div>
        )}

        {isOdysee ? (
          <iframe
            src={video.videoUrl}
            className={`w-full h-full border-none transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={() => {
              // Small delay to ensure Odysee resolver is hidden
              setTimeout(() => setIsLoaded(true), 800);
            }}
            style={{ backgroundColor: 'black' }}
          />
        ) : (
          <div className={`w-full h-full transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <Player
              url={video.videoUrl}
              width="100%"
              height="100%"
              controls={true}
              playing={true}
              onReady={() => setIsLoaded(true)}
              style={{ borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: 'black' }}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 px-2 pb-2">
        <h1 className={`text-xl font-bold leading-tight transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {video.title}
        </h1>
        <div className={`flex items-center gap-2 text-sm transition-colors ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
          <span>{video.author}</span>
          <span>•</span>
          <span>{video.postedAt}</span>
        </div>
      </div>
    </div>
  );
}

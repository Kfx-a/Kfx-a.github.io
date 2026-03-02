import React from 'react';

export default function VideoCard({ video, onClick, isDarkMode }) {
  return (
    <div 
      className="flex flex-col gap-3 cursor-pointer group"
      onClick={() => onClick(video)}
    >
      <div className={`relative aspect-video rounded-xl overflow-hidden transition-colors ${
        isDarkMode ? 'bg-zinc-900' : 'bg-gray-200'
      }`}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </div>
      
      <div className="flex gap-3">
        <div className="flex flex-col gap-1">
          <h3 className={`text-sm font-semibold line-clamp-2 leading-tight transition-colors ${
            isDarkMode ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'
          }`}>
            {video.title}
          </h3>
          <div className={`text-xs transition-colors ${
            isDarkMode ? 'text-white/60' : 'text-gray-500'
          }`}>
            <p>{video.author}</p>
            <p>{video.views} • {video.postedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

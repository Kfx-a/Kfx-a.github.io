import React from 'react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <div 
      className="flex flex-col gap-3 cursor-pointer group"
      onClick={() => onClick(video)}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900">
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
          <h3 className="text-white text-sm font-semibold line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
            {video.title}
          </h3>
          <div className="text-white/60 text-xs">
            <p>{video.author}</p>
            <p>{video.views} • {video.postedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import VideoPlayer from './components/VideoPlayer';
import VideoCard from './components/VideoCard';
import { MOCK_VIDEOS } from './constants';
import { Video } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white relative overflow-x-hidden">
      <Navbar onHomeClick={() => setSelectedVideo(null)} />
      
      <main className={`pt-20 px-4 md:px-8 lg:px-12 max-w-[1800px] mx-auto transition-all duration-500 ${selectedVideo ? 'blur-xl scale-95 brightness-50 pointer-events-none' : 'blur-0 scale-100'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
          {MOCK_VIDEOS.map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              onClick={handleVideoSelect} 
            />
          ))}
        </div>
      </main>

      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeVideo}
              className="absolute inset-0 bg-black/40 cursor-pointer"
            />
            
            <motion.div
              layoutId={selectedVideo.id}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
            >
              <div className="p-2">
                <VideoPlayer video={selectedVideo} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="mt-20 border-t border-white/10 py-8 px-4 text-center text-white/40 text-sm">
        <p>&copy; 2026 StreamTube. All rights reserved.</p>
      </footer>
    </div>
  );
}

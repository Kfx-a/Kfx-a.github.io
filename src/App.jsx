import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import VideoPlayer from './components/VideoPlayer';
import VideoCard from './components/VideoCard';
import { fetchChannelVideos } from './services/odyseeService';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      const fetchedVideos = await fetchChannelVideos('@Alis_FX');
      setVideos(fetchedVideos);
      setLoading(false);
    };
    loadVideos();
  }, []);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-[#050505] via-[#1e0a3d] to-[#050505] text-white' 
        : 'bg-gradient-to-br from-[#f8f9fa] via-[#e9ecef] to-[#dee2e6] text-gray-900'
    }`}>
      <Navbar 
        onHomeClick={() => setSelectedVideo(null)} 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main className={`pt-20 px-4 md:px-8 lg:px-12 max-w-[1800px] mx-auto transition-all duration-500 ${selectedVideo ? 'blur-xl scale-95 brightness-50 pointer-events-none' : 'blur-0 scale-100'}`}>
        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${isDarkMode ? 'border-purple-500' : 'border-purple-600'}`}></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
            {videos.length > 0 ? (
              videos.map((video) => (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  onClick={handleVideoSelect} 
                  isDarkMode={isDarkMode}
                />
              ))
            ) : (
              <div className={`col-span-full text-center py-20 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                No videos found for this channel.
              </div>
            )}
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeVideo}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div
              layoutId={selectedVideo.id}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(30,10,60,0.6)] border transition-colors ${
                isDarkMode 
                  ? 'bg-[#0a0a0a] border-white/5' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="p-2">
                <VideoPlayer video={selectedVideo} isDarkMode={isDarkMode} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className={`mt-20 border-t py-8 px-4 text-center text-sm transition-colors ${
        isDarkMode ? 'border-white/10 text-white/40' : 'border-gray-200 text-gray-400'
      }`}>
        <p>&copy; 2026 Kfx Player. All rights reserved.</p>
      </footer>
    </div>
  );
}

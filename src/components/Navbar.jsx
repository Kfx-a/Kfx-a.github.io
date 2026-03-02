import React from 'react';
import { Search, Menu, Video } from 'lucide-react';

export default function Navbar({ onHomeClick }) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-[#0f0f0f] flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Menu className="w-6 h-6 text-white" />
        </button>
        <div 
          className="flex items-center gap-1 cursor-pointer"
          onClick={onHomeClick}
        >
          <div className="bg-red-600 p-1 rounded-lg">
            <Video className="w-5 h-5 text-white fill-current" />
          </div>
          <span className="text-white font-bold text-xl tracking-tighter">Kfx Player</span>
        </div>
      </div>

      <div className="flex-1 max-w-[720px] flex items-center gap-4 px-4">
        <div className="flex flex-1 items-center">
          <div className="flex flex-1 items-center bg-[#121212] border border-white/10 rounded-full px-4 py-1.5 focus-within:border-blue-500">
            <Search className="w-5 h-5 text-white/40 mr-2" />
            <input
              type="text"
              placeholder="Search videos..."
              className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/40"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* User button removed */}
      </div>
    </nav>
  );
}

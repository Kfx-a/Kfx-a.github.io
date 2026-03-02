import React from 'react';
import { Search, Sun, Moon } from 'lucide-react';

export default function Navbar({ onHomeClick, isDarkMode, toggleDarkMode }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 z-50 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0f0f0f]/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm'
    }`}>
      <div className="flex items-center gap-4">
        <div 
          className="flex items-center gap-1 cursor-pointer"
          onClick={onHomeClick}
        >
          <span className={`font-bold text-xl tracking-tighter transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            karaoke videos 
          </span>
        </div>
      </div>

      <div className="flex-1 max-w-[720px] flex items-center gap-4 px-4">
        <div className="flex flex-1 items-center">
          <div className={`flex flex-1 items-center rounded-full px-4 py-1.5 transition-all focus-within:ring-2 focus-within:ring-purple-500 ${
            isDarkMode 
              ? 'bg-[#121212] border border-white/10 text-white' 
              : 'bg-gray-100 border border-gray-200 text-gray-900'
          }`}>
            <Search className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search videos..."
              className="bg-transparent border-none outline-none w-full placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-all hover:scale-110 active:scale-95 ${
            isDarkMode 
              ? 'bg-white/10 text-yellow-400 hover:bg-white/20' 
              : 'bg-gray-100 text-purple-600 hover:bg-gray-200'
          }`}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </nav>
  );
}

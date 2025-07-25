"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Clock Widget
export const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="text-center">
        <div className="text-4xl font-thin text-white mb-2">
          {time.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          })}
        </div>
        <div className="text-sm text-white/80">
          {time.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        <div className="text-xs text-white/60 mt-1">
          Jakarta, Indonesia
        </div>
      </div>
    </motion.div>
  );
};

// Weather Widget (Static demo data)
export const WeatherWidget = () => {
  const weatherData = {
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 78,
    icon: '⛅'
  };

  return (
    <motion.div
      className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="text-center text-white">
        <div className="text-3xl mb-2">{weatherData.icon}</div>
        <div className="text-2xl font-light mb-1">{weatherData.temp}°C</div>
        <div className="text-sm text-white/80 mb-2">{weatherData.condition}</div>
        <div className="text-xs text-white/60">
          Humidity: {weatherData.humidity}%
        </div>
      </div>
    </motion.div>
  );
};

// Quick Stats Widget
export const StatsWidget = () => {
  const stats = [
    { label: 'GPA', value: '3.78', icon: '🎓' },
    { label: 'Projects', value: '6+', icon: '💼' },
    { label: 'Awards', value: '10+', icon: '🏆' },
    { label: 'Years Exp', value: '2+', icon: '💻' }
  ];

  return (
    <motion.div
      className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="text-white">
        <h3 className="text-lg font-medium mb-4 text-center">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-lg mb-1">{stat.icon}</div>
              <div className="text-xl font-semibold">{stat.value}</div>
              <div className="text-xs text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Music Player Widget (Static demo)
export const MusicWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong] = useState({
    title: "Lofi Hip Hop Radio",
    artist: "ChilledCow",
    album: "Study Beats"
  });

  return (
    <motion.div
      className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30 min-w-64"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <span className="text-xl">🎵</span>
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm truncate">{currentSong.title}</div>
            <div className="text-xs text-white/70 truncate">{currentSong.artist}</div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-white/30 rounded-full h-1 mb-4">
          <div className="bg-white rounded-full h-1 w-1/3"></div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button className="hover:scale-110 transition-transform">
            <span className="text-lg">⏮️</span>
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
          >
            <span className="text-lg">{isPlaying ? '⏸️' : '▶️'}</span>
          </button>
          <button className="hover:scale-110 transition-transform">
            <span className="text-lg">⏭️</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Main Widgets Container
export const DesktopWidgets = () => {
  return (
    <div className="absolute top-8 right-6 space-y-4 z-30">
      <ClockWidget />
      <WeatherWidget />
      <StatsWidget />
      <MusicWidget />
    </div>
  );
};

export default DesktopWidgets;
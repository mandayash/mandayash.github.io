"use client";
import React, { useState, useEffect } from 'react';

const MacOSStatusBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel] = useState(87); // Static for demo
  const [wifiStrength] = useState(3); // 0-3 signal strength

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getBatteryIcon = (level: number) => {
    if (level > 75) return '🔋';
    if (level > 50) return '🔋';
    if (level > 25) return '🪫';
    return '🪫';
  };

  const getWifiIcon = (strength: number) => {
    const icons = ['📶', '📶', '📶', '📶'];
    return icons[strength] || '📶';
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-white/80 backdrop-blur-md text-white text-xs flex items-center justify-between px-4 z-50 border-b border-white/10">
      {/* Left side - Apple menu and app name */}
      <div className="flex items-center gap-4">
        <button className="hover:bg-white/20 px-2 py-1 rounded transition-colors">
          <span className="font-medium text-sm">🍎</span>
        </button>
        <span className="font-medium">Portfolio</span>
        <span className="text-gray-300">File</span>
        <span className="text-gray-300">Edit</span>
        <span className="text-gray-300">View</span>
        <span className="text-gray-300">Window</span>
        <span className="text-gray-300">Help</span>
      </div>

      {/* Right side - System status */}
      <div className="flex items-center gap-3">
        {/* Battery */}
        <div className="flex items-center gap-1">
          <span>{getBatteryIcon(batteryLevel)}</span>
          <span className="text-xs">{batteryLevel}%</span>
        </div>
        
        {/* WiFi */}
        <div className="flex items-center">
          <span>{getWifiIcon(wifiStrength)}</span>
        </div>
        
        {/* Bluetooth */}
        <span>🔵</span>
        
        {/* Control Center */}
        <button className="hover:bg-white/20 px-1 py-1 rounded transition-colors">
          <span>⚙️</span>
        </button>
        
        {/* Time */}
        <div className="font-mono text-xs">
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  );
};

export default MacOSStatusBar;
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface WindowState {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
}

export interface SafariWindowProps {
  id: string;
  title: string;
  url: string;
  children: React.ReactNode;
  state: WindowState;
  onUpdate: (id: string, updates: Partial<WindowState>) => void;
  onClose: () => void;
  onFocus: () => void;
  defaultSize?: {
    width: number;
    height: number;
  };
}

/**
 * Draggable Safari Window Component
 * A reusable window component styled like Safari browser with dragging, resizing
 * and responsive behavior for both desktop and mobile.
 * Updated to match modern Safari design with improved typography and layout.
 */
const DraggableSafariWindow = ({ 
  id, 
  title,
  url, 
  children, 
  state, 
  onUpdate, 
  onClose,
  onFocus 
}: SafariWindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const isMobile = useRef(false);

  // Check if on mobile
  useEffect(() => {
    isMobile.current = window.innerWidth < 768;
    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    
    e.stopPropagation();
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - state.x,
      y: e.clientY - state.y
    });
    onFocus();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isResizing) {
      onUpdate(id, {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
    
    if (isResizing) {
      const newWidth = Math.max(400, resizeStart.width + (e.clientX - resizeStart.x));
      const newHeight = Math.max(300, resizeStart.height + (e.clientY - resizeStart.y));
      onUpdate(id, {
        width: newWidth,
        height: newHeight
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  // Handle resize
  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      width: state.width,
      height: state.height,
      x: e.clientX,
      y: e.clientY
    });
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    
    e.stopPropagation();
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - state.x,
      y: touch.clientY - state.y
    });
    onFocus();
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && !isResizing) {
      const touch = e.touches[0];
      onUpdate(id, {
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    }
    
    if (isResizing) {
      const touch = e.touches[0];
      const newWidth = Math.max(300, resizeStart.width + (touch.clientX - resizeStart.x));
      const newHeight = Math.max(200, resizeStart.height + (touch.clientY - resizeStart.y));
      onUpdate(id, {
        width: newWidth,
        height: newHeight
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  // Handle resize touch
  const handleResizeTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    const touch = e.touches[0];
    setIsResizing(true);
    setResizeStart({
      width: state.width,
      height: state.height,
      x: touch.clientX,
      y: touch.clientY
    });
  };

  // Add event listeners
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart]);

  return (
    <motion.div
      ref={windowRef}
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200/50 backdrop-blur-xl"
      style={{
        position: 'absolute',
        left: `${state.x}px`,
        top: `${state.y}px`,
        width: `${state.width}px`,
        height: `${state.height}px`,
        maxHeight: isMobile.current ? '85vh' : 'none',
        maxWidth: isMobile.current ? '95vw' : 'none',
        zIndex: state.zIndex,
        cursor: isDragging ? 'grabbing' : 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      }}
      onMouseDown={() => onFocus()}
    >
      {/* Window Header - Updated Design */}
      <div 
        className="bg-gradient-to-b from-gray-50 to-gray-100/80 px-4 py-3 flex items-center gap-3 border-b border-gray-200/60 cursor-grab select-none backdrop-blur-sm"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Traffic Light Controls */}
        <div className="flex gap-2 window-controls">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-all duration-200 hover:shadow-md relative group"
            aria-label="Close window"
          >
            <span className="absolute inset-0 flex items-center justify-center text-red-800 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              ×
            </span>
          </button>
          <button 
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-all duration-200 hover:shadow-md relative group"
            aria-label="Minimize window"
          >
            <span className="absolute inset-0 flex items-center justify-center text-yellow-800 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              −
            </span>
          </button>
          <button 
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-all duration-200 hover:shadow-md relative group"
            aria-label="Maximize window"
          >
            <span className="absolute inset-0 flex items-center justify-center text-green-800 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              +
            </span>
          </button>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          <button className="p-1 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50" disabled>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-1 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50" disabled>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* URL Bar */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white/80 border border-gray-300/60 rounded-lg px-4 py-1.5 flex items-center gap-2 min-w-0 max-w-md w-full shadow-sm">
            {/* Security Icon */}
            <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            
            {/* URL Text */}
            <span className="text-sm text-gray-700 font-sf font-medium truncate min-w-0">
              {url}
            </span>
            
            {/* Reload Button */}
            <button className="p-0.5 rounded hover:bg-gray-200 transition-colors flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Window Title - Show on larger screens */}
        {title && (
          <div className="hidden lg:block text-sm font-sf font-medium text-gray-700 max-w-32 truncate">
            {title}
          </div>
        )}
      </div>
      
      {/* Window Content */}
      <div 
        className="overflow-auto bg-white font-sf" 
        style={{ 
          minHeight: '200px',
          maxHeight: `${Math.min(state.height - 60, window.innerHeight * 0.8)}px`,
          height: isMobile.current ? 'auto' : 'calc(100% - 60px)'
        }}
      >
        {children}
      </div>
      
      {/* Resize Handle - Enhanced */}
      {!isMobile.current && (
        <div 
          className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize group"
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeTouchStart}
        >
          <div className="absolute bottom-1 right-1 w-3 h-3 opacity-30 group-hover:opacity-60 transition-opacity">
            <svg className="w-full h-full text-gray-600" viewBox="0 0 16 16" fill="currentColor">
              <path d="M16 16V10h-2v4h-4v2h6zM16 6V0h-6v2h4v4h2z"/>
              <path d="M6 16v-2H2v-4H0v6h6zM0 6h2V2h4V0H0v6z"/>
            </svg>
          </div>
        </div>
      )}

      {/* Window Focus Ring */}
      <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent group-focus-within:border-blue-400/50 transition-colors" />
    </motion.div>
  );
};

export default DraggableSafariWindow;
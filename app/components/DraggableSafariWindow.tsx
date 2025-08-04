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
      const newWidth = Math.max(300, resizeStart.width + (e.clientX - resizeStart.x));
      const newHeight = Math.max(200, resizeStart.height + (e.clientY - resizeStart.y));
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
      const newWidth = Math.max(200, resizeStart.width + (touch.clientX - resizeStart.x));
      const newHeight = Math.max(150, resizeStart.height + (touch.clientY - resizeStart.y));
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
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-2xl overflow-hidden"
      style={{
        position: 'absolute',
        left: `${state.x}px`,
        top: `${state.y}px`,
        width: `${state.width}px`,
        height: `${state.height}px`,
        maxHeight: isMobile.current ? '80vh' : 'none',
        maxWidth: isMobile.current ? '90vw' : 'none',
        zIndex: state.zIndex,
        cursor: isDragging ? 'grabbing' : 'auto',
      }}
      onMouseDown={() => onFocus()}
    >
      {/* Window Header */}
      <div 
        className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b cursor-grab select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="flex gap-2 window-controls">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClose();  // Call onClose to close the window
            }}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            aria-label="Close window"
          />
          {/* Yellow button - decorative only */}
          <div 
            className="w-3 h-3 bg-yellow-500 rounded-full"
            aria-hidden="true"
          />
          {/* Green button - decorative only */}
          <div 
            className="w-3 h-3 bg-green-500 rounded-full"
            aria-hidden="true" 
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Title */}
          {title && <span className="font-medium text-xs mb-1 hidden sm:block">{title}</span>}
          {/* URL */}
          <div className="bg-gray-200 rounded px-3 py-1 text-xs inline-block truncate max-w-[200px] sm:max-w-none">
            {url}
          </div>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="overflow-auto" style={{ 
        minHeight: '100px',
        maxHeight: `${Math.min(state.height - 48, window.innerHeight * 0.7)}px`,
        height: isMobile.current ? 'auto' : 'calc(100% - 48px)'
      }}>
        {children}
      </div>
      
      {/* Resize Handle */}
      <div 
        className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize"
        onMouseDown={handleResizeStart}
        onTouchStart={handleResizeTouchStart}
      >
        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 16 16">
          <path fill="currentColor" d="M13 13L3 3M13 9L9 13M13 5L5 13" strokeWidth="1" />
        </svg>
      </div>
    </motion.div>
  );
};

export default DraggableSafariWindow;
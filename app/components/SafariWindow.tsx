import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SafariWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  children: React.ReactNode;
  initialWidth?: number;
  initialHeight?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  zIndex?: number;
  onFocus?: () => void;
}

interface WindowState {
  x: number;
  y: number;
  width: number;
  height: number;
}

const SafariWindow: React.FC<SafariWindowProps> = ({
  isOpen,
  onClose,
  title,
  url,
  children,
  initialWidth = 800,
  initialHeight = 600,
  minWidth = 400,
  minHeight = 300,
  maxWidth,
  maxHeight,
  zIndex = 1000,
  onFocus
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Window state
  const [windowState, setWindowState] = useState<WindowState>(() => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    return {
      x: Math.max(0, (screenWidth - initialWidth) / 2),
      y: Math.max(50, (screenHeight - initialHeight) / 2),
      width: Math.min(initialWidth, screenWidth - 100),
      height: Math.min(initialHeight, screenHeight - 100)
    };
  });

  // Check if mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      // Adjust window size for smaller screens
      if (width < 768 && isOpen) {
        setWindowState(prev => ({
          ...prev,
          x: 20,
          y: 50,
          width: width - 40,
          height: Math.min(prev.height, window.innerHeight - 100)
        }));
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isOpen]);

  // Constrain window to screen bounds
  const constrainToScreen = useCallback((state: WindowState): WindowState => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    const maxX = screenWidth - state.width;
    const maxY = screenHeight - state.height;
    
    return {
      ...state,
      x: Math.max(0, Math.min(state.x, maxX)),
      y: Math.max(0, Math.min(state.y, maxY)),
      width: Math.max(minWidth, Math.min(state.width, maxWidth || screenWidth - 40)),
      height: Math.max(minHeight, Math.min(state.height, maxHeight || screenHeight - 40))
    };
  }, [minWidth, minHeight, maxWidth, maxHeight]);

  // Handle dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMobile) return;
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - windowState.x,
      y: e.clientY - windowState.y
    });
    onFocus?.();
  }, [windowState, isMobile, onFocus]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && !isResizing && !isMobile) {
      const newState = {
        ...windowState,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      };
      setWindowState(constrainToScreen(newState));
    }
    
    if (isResizing && !isMobile) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      
      const newState = {
        ...windowState,
        width: resizeStart.width + deltaX,
        height: resizeStart.height + deltaY
      };
      setWindowState(constrainToScreen(newState));
    }
  }, [isDragging, isResizing, isMobile, dragStart, resizeStart, windowState, constrainToScreen]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  // Handle resize
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    if (isMobile) return;
    
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: windowState.width,
      height: windowState.height
    });
  }, [windowState, isMobile]);

  // Add/remove event listeners
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isDragging ? 'grabbing' : 'se-resize';
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Handle window click for focus
  const handleWindowClick = useCallback(() => {
    onFocus?.();
  }, [onFocus]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/30 z-40"
        style={{ zIndex }}
        onClick={handleBackdropClick}
      >
        <motion.div
          ref={windowRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg shadow-2xl overflow-hidden"
          style={{
            position: 'absolute',
            left: isMobile ? '50%' : windowState.x,
            top: isMobile ? '50%' : windowState.y,
            width: windowState.width,
            height: windowState.height,
            transform: isMobile ? 'translate(-50%, -50%)' : 'none',
            cursor: isDragging ? 'grabbing' : 'auto',
            zIndex: zIndex + 1
          }}
          onClick={handleWindowClick}
        >
          {/* Window Header */}
          <div 
            className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b select-none"
            style={{ cursor: isMobile ? 'default' : 'grab' }}
            onMouseDown={handleMouseDown}
          >
            {/* Window Controls */}
            <div className="flex gap-2 window-controls">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center group"
                aria-label="Close window"
              >
                <span className="text-red-800 text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</span>
              </button>
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            
            {/* Title and URL */}
            <div className="flex-1 flex flex-col items-center justify-center min-w-0">
              {title && (
                <span className="font-medium text-xs mb-1 text-gray-700 truncate max-w-full">
                  {title}
                </span>
              )}
              <div className="bg-gray-200 rounded px-3 py-1 text-xs text-gray-600 truncate max-w-full">
                {url}
              </div>
            </div>
          </div>
          
          {/* Window Content */}
          <div 
            className="overflow-auto"
            style={{ height: `calc(100% - 54px)` }}
          >
            {children}
          </div>
          
          {/* Resize Handle - Only show on desktop */}
          {!isMobile && (
            <div 
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-50 hover:opacity-100 transition-opacity"
              onMouseDown={handleResizeStart}
            >
              <svg 
                className="w-4 h-4 text-gray-400" 
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M15 15V9h-1v5H9v1h6z"/>
                <path d="M11 15V7h-1v7H3v1h8z"/>
                <path d="M7 15V5H6v9H1v1h6z"/>
              </svg>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SafariWindow;
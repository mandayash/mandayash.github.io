"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WindowState {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
}

interface SafariWindowProps {
  id: string;
  title: string;
  url: string;
  children: React.ReactNode;
  state: WindowState;
  onUpdate: (id: string, updates: Partial<WindowState>) => void;
  onClose: () => void;
  onFocus: () => void;
}

// Draggable Safari Window Component
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
    if (isMobile.current) return; // Disable dragging on mobile
    
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
    if (isMobile.current) return; // Disable resizing on mobile
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      width: state.width,
      height: state.height,
      x: e.clientX,
      y: e.clientY
    });
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
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
        position: isMobile.current ? 'relative' : 'absolute',
        left: isMobile.current ? 'auto' : `${state.x}px`,
        top: isMobile.current ? 'auto' : `${state.y}px`,
        width: isMobile.current ? '100%' : `${state.width}px`,
        height: isMobile.current ? 'auto' : `${state.height}px`,
        maxHeight: isMobile.current ? '80vh' : 'auto',
        zIndex: state.zIndex,
        cursor: isDragging ? 'grabbing' : 'auto',
        margin: isMobile.current ? '0 auto' : 0,
      }}
      onMouseDown={() => onFocus()}
    >
      {/* Window Header */}
      <div 
        className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b cursor-grab select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex gap-2 window-controls">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          />
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onUpdate(id, { isMinimized: true });
            }}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
          />
          <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors" />
        </div>
        <div className="flex-1 text-center">
          {title && <span className="font-medium text-xs mr-2 hidden sm:inline">{title}</span>}
          <div className="bg-gray-200 rounded px-3 py-1 text-xs inline-block truncate max-w-[150px] sm:max-w-none">
            {url}
          </div>
        </div>
      </div>
      
      {/* Window Content */}
      <div className={`overflow-auto ${isMobile.current ? 'max-h-[60vh]' : 'h-[calc(100%-48px)]'}`}>
        {children}
      </div>
      
      {/* Resize Handle - Hide on mobile */}
      {!isMobile.current && (
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={handleResizeStart}
        >
          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 16 16">
            <path fill="currentColor" d="M13 13L3 3M13 9L9 13M13 5L5 13" strokeWidth="1" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

// Notes App Style Component
const NotesWindow = ({ content }: { content: string }) => {
  return (
    <div className="bg-yellow-50 h-full">
      {/* Notes Header */}
      <div className="bg-yellow-100 px-4 py-2 border-b flex items-center justify-between">
        <h3 className="font-xs text-gray-700">aboutme.txt</h3>
        <div className="flex gap-2 text-xs text-gray-500">
          <span>Modified: Today</span>
        </div>
      </div>
      {/* Notes Content */}
      <div className="p-4 sm:p-6 text-sm sm:text-base leading-relaxed text-gray-700 whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
};

// Main About Me Section Component
const AboutMeSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if on mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Define different window states for mobile and desktop
  const getInitialWindowStates = () => {
    if (isMobile) {
      return {
        photo1: {
          x: 0,
          y: 0,
          width: window.innerWidth - 32,
          height: 300,
          zIndex: 1,
          isMinimized: false
        },
        photo2: { // Tetap berikan properti ini meskipun untuk mobile
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        zIndex: 0,
        isMinimized: true
        },
        notes: {
          x: 0,
          y: 0,
          width: window.innerWidth - 32,
          height: 400,
          zIndex: 3,
          isMinimized: false
        },
        spotify: { // Tetap berikan properti ini meskipun untuk mobile
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        zIndex: 0,
        isMinimized: true
        }
      };
    }
    
    return {
      photo1: {
        x: 120,
        y: 50,
        width: 400,
        height: 350,
        zIndex: 1,
        isMinimized: false
      },
      photo2: {
        x: 550,
        y: 60,
        width: 390,
        height: 300,
        zIndex: 2,
        isMinimized: false
      },
      notes: {
        x: 250,
        y: 450,
        width: 400,
        height: 300,
        zIndex: 3,
        isMinimized: false
      },
      spotify: {
        x: 680,
        y: 400,
        width: 340,
        height: 280,
        zIndex: 4,
        isMinimized: false
      }
    };
  };

  const [windowStates, setWindowStates] = useState<Record<string, WindowState>>(getInitialWindowStates());
  const [highestZIndex, setHighestZIndex] = useState(4);
  
  // Update window states when screen size changes
  useEffect(() => {
    setWindowStates(getInitialWindowStates());
  }, [isMobile]);
  
  const [activeWindows, setActiveWindows] = useState({
    photo1: true,
    photo2: !isMobile,
    notes: true,
    spotify: !isMobile
  });

  // Update activeWindows when screen size changes
  useEffect(() => {
    setActiveWindows({
      photo1: true,
      photo2: !isMobile,
      notes: true,
      spotify: !isMobile
    });
  }, [isMobile]);

  const updateWindow = (id: string, updates: Partial<WindowState>) => {
    setWindowStates(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates }
    }));
  };

  const focusWindow = (id: string) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    updateWindow(id, { zIndex: newZIndex });
  };

  const toggleWindow = (window: keyof typeof activeWindows) => {
    if (windowStates[window]?.isMinimized) {
      updateWindow(window, { isMinimized: false });
      focusWindow(window);
    } else {
      setActiveWindows(prev => ({
        ...prev,
        [window]: !prev[window]
      }));
    }
  };

  const notesContent = `Hi! I'm Amanda, a Computer Science student with a sharp eye for 
detail and a soft spot for bold, human-centered ideas. I craft 
intuitive products and interfaces that simplify complexity—whether 
it's streamlining workflows, visualizing data, or making technology 
feel less... techy.

Currently pursuing my studies at Universitas Pertamina, I thrive at 
the intersection of strategy, aesthetics, and usability. Whether I'm 
building seamless experiences or breaking the grid with experimental 
visuals, my goal is always the same: "make it work beautifully."

Fun facts:
- 🇫🇷 Recently completed an international program in France
- 🏆 10+ competition wins (yes, I keep count!)
- 💻 2+ years React.js experience
- 🎯 Currently seeking internship opportunities (Please hire me 🤩)
- 🎵 Can't code without my Spotify playlist`;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 overflow-y-auto px-4 py-6 sm:p-8">
      {/* Close button */}
      <button
        onClick={() => window.location.reload()} // Temporary close solution
        className="fixed top-4 right-4 z-[9999] bg-white/80 backdrop-blur rounded-full p-2 hover:bg-white transition-colors shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Mobile View - Stack windows vertically */}
      {isMobile ? (
        <div className="flex flex-col gap-6 max-w-md mx-auto pt-8">
          {activeWindows.photo1 && !windowStates.photo1?.isMinimized && (
            <DraggableSafariWindow
              id="photo1"
              title="Photo" 
              url="amanda.photos/studio-photo"
              state={windowStates.photo1}
              onUpdate={updateWindow}
              onClose={() => toggleWindow('photo1')}
              onFocus={() => focusWindow('photo1')}
            >
              <img 
                src="/images/foto-amanda1.png" 
                alt="Amanda Winter Photo"
                className="w-full object-cover"
                style={{ maxHeight: '300px' }}
              />
            </DraggableSafariWindow>
          )}

          {activeWindows.notes && !windowStates.notes?.isMinimized && (
            <DraggableSafariWindow
              id="notes"
              title="Notes" 
              url="notes.app/aboutme"
              state={windowStates.notes}
              onUpdate={updateWindow}
              onClose={() => toggleWindow('notes')}
              onFocus={() => focusWindow('notes')}
            >
              <NotesWindow content={notesContent} />
            </DraggableSafariWindow>
          )}
        </div>
      ) : (
        /* Desktop View - Windows with positions */
        <AnimatePresence>
          {activeWindows.photo1 && !windowStates.photo1?.isMinimized && (
            <DraggableSafariWindow
              id="photo1"
              title="Photo 1" 
              url="amanda.photos/studio-photo"
              state={windowStates.photo1}
              onUpdate={updateWindow}
              onClose={() => toggleWindow('photo1')}
              onFocus={() => focusWindow('photo1')}
            >
              <img 
                src="/images/foto-amanda1.png" 
                alt="Amanda Winter Photo"
                className="w-full h-full object-cover"
              />
            </DraggableSafariWindow>
          )}

          {activeWindows.photo2 && !windowStates.photo2?.isMinimized && (
            <DraggableSafariWindow
              id="photo2"
              title="Photo 2" 
              url="amanda.photos/france-moments"
              state={windowStates.photo2}
              onUpdate={updateWindow}
              onClose={() => toggleWindow('photo2')}
              onFocus={() => focusWindow('photo2')}
            >
              <img 
                src="/images/foto-amanda2.jpeg"
                alt="Amanda in France"
                className="w-full h-full object-cover"
              />
            </DraggableSafariWindow>
          )}

          {activeWindows.notes && !windowStates.notes?.isMinimized && (
            <DraggableSafariWindow
              id="notes"
              title="Notes" 
              url="notes.app/aboutme"
              state={windowStates.notes}
              onUpdate={updateWindow}
              onClose={() => toggleWindow('notes')}
              onFocus={() => focusWindow('notes')}
            >
              <NotesWindow content={notesContent} />
            </DraggableSafariWindow>
          )}

          {activeWindows.spotify && !windowStates.spotify?.isMinimized && (
            <DraggableSafariWindow
              id="spotify"
              title="Spotify" 
              url="open.spotify.com/preview"
              state={windowStates.spotify}
              onUpdate={updateWindow}
              onClose={() => toggleWindow('spotify')}
              onFocus={() => focusWindow('spotify')}
            >
              <div className="bg-black p-2 h-full flex items-center justify-center">
                <iframe 
                  style={{ borderRadius: '12px' }} 
                  src="https://open.spotify.com/embed/track/7GbAp0HKPQW7WnFJAzMoRk?utm_source=generator" 
                  width="100%" 
                  height="252" 
                  frameBorder={0}
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                />
              </div>
            </DraggableSafariWindow>
          )}
        </AnimatePresence>
      )}

      {/* Minimized Windows Dock - Show on both mobile and desktop */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-2 z-[9999] max-w-[90vw]">
        {(windowStates.photo1?.isMinimized || !activeWindows.photo1) && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => toggleWindow('photo1')}
            className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs shadow-lg"
          >
            📷 Winter Vibes
          </motion.button>
        )}
        
        {!isMobile && (windowStates.photo2?.isMinimized || !activeWindows.photo2) && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => toggleWindow('photo2')}
            className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs shadow-lg"
          >
            📷 France Moments
          </motion.button>
        )}
        
        {(windowStates.notes?.isMinimized || !activeWindows.notes) && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => toggleWindow('notes')}
            className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs shadow-lg"
          >
            📝 About Me
          </motion.button>
        )}
        
        {!isMobile && (windowStates.spotify?.isMinimized || !activeWindows.spotify) && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => toggleWindow('spotify')}
            className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs shadow-lg"
          >
            🎵 My Playlist
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default AboutMeSection;
"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';

interface DockItem {
  id: string;
  label: string;
  icon: string;
  action: () => void;
}

const Dock = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const dockItems: DockItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: '/icons/home.png',
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    {
      id: 'messages',
      label: 'Contact',
      icon: '/icons/messages.png',
      action: () => {
        // Scroll to contact section or open contact modal
        console.log('Open contact');
      }
    },
    {
      id: 'photos',
      label: 'Gallery',
      icon: '/icons/gallery.png', 
      action: () => {
        // Open projects gallery
        console.log('Open gallery');
      }
    },
    {
      id: 'music',
      label: 'Spotify',
      icon: '/icons/music.png',
      action: () => {
        // Open Spotify or music section
        window.open('https://open.spotify.com/', '_blank');
      }
    },
    {
      id: 'mail',
      label: 'Email',
      icon: '/icons/email.png', 
      action: () => {
        window.open('mailto:amandaputriaprill@gmail.com', '_blank');
      }
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: '/icons/github.png',
      action: () => {
        window.open('https://github.com/mandayash', '_blank');
      }
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: '/icons/linkedin.png',
      action: () => {
        window.open('https://linkedin.com/in/amandaputriapr', '_blank');
      }
    }
  ];

  const getItemScale = (itemId: string) => {
    if (!hoveredItem) return 1;
    if (hoveredItem === itemId) return 1.5;
    
    const hoveredIndex = dockItems.findIndex(item => item.id === hoveredItem);
    const currentIndex = dockItems.findIndex(item => item.id === itemId);
    const distance = Math.abs(hoveredIndex - currentIndex);
    
    if (distance === 1) return 1.2;
    if (distance === 2) return 1.1;
    return 1;
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div 
        className="flex items-end gap-4 p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {dockItems.map((item) => (
          <motion.div
            key={item.id}
            className="relative group cursor-pointer"
            onHoverStart={() => setHoveredItem(item.id)}
            onHoverEnd={() => setHoveredItem(null)}
            onClick={item.action}
            animate={{
              scale: getItemScale(item.id),
              y: hoveredItem === item.id ? -8 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <div className="w-16 h-16 flex items-center justify-center text-2xl bg-white/40 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
              {item.icon.startsWith('/') ? (
                <img src={item.icon} alt={item.label} className="w-16 h-16" draggable={false} />
              ) : (
                item.icon
              )}
            </div>
            
            {/* Tooltip */}
            <motion.div
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
            >
              {item.label}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Dock;
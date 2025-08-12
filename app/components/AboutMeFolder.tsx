"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AboutMeSection from './AboutMeSection';

const AboutMeFolder = ({ 
  isMobile = false,
  size = { sm: "w-12 h-12", md: "w-12 h-12", lg: "w-12 h-12" }
}: { 
  isMobile?: boolean,
  size?: { sm: string, md: string, lg: string }
}) => {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenAboutMe = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setShowAboutModal(true);
  };

  const handleCloseAboutMe = () => {
    setShowAboutModal(false);
  };

  return (
    <>
      {/* About Me Folder with improved hover effect */}
      <motion.div
        className="flex flex-col items-center cursor-pointer relative"
        onClick={handleOpenAboutMe}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className={`${isMobile ? size.sm : `${size.sm} md:${size.md} lg:${size.lg}`} relative flex items-center justify-center mb-2`}>
          <motion.img
            src="/icons/folder.png"
            alt="Folder Icon"
            className="w-full h-full" 
            animate={isHovered ? { y: -3 } : { y: 0 }}
            transition={{ duration: 0.2 }}
            draggable={false}
          />
        </div>
        <motion.span 
          className={`${isMobile ? 'text-xs' : 'text-sm'} text-center max-w-15 leading-tight font-sf`}
          animate={isHovered ? { 
            color: "#000000",
            textShadow: "0px 0px 3px rgba(255,255,255,0.7)" 
          } : {}}
        >
          About Me
        </motion.span>
      </motion.div>

      {/* About Me Section Modal with AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {showAboutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="z-50"
            onClick={(e) => e.stopPropagation()} 
          >
            <AboutMeSection onClose={handleCloseAboutMe} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AboutMeFolder;
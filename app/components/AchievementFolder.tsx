"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AchievementSection from './AchievementSection';

const AchievementFolder = ({ 
  isMobile = false,
  size = { sm: "w-12 h-12", md: "w-12 h-12", lg: "w-12 h-12" }
}: { 
  isMobile?: boolean,
  size?: { sm: string, md: string, lg: string }
}) => {
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenAchievement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAchievementModal(true);
  };

  const handleCloseAchievement = () => {
    setShowAchievementModal(false);
  };

  return (
    <>
      {/* Achievement Folder */}
      <motion.div
        className="flex flex-col items-center cursor-pointer relative block"
        onClick={handleOpenAchievement}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className={`${isMobile ? size.sm : `${size.sm} md:${size.md} lg:${size.lg}`} mb-2 relative flex items-center justify-center`}>
          <motion.img
            src="/icons/folder.png"
            alt="Achievement Folder Icon"
            className="w-full h-full"
            animate={isHovered ? { y: -3 } : { y: 0 }}
            transition={{ duration: 0.2 }}
            draggable={false}
          />
          
          {/* Sparkle effect when hovered - preserved from original */}
          {isHovered && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-yellow-400 text-xs">✨</span>
            </motion.div>
          )}
        </div>
        <motion.span 
          className={`${isMobile ? 'text-xs' : 'text-sm'} text-center max-w-15 leading-tight font-sf`}
          animate={isHovered ? { 
            color: "#000000",
            textShadow: "0px 0px 3px rgba(255,255,255,0.7)" 
          } : {}}
        >
          Achievement
        </motion.span>
      </motion.div>

      {/* Achievement Modal */}
      <AnimatePresence>
        {showAchievementModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <AchievementSection onClose={handleCloseAchievement} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AchievementFolder;
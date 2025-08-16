"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EduSection from './EduSection';

const EduFolder = ({ 
  isMobile = false,
  size = { sm: "w-12 h-12", md: "w-12 h-12", lg: "w-12 h-12" }
}: { 
  isMobile?: boolean,
  size?: { sm: string, md: string, lg: string }
}) => {
  const [showEduModal, setShowEduModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenEdu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEduModal(true);
  };

  const handleCloseEdu = () => {
    setShowEduModal(false);
  };

  return (
    <>
      {/* Education Folder */}
      <motion.div
        className="flex flex-col items-center cursor-pointer relative block"
        onClick={handleOpenEdu}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className={`${isMobile ? 'w-12 h-12 mb-1' : 'w-16 h-16 mb-2'} relative flex items-center justify-center`}>
          <motion.img
            src="/icons/folder.png"
            alt="Education Folder Icon"
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
          Skills, Organization, <br />
          and Education
        </motion.span>
      </motion.div>

      {/* Education Modal */}
      <AnimatePresence>
        {showEduModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <EduSection onClose={handleCloseEdu} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EduFolder;
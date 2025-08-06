"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectsSection from './ProjectsSection';

const ProjectsFolder = ({ isMobile = false }: { isMobile?: boolean }) => {
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenProjects = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowProjectsModal(true);
  };

  const handleCloseProjects = () => {
    setShowProjectsModal(false);
  };

  return (
    <>
      {/* Projects Folder */}
      <motion.div
        className="flex flex-col items-center cursor-pointer relative block"
        onClick={handleOpenProjects}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className={`${isMobile ? 'w-12 h-12 mb-1' : 'w-16 h-16 mb-2'} relative flex items-center justify-center`}>
          <motion.img
            src="/icons/folder.png"
            alt="Experience Folder Icon"
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
          Projects
        </motion.span>
      </motion.div>

      {/* Projects Modal */}
      <AnimatePresence>
        {showProjectsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <ProjectsSection onClose={handleCloseProjects} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsFolder;
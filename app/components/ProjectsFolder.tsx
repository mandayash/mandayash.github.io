"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import the ProjectsSection component
import ProjectsSection from './ProjectsSection';

const ProjectsFolder = () => {
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
        className="flex flex-col items-center cursor-pointer relative"
        onClick={handleOpenProjects}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="w-16 h-16 mb-2 relative flex items-center justify-center">
          <motion.img
            src="/icons/folder.png"
            alt="Projects Folder Icon"
            className="w-16 h-16"
            animate={isHovered ? { y: -3 } : { y: 0 }}
            transition={{ duration: 0.2 }}
            draggable={false}
          />
        </div>
        <motion.span 
          className="text-sm text-center max-w-15 leading-tight font-sf"
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
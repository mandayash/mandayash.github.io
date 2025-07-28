"use client";
import { useState } from "react";
import AboutMeSection from './AboutMeSection';

const AboutMeFolder = () => {
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <>
      {/* About Me Folder */}
      <div
        className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105 relative"
        onClick={() => setShowAboutModal(true)}
      >
        <div className="w-16 h-16 mb-2 relative flex items-center justify-center">
          <img
            src="/icons/folder.png"
            alt="Folder Icon"
            className="w-16 h-16"
            draggable={false}
          />
        </div>
        <span className="text-sm text-center max-w-15 leading-tight font-sf">
          About Me
        </span>
      </div>

      {/* About Me Section Modal */}
      {showAboutModal && (
        <div onClick={() => setShowAboutModal(false)}>
          <AboutMeSection />
        </div>
      )}
    </>
  );
};

export default AboutMeFolder;
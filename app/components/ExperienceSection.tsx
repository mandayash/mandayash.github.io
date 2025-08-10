import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DraggableSafariWindow, { WindowState } from "./DraggableSafariWindow";
import MacOSSkillTag from "./MacOSSkillTag";

interface ExperienceData {
  id: string;
  company: string;
  position: string;
  location: string;
  period: string;
  preview: string;
  description: string[];
  responsibilities: string[];
  skills: string[];
  achievements: string[];
  images: string[];
  // details: {
  //   industry?: string;
  //   companySize?: string;
  //   employmentType?: string;
  //   highlights: string[];
  // };
}

const experienceData: ExperienceData[] = [
  {
    id: "HalalLens",
    company: "Halal Lens",
    position: "Project Leader",
    location: "Universitas Pertamina",
    period: "February 2025 - June 2025",
    preview:
      "Led 5-member team developing halal food verification mobile app",
    description: [
      "First, thanks to my Slytherin teammates for their collaboration on the HalalLens project. HalalLens is a final project for Mobile Development course. This application is designed to check the halal status of food and beverage products through barcode scanning and OCR technology. \n The app addresses challenges Muslim consumers face in verifying halal products, especially when traveling or dealing with foreign language labels, by providing accessible and reliable verification solutions.",
      "Our app features a comprehensive set of tools including a barcode scanner for instant halal verification, OCR technology to verification through ingredient labels, accessibility options with voice navigation for visually impaired users, and a history tracking system for convenient reference to previously scanned products. These integrated features create a seamless experience for Muslim consumers seeking reliable halal product verification.",
    ],
    responsibilities: [
      "Coordinated requirement gathering through artifact research, user interviews, and survey analysis",
      "Managed complete project lifecycle from initial research phase to development",
      "Facilitated team collaboration and ensured adherence to user-centered design principles",
    ],
    skills: ["Project Managements", "User Research & Requirements Gathering", "UI/UX Design Principles", "Agile Development"],
    achievements: [
      "Successfully delivered project within 4-month timeline with 5-member team",
      "We Won 'Best UI/UX Design' award at final project exhibition",
      "Appreciated as 'Most Inclusive Application' recognition for accessibility features",
    ],
    images: ["/images/experiences/halallens-1.png", "/images/experiences/halallens-2.png", "/images/experiences/halallens-3.png", "/images/experiences/halallens-4.png", "/images/experiences/halallens-5.png", "/images/experiences/halallens-6.png", "/images/experiences/halallens-7.png"],
  },
  
];

// Image Carousel Component
// Upgrade ImageCarousel dengan animasi Cover Flow bergaya macOS
const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [panDirection, setPanDirection] = useState<'left' | 'right' | null>(null);
  
  const nextImage = () => {
    setIsPanning(true);
    setPanDirection('left');
    setTimeout(() => setIsPanning(false), 500);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIsPanning(true);
    setPanDirection('right');
    setTimeout(() => setIsPanning(false), 500);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImageIndex = (currentIndex + 1) % images.length;
  const prevImageIndex = (currentIndex - 1 + images.length) % images.length;

  if (images.length === 0) return null;

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[16/9] mb-6 rounded-lg overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200">
      {/* macOS style subtle shadow on top and bottom */}
      <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/10 to-transparent z-10"></div>
      <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
      
      {/* Main container */}
      <div className="relative w-full h-full perspective-1000">
        {/* Current Image */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`image-${currentIndex}`}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ 
              opacity: 0, 
              rotateY: panDirection === 'left' ? 15 : -15,
              scale: 0.9, 
              z: -100 
            }}
            animate={{ 
              opacity: 1, 
              rotateY: 0, 
              scale: 1, 
              z: 0,
              filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.15))"
            }}
            exit={{ 
              opacity: 0, 
              rotateY: panDirection === 'left' ? -15 : 15, 
              scale: 0.9,
              z: -100
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30, 
              mass: 1 
            }}
          >
            {/* Glass effect on images */}
            <div className="relative w-full h-full rounded-lg overflow-hidden group">
              <motion.img
                src={images[currentIndex]}
                alt={`Experience image ${currentIndex + 1}`}
                className="w-full h-full object-cover rounded-lg no-drag" // tambahkan class no-drag
                layoutId={`image-${currentIndex}`}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Glassmorphism reflection effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: isPanning ? 0.6 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Preview of next image (smaller, right side) */}
        {images.length > 1 && (
          <motion.div 
            className="absolute inset-y-0 right-0 w-1/5 flex items-center justify-center opacity-70"
            initial={{ x: 100, opacity: 0, rotateY: -15 }}
            animate={{ x: 50, opacity: 0.5, rotateY: -25 }}
            style={{ transformOrigin: "right center", zIndex: -1 }}
          >
            <motion.img
              src={images[nextImageIndex]}
              alt={`Next image`}
              className="w-full h-4/5 object-cover rounded-lg shadow-lg"
              style={{ filter: "blur(1px) brightness(0.7)" }}
            />
          </motion.div>
        )}
        
        {/* Preview of previous image (smaller, left side) */}
        {images.length > 1 && (
          <motion.div 
            className="absolute inset-y-0 left-0 w-1/5 flex items-center justify-center opacity-70"
            initial={{ x: -100, opacity: 0, rotateY: 15 }}
            animate={{ x: -50, opacity: 0.5, rotateY: 25 }}
            style={{ transformOrigin: "left center", zIndex: -1 }}
          >
            <motion.img
              src={images[prevImageIndex]}
              alt={`Previous image`}
              className="w-full h-4/5 object-cover rounded-lg shadow-lg"
              style={{ filter: "blur(1px) brightness(0.7)" }}
            />
          </motion.div>
        )}
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <motion.button
            onClick={prevImage}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md hover:bg-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={nextImage}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md hover:bg-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </>
      )}
      
      {/* Indicator dots with macOS style */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setPanDirection(index > currentIndex ? 'left' : 'right');
              setCurrentIndex(index);
              setIsPanning(true);
              setTimeout(() => setIsPanning(false), 500);
            }}
            className={`w-1.5 h-1.5 rounded-full bg-gray-300 outline-none focus:outline-none border-none`}
            initial={false}
            animate={{
              scale: index === currentIndex ? 1.4 : 1,
              backgroundColor: index === currentIndex ? "rgb(59, 130, 246)" : "rgb(209, 213, 219)",
            }}
            whileHover={{ scale: index === currentIndex ? 1.4 : 1.2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        ))}
      </div>
    </div>
  );
};

const ExperienceSection = ({ onClose }: { onClose: () => void }) => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceData>(
    experienceData[0]
  );
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [windowState, setWindowState] = useState<WindowState>({
    x: Math.max(80, window.innerWidth / 2 - 450),
    y: Math.max(40, window.innerHeight / 2 - 380),
    width: Math.min(980, window.innerWidth - 100),
    height: Math.min(750, window.innerHeight - 100),
    zIndex: 999,
    isMinimized: false,
  });

  // Handle click outside
  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.current === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);

      // Update window state for mobile
      if (isMobileView) {
        setWindowState((prev) => ({
          ...prev,
          x: 10,
          y: 60,
          width: window.innerWidth - 40,
          height: window.innerHeight - 140,
        }));
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const updateWindow = (_id: string, updates: Partial<WindowState>) => {
    setWindowState((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // Dummy function for focus - not needed since we have only one window
  const focusWindow = () => {};

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black/30 z-50 overflow-y-auto px-4 py-6 sm:p-8"
    >
      <DraggableSafariWindow
        id="experienceWindow"
        title=""
        url="amanda.portfolio/experience"
        state={windowState}
        onUpdate={updateWindow}
        onClose={onClose}
        onFocus={focusWindow}
      >
        {/* Content Area */}
        <div className={`flex ${isMobile ? "flex-col" : "flex-row"} h-full font-sf`}>
          {/* Sidebar - Experience List */}
          <div
            className={`${
              isMobile ? "h-48 overflow-y-auto" : "w-80 h-full overflow-y-auto"
            } bg-gray-50 border-r`}
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Professional Experience
              </h2>
              <div className="space-y-2">
                {experienceData.map((experience) => (
                  <motion.div
                    key={experience.id}
                    onClick={() => setSelectedExperience(experience)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedExperience.id === experience.id
                        ? "bg-blue-100 border-l-4 border-blue-500"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm text-gray-800 leading-tight font-sf">
                        {experience.company}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2 whitespace-nowrap text-justify font-sf">
                        {experience.period.split(" - ")[0]}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2 text-justify font-sf">
                      {experience.position}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2 text-justify font-sf">
                      {experience.preview}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2 text-justify font-sf">
                      {experience.skills.slice(0, 2).map((skill, index) => (
                        <span
                          key={index}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded text-justify font-sf"
                        >
                          {skill}
                        </span>
                      ))}
                      {experience.skills.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{experience.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div
            className={`${
              isMobile ? "flex-1 overflow-y-auto" : "flex-1 overflow-y-auto"
            } p-6`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedExperience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Experience Header */}
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                      {selectedExperience.position}
                    </span>
                    <span className="text-sm text-gray-500">
                      {selectedExperience.period}
                    </span>
                    <span className="text-sm text-gray-500">
                      • {selectedExperience.location}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-3">
                    {selectedExperience.company}
                  </h1>
                  <div className="text-gray-600 leading-relaxed space-y-4">
                    {selectedExperience.description.map((paragraph, index) => (
                      <p key={index} className="text-justify font-sf">{paragraph}</p>
                    ))} 
                  </div>
                </div>

                {/* Image Carousel */}
                <ImageCarousel images={selectedExperience.images} />

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Skills Utilized</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedExperience.skills.map((skill, index) => {
                        // Tentukan warna berdasarkan jenis skill atau index untuk variasi
                        const colors = ['blue', 'purple', 'pink', 'green', 'yellow', 'red', 'gray'];
                        let color: any = colors[index % colors.length];
                        
                        // Atau assign warna berdasarkan kategori skill
                        if (skill.toLowerCase().includes('react')) color = 'blue';
                        if (skill.toLowerCase().includes('python')) color = 'green';
                        if (skill.toLowerCase().includes('typescript')) color = 'blue';
                        if (skill.toLowerCase().includes('design')) color = 'pink';
                        if (skill.toLowerCase().includes('testing')) color = 'purple';
                        if (skill.toLowerCase().includes('management')) color = 'red';
                        if (skill.toLowerCase().includes('writing')) color = 'yellow';
                        
                        return (
                          <MacOSSkillTag 
                            key={index} 
                            skill={skill} 
                            color={color}
                          />
                        );
                      })}
                    </div>
                  </div>
                
                

                {/* Key Responsibilities */}
                <div className="mb-6 font-sf">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 text-justify font-sf">
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-2 font-sf">
                    {selectedExperience.responsibilities.map(
                      (responsibility, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600 font-sf"
                        >
                          <span className="text-blue-500 mt-1 text-justify font-sf">•</span>
                          <span className="text-justify font-sf">{responsibility}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 font-sf">
                    Achievements
                  </h3>
                  <ul className="space-y-2">
                    {selectedExperience.achievements.map(
                      (achievement, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600 font-sf"
                        >
                          <span className="text-green-500 mt-1 font-sf">✓</span>
                          <span className="text-justify font-sf">{achievement}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </DraggableSafariWindow>
    </div>
  );
};

export default ExperienceSection;

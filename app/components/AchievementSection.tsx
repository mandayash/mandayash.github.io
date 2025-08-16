import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DraggableSafariWindow, { WindowState } from "./DraggableSafariWindow";

// Simplified macOS style skill tag
const MacOSSkillTag = ({ skill }: { skill: string }) => {
  const getTagStyle = (tag: string): { bgClass: string, textClass: string } => {
    const tag_lower = tag.toLowerCase();
    
    if (tag_lower.includes('academic') || tag_lower.includes('scholarship'))
      return { bgClass: 'bg-blue-50', textClass: 'text-blue-700' };
      
    if (tag_lower.includes('research') || tag_lower.includes('publication'))
      return { bgClass: 'bg-purple-50', textClass: 'text-purple-700' };
      
    if (tag_lower.includes('design') || tag_lower.includes('ui/ux') || tag_lower.includes('creativity'))
      return { bgClass: 'bg-pink-50', textClass: 'text-pink-700' };
      
    if (tag_lower.includes('problem') || tag_lower.includes('solving') || tag_lower.includes('team'))
      return { bgClass: 'bg-green-50', textClass: 'text-green-700' };
      
    if (tag_lower.includes('national') || tag_lower.includes('winner') || tag_lower.includes('competition'))
      return { bgClass: 'bg-orange-50', textClass: 'text-orange-700' };
      
    if (tag_lower.includes('ai') || tag_lower.includes('ml') || tag_lower.includes('data') || tag_lower.includes('game'))
      return { bgClass: 'bg-indigo-50', textClass: 'text-indigo-700' };
      
    // Default color
    return { bgClass: 'bg-gray-50', textClass: 'text-gray-700' };
  };

  const { bgClass, textClass } = getTagStyle(skill);

  return (
    <span className={`inline-flex items-center ${bgClass} ${textClass} rounded-full text-xs px-2.5 py-1 font-medium font-sf border border-gray-200/50`}>
      {skill}
    </span>
  );
};

interface AchievementData {
  id: string;
  title: string;
  year: string;
  result?: string;
  project?: string;
  description?: string;
  tags?: string[];
  images?: string[];
}

// Achievement data
const achievementsList: AchievementData[] = [
  {
    id: "best-student-faculty",
    title: "Best Student in Faculty - Computer Science", 
    year: "2024",
    result: "Top performer with 3.82 GPA",
    description: "Selected as the highest-achieving student in Computer Science Faculty at Universitas Pertamina while maintaining full scholarship and active leadership roles.",
    tags: ["Academic", "Leadership", "Scholarship"],
    // images: [
    //   "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400",
    //   "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400"
    // ]
  },
  {
    id: "uper-model",
    title: "UPER Model - Campus Ambassador", 
    year: "2024",
    result: "Selected as official brand representative",
    description: "Chosen as campus ambassador and brand representative for Universitas Pertamina across social media campaigns and promotional activities.",
    tags: ["Campus", "Brand Ambassador", "Social Media"]
  },
  {
    id: "sirkel-uiux",
    title: "2nd Winner - UI/UX Design Competition MANUFEST 5.0", 
    year: "2023",
    result: "2nd place with Sirkel platform",
    description: "Led team developing 'Sirkel' - a community platform connecting entrepreneurs with Gen Z creative workers and content creators.",
    tags: ["UI/UX", "Team Leadership", "Entrepreneurship"],
    // images: [
    //   "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400",
    //   "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400",
    //   "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400"
    // ]
  },
  {
    id: "orquest-national",
    title: "National Finalist - Desain Aplikasi Quran Competition", 
    year: "2023",
    result: "11th place out of 50 teams",
    description: "Developed 'ORQUEST' - an Islamic educational game with quiz-based learning and mission-solving mechanics for MTQMN XVII competition.",
    tags: ["National", "Game Design", "Islamic Education"],
    // images: [
    //   "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400"
    // ]
  },
  {
    id: "chemistry-experiment",
    title: "1st Winner - Simple Chemistry Experiment Competition", 
    year: "2021",
    result: "1st place at Universitas Sriwijaya",
    description: "Combined video editing skills with chemistry experimentation to demonstrate redox reactions in creative and educational format.",
    tags: ["Chemistry", "Video Production", "Education"]
  },
  {
    id: "creative-video-national",
    title: "2nd Winner - Creative Video Competition", 
    year: "2021",
    result: "2nd place at national level",
    description: "Produced cinematic content promoting Indonesian natural resources awareness, competing against 10+ teams nationwide.",
    tags: ["National", "Video Production", "Environmental"]
  },
  {
    id: "vr-competition",
    title: "Top 10 Finalist - Virtual Reality Project Competition", 
    year: "2020",
    result: "9th out of 1,000 participants",
    description: "Created 360° Chemistry Laboratory VR environment for SEAMOLEC competition, showcasing immersive educational technology.",
    tags: ["VR Technology", "Education", "Innovation"]
  },
  {
    id: "penelitian-siswa-gold",
    title: "Gold Medal - Olimpiade Penelitian Siswa Indonesia", 
    year: "2018",
    result: "First gold medalist from South Sumatra",
    description: "Achieved gold medal representing South Sumatra province in Social Sciences and Culture field, analyzing youth community influence in Palembang.",
    tags: ["Research", "Social Sciences", "Provincial Representative"]
  }
];

const AchievementSection = ({ onClose }: { onClose: () => void }) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [windowState, setWindowState] = useState<WindowState>({
    x: Math.max(80, window.innerWidth / 2 - 450),
    y: Math.max(40, window.innerHeight / 2 - 380),
    width: Math.min(900, window.innerWidth - 100),
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

  const focusWindow = () => {};

  const openImageModal = (images: string[], startIndex: number = 0) => {
    setSelectedImages(images);
    setCurrentImageIndex(startIndex);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImages([]);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedImages.length - 1 : prev - 1
    );
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black/20 z-50 overflow-y-auto px-4 py-6 sm:p-8"
    >
      <DraggableSafariWindow
        id="achievementWindow"
        title=""
        url="amanda.portfolio/achievements"
        state={windowState}
        onUpdate={updateWindow}
        onClose={onClose}
        onFocus={focusWindow}
      >
        {/* Content Area */}
        <div className="h-full font-sf bg-white overflow-y-auto">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-medium text-gray-900 mb-3 font-sf">
                Achievements
              </h1>
              <p className="text-gray-600 leading-relaxed font-sf text-base">
                Academic and professional milestones highlighting my journey and accomplishments.
              </p>
            </div>
            
            {/* Achievement Cards Container */}
            <div className="space-y-6">
              {achievementsList.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-gray-200/80 p-6 hover:border-gray-300/80 transition-all duration-200 hover:shadow-sm"
                >
                  {/* Desktop Layout */}
                  <div className="hidden md:block">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="text-lg font-medium text-gray-900 font-sf leading-tight mb-1">
                          {achievement.title} | {achievement.year}
                        </h2>
                      </div>
                      
                      {/* Right: Result badge */}
                      {achievement.result && (
                        <div className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1.5 rounded-full border border-green-200/50 font-sf ml-4">
                          {achievement.result}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="block md:hidden mb-4">
                    <h2 className="text-lg font-medium text-gray-900 font-sf leading-tight mb-3">
                      {achievement.title} | {achievement.year}
                    </h2>
                    
                    {/* Result badge below title on mobile */}
                    {achievement.result && (
                      <div className="inline-block bg-green-50 text-green-700 text-sm font-medium px-3 py-1.5 rounded-full border border-green-200/50 font-sf">
                        {achievement.result}
                      </div>
                    )}
                  </div>
                  
                  {/* Project name */}
                  {achievement.project && (
                    <div className="mb-3">
                      <span className="text-sm font-medium text-blue-600 font-sf">
                        Project: {achievement.project}
                      </span>
                    </div>
                  )}
                  
                  {/* Description */}
                  {achievement.description && (
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed font-sf">
                      {achievement.description}
                    </p>
                  )}

                  {/* Tags */}
                  {achievement.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {achievement.tags.map((tag, index) => (
                        <MacOSSkillTag key={index} skill={tag} />
                      ))}
                    </div>
                  )}

                  {/* Image Thumbnails */}
                  {achievement.images && achievement.images.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {achievement.images.map((image, imageIndex) => (
                        <div
                          key={imageIndex}
                          className="relative flex-shrink-0 cursor-pointer group"
                          onClick={() => openImageModal(achievement.images!, imageIndex)}
                        >
                          <img
                            src={image}
                            alt={`${achievement.title} ${imageIndex + 1}`}
                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border border-gray-200 group-hover:border-blue-300 transition-all duration-200"
                          />
                          {achievement.images!.length > 1 && imageIndex === 0 && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                              {achievement.images!.length}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-all duration-200 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Bottom padding */}
            <div className="h-6"></div>
          </div>
        </div>
      </DraggableSafariWindow>
    </div>
  );
};

export default AchievementSection;
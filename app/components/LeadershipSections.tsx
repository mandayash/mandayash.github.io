import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DraggableSafariWindow, { WindowState } from "./DraggableSafariWindow";
import MacOSSkillTag from "./MacOSSkillTag";

interface LeadershipData {
  id: string;
  title: string;
  aspect: string;
  year: string;
  preview: string;
  description: string[];
  images: string[];
  // Tambahkan properties baru
  documentLink?: string;  // Link ke PDF report (optional)
  externalLinks?: {
    title: string;
    url: string;
    icon?: string;
  }[];  // Array links eksternal (optional)
}

// Link button component dengan macOS style

    const MacOSLinkButton = ({ 
    title, 
    url, 
    icon, 
    isPrimary = false 
  }: { 
    title: string; 
    url: string; 
    icon?: string;
    isPrimary?: boolean;
  }) => {
    return (
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-md 
          ${isPrimary ? 
            'bg-blue-500 text-white hover:bg-blue-600' : 
            'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'}
          transition-all duration-200 font-medium text-sm shadow-sm
        `}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {icon && icon.includes('/') ? (
        <img src={icon} alt={`${title} icon`} className="w-4 h-4" />
      ) : (
        <>
        {icon === 'github' && (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.215 0 1.605-.015 2.895-.015 3.285 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        )}
      {icon === 'youtube' && (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.5 6.2c-.3-1-1-1.8-2-2-1.8-.5-9-.5-9-.5s-7.2 0-9 .5c-1 .3-1.7 1-2 2-.5 1.8-.5 5.8-.5 5.8s0 4 .5 5.8c.3 1 1 1.8 2 2 1.8.5 9 .5 9 .5s7.2 0 9-.5c1-.3 1.7-1 2-2 .5-1.8.5-5.8.5-5.8s0-4-.5-5.8zm-13.3 9.3v-7l6 3.5-6 3.5z"/>
        </svg>
      )}
      {icon === 'kaggle' && (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.825 23.859c-.022.092-.097.15-.191.15h-2.866c-.094 0-.145-.058-.181-.135L9.403 12.688l-2.057 2.057v8.98c0 .163-.132.295-.295.295H4.215c-.162 0-.294-.132-.294-.295V.295c0-.162.132-.294.294-.294h2.836c.162 0 .294.132.294.294v9.737l6.306-6.306c.047-.047.109-.073.174-.073h3.128c.133 0 .204.107.154.227L11.24 9.95l7.492 13.735c.049.09.01.204-.084.225l.177-.052z"/>
        </svg>
      )}
      {icon === 'pdf' && (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/>
        </svg>
      )}
      </>
      )}

      <span>{title}</span>
    </motion.a>
  );
};

const leadershipList: LeadershipData[] = [
  {
    id: "IGCCoordinator",
    title: "Liaison Officer Coordinator",
    aspect: "Event Management & Coordination",
    year: "2025",
    preview: "Coordinated national green industry forum with 39 C-level speakers and 150+ participants",
    description: [
    "Managing 39 expert speakers including ministry directors and C-level executives sounds intense, right? That's exactly what I did as Liaison Officer Coordinator for Indonesia Green Connect 2025 at ITB. This wasn't just any forum - we were tackling Indonesia's Net Zero Emission 2060 roadmap with some of the country's top sustainability leaders.",
    "The real challenge hit when we had last-minute panel schedule changes (classic event management nightmare). But my team and I adapted quickly, kept all speakers coordinated, and delivered 7 strategic discussions without a hitch. Seeing 150+ participants engaged in conversations about Indonesia's green future made all those stressful coordination calls worth it."
    ],
    images: [
    "/images/leadership/igc-0.png",
    "/images/leadership/igc-1.jpg",
    "/images/leadership/igc-2.jpg",
    "/images/leadership/igc-3.jpg",
    "/images/leadership/igc-4.jpg"
    ],
    },
  {
    id: "FranceSummerSchool",
    title: "International Summer School Program",
    aspect: "Academic Exchange & Marine Technology",
    year: "2025",
    preview: "Only Indonesian selected for 3-week marine energy program in Brest, France",
    description: [
    "Picture this: being the only Indonesian among international students studying marine energy in Brest, France. That's how I spent 3 weeks diving deep into Science and Technology of the Sea, focusing on renewable marine energy and oceanic innovations that could transform how we think about sustainable power.",
    "The program was intense - French language immersion, cutting-edge maritime research, and collaborating with students from around the world. It wasn't just about marine technology; it was about seeing how different cultures approach sustainability challenges. Plus, my French definitely went from zero to 'can order coffee without pointing at the menu' by the end!"
    ],
    images: [
    "/images/leadership/france-1.png",
    "/images/leadership/france-2.png",
    "/images/leadership/france-3.png"
    ],
    },
    {
    id: "ResearchSpeaker",
    title: "Research Methodology Workshop Speaker",
    aspect: "Academic Speaking & Education",
    year: "2024",
    preview: "Delivered research fundamentals presentation to 50+ computer science freshmen",
    description: [
    "Remember being a confused freshman wondering how academic research actually works? I definitely do. That's why when I was asked to speak at Computer Science Student Orientation at my university, I jumped at the chance to demystify research for 50+ new students who were probably feeling just as lost as I once was.",
    "I covered everything from research ideation to competition opportunities, scientific report structure, and methodology basics. The best part? Seeing those 'aha!' moments when students realized research isn't some scary academic monster - it's actually a systematic way to solve problems they care about. The engagement and questions afterward showed they were genuinely excited to start their research journey."
    ],
    images: [
    "/images/leadership/research-speaker-1.png",
    "/images/leadership/research-speaker-2.png",
    "/images/leadership/research-speaker-3.png"
    ],
    },
    {
    id: "TechSavvySpeaker",
    title: "Tech Savvy Generation Guest Speaker",
    aspect: "Technology Education & Youth Development",
    year: "2024",
    preview: "Presented cutting-edge tech trends to IT students at SMK TI Bazma school orientation",
    description: [
    "What's cooler than talking about AI, AR/VR, and IoT to a room full of eager IT students? That's exactly what I did at SMK TI Bazma's school orientation, presenting 'Tech Savvy Generation: Preparing Young People for the Digital Era' to students who were just starting their tech journey.",
    "I covered everything from Indonesia's digital landscape to future challenges like cybersecurity and job automation. But the real magic happened during the Q&A session - these students asked incredibly thoughtful questions about adaptability, critical thinking, and digital collaboration. It reminded me why I love sharing knowledge: seeing young minds get excited about the endless possibilities in tech."
    ],
    images: [
    "/images/leadership/techsavvy-1.png",
    "/images/leadership/techsavvy-2.png",
    "/images/leadership/techsavvy-3.png"
    ],
    },
    {
    id: "GraphicDesignSpeaker",
    title: "Graphic Design Workshop Speaker",
    aspect: "Creative Education & Design Training",
    year: "2023",
    preview: "Taught design fundamentals and Photoshop to 30+ participants across Indonesia",
    description: [
    "Ever tried explaining design hierarchy to someone who's never touched Photoshop? That was my challenge when I spoke at the 'Transformer 6.0' webinar for UKM Riset dan Karya Ilmiah Heuri Cosmos. I had 30+ participants from across Indonesia eager to learn graphic design fundamentals - no pressure, right?",
    "I delivered comprehensive training covering design principles and hands-on Photoshop tutorials, then got to play judge for their design challenge competition. Watching participants go from 'I don't know what kerning is' to creating genuinely creative solutions was incredibly rewarding. The best part? Providing constructive feedback that actually helped them improve their visual problem-solving skills."
    ],
    images: [
    "/images/leadership/design-workshop-1.png",
    "/images/leadership/design-workshop-2.png",
    "/images/leadership/design-workshop-3.png"
    ],
    },
    {
    id: "POPMentor",
    title: "Mentor - University Orientation Program",
    aspect: "Student Mentoring & Leadership",
    year: "2024",
    preview: "Mentored 20 freshmen through 7-day university orientation with 'Glorious Collaboration' theme",
    description: [
    "Remember your first week of university? That mix of excitement and 'oh no, I have no idea what I'm doing'? I got to guide 20 freshmen through exactly that experience during Universitas Pertamina's orientation program, helping them navigate the transition from high school to college life.",
    "For 7 days, I was their go-to person for everything - from 'Where's the library?' to 'How do I not fail my first semester?' The theme was 'Glorious Collaboration: Building a Future with Integrity and Resilience,' but really it was about making sure these students felt supported and confident enough to tackle their academic journey. Seeing their transformation from nervous newbies to excited university students was honestly the highlight of my year."
    ],
    images: [
    "/images/leadership/mentor-1.png",
    "/images/leadership/mentor-2.png",
    "/images/leadership/mentor-3.png"
    ],
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

const LeadershipSection = ({ onClose }: { onClose: () => void }) => {
  const [selectedLeadership, setSelectedLeadership] = useState<LeadershipData>(
  leadershipList[0] || {
    id: "",
    title: "",
    aspect: "",
    year: "",
    preview: "",
    description: [],
    images: []
  }
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
        url="amanda.portfolio/activities"
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
                Projects
              </h2>
              <div className="space-y-2">
                {leadershipList.map((leadership) => (
                  <motion.div
                    key={leadership.id}
                    onClick={() => setSelectedLeadership(leadership)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedLeadership.id === leadership.id
                        ? "bg-blue-100 border-l-4 border-blue-500"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm text-gray-800 leading-tight font-sf">
                        {leadership.title}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2 whitespace-nowrap text-justify font-sf">
                        {leadership.year}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2 text-justify font-sf">
                      {leadership.aspect}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2 text-justify font-sf">
                      {leadership.preview}
                    </p>
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
                key={selectedLeadership.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Projects Header */}
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                      {selectedLeadership.aspect}
                    </span>
                    <span className="text-sm text-gray-500">
                      {selectedLeadership.year}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-3">
                    {selectedLeadership.title}
                  </h1>
                  <div className="text-gray-600 leading-relaxed space-y-4">
                    {selectedLeadership.description.map((paragraph, index) => (
                      <p key={index} className="text-justify font-sf">{paragraph}</p>
                    ))}
                  </div>
                </div>

                {selectedLeadership && selectedLeadership.externalLinks && selectedLeadership.externalLinks.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800 font-sf">
                      Project Resources
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedLeadership.externalLinks.map((link, index) => (
                        <MacOSLinkButton
                          key={index}
                          title={link.title}
                          url={link.url}
                          icon={link.icon}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Carousel */}
                <ImageCarousel images={selectedLeadership.images} />

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </DraggableSafariWindow>
    </div>
  );
};

export default LeadershipSection;

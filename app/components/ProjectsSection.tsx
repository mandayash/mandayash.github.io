import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DraggableSafariWindow, { WindowState } from "./DraggableSafariWindow";
import MacOSSkillTag from "./MacOSSkillTag";

interface ProjectData {
  id: string;
  company: string;
  position: string;
  location: string;
  period: string;
  preview: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  achievements: string[];
  images: string[];
  details: {
    industry?: string;
    companySize?: string;
    employmentType?: string;
    highlights: string[];
  };
}

const projectData: ProjectData[] = [
  {
    id: "HalalLens",
    company: "Halal Lens",
    position: "Project Leader",
    location: "Universitas Pertamina",
    period: "February 2025 - June 2025",
    preview:
      "Contributed to front-end development for Indonesia's largest e-commerce platform",
    description:
      "Worked with the front-end development team to enhance user interfaces and implement new features for Tokopedia's web and mobile platforms, focusing on performance optimization and responsive design.",
    responsibilities: [
      "Implemented new UI components and features using React.js",
      "Collaborated with designers to ensure accurate implementation of visual designs",
      "Optimized front-end performance and page load times",
      "Participated in code reviews and testing phases",
      "Contributed to responsive design implementation",
    ],
    skills: ["React.js", "TypeScript", "Redux", "Jest", "Responsive Design"],
    achievements: [
      "Improved page load time by 15% through code optimization",
      "Implemented 5+ new features with 100% design accuracy",
      "Reduced API response time by 20% through optimization",
      "Participated in successful migration from JavaScript to TypeScript",
    ],
    images: ["/images/experiences/testsaja.png", "/companies/tokopedia-office.jpg"],
    details: {
      // industry: 'E-commerce',
      // companySize: 'Large (1000+ employees)',
      // employmentType: 'Internship',
      highlights: [
        "Worked in Agile environment with 2-week sprints",
        "Contributed to Indonesia's largest e-commerce platform",
        "Gained experience in large-scale web application development",
        "Collaborated with cross-functional teams including designers, product managers, and backend engineers",
      ],
    },
  },
  {
    id: "telkom-indonesia",
    company: "PT. Telkom Indonesia",
    position: "UI/UX Design Intern",
    location: "Bandung, Indonesia",
    period: "June 2024 - August 2024",
    preview:
      "Created user interface designs and conducted usability testing for digital products",
    description:
      "Worked with the design team to create user-friendly interfaces for Telkom's digital products. Conducted user research and usability testing to improve user experience and interface design across multiple platforms.",
    responsibilities: [
      "Designed user interfaces for web and mobile applications",
      "Conducted user research and created user personas",
      "Performed usability testing and presented findings",
      "Created wireframes, prototypes, and high-fidelity mockups",
      "Collaborated with development teams during implementation",
    ],
    skills: [
      "Figma",
      "Adobe XD",
      "User Research",
      "Prototyping",
      "Usability Testing",
    ],
    achievements: [
      "Designed interfaces used by 50,000+ daily users",
      "Improved user satisfaction scores by 12%",
      "Created comprehensive design system adopted by 3 teams",
      "Received excellence recognition for usability testing methodology",
    ],
    images: ["/companies/telkom.jpg", "/companies/telkom-office.jpg"],
    details: {
      industry: "Telecommunications",
      companySize: "Enterprise (5000+ employees)",
      employmentType: "Internship",
      highlights: [
        "Worked on digital products used by millions of users",
        "Gained exposure to enterprise-level design processes",
        "Collaborated with multidisciplinary teams",
        "Contributed to Indonesia's largest telecommunications company",
      ],
    },
  },
  {
    id: "dicoding",
    company: "Dicoding Indonesia",
    position: "Technical Content Writer",
    location: "Remote",
    period: "September 2023 - March 2024",
    preview:
      "Created technical learning content focusing on web development and machine learning",
    description:
      "Developed comprehensive technical learning materials for Dicoding's education platform. Created coding tutorials, explanatory articles, and practical exercises focusing on web development and machine learning topics.",
    responsibilities: [
      "Researched and developed technical content for web development courses",
      "Created hands-on programming exercises and code examples",
      "Wrote clear explanations for complex technical concepts",
      "Reviewed and updated existing course materials",
      "Collaborated with subject matter experts to ensure content accuracy",
    ],
    skills: [
      "Technical Writing",
      "Web Development",
      "Machine Learning",
      "Educational Content Creation",
    ],
    achievements: [
      "Created content accessed by 10,000+ students",
      "Received 4.8/5 average content quality rating",
      "Developed 3 comprehensive learning modules",
      "Contributed to Bangkit Academy curriculum materials",
    ],
    images: ["/companies/dicoding.jpg"],
    details: {
      industry: "Education Technology",
      companySize: "Medium (100-500 employees)",
      employmentType: "Part-time",
      highlights: [
        "Developed educational content used by thousands of students",
        "Expanded technical knowledge across multiple domains",
        "Improved technical communication and teaching skills",
        "Contributed to Indonesia's leading tech education platform",
      ],
    },
  },
  {
    id: "google-dsc",
    company: "Google Developer Student Club",
    position: "Core Team Member",
    location: "University of Indonesia",
    period: "August 2023 - July 2024",
    preview:
      "Led technical workshops and mentored students in Google technologies",
    description:
      "Served as a core team member for Google Developer Student Club at the University of Indonesia. Organized and led technical workshops, mentored fellow students, and helped build a community of developers focused on Google technologies.",
    responsibilities: [
      "Organized technical workshops and coding sessions",
      "Mentored students in mobile and web development",
      "Coordinated hackathons and collaborative coding events",
      "Facilitated communication between students and Google Developer experts",
      "Created educational resources on Google technologies",
    ],
    skills: [
      "Leadership",
      "Event Management",
      "Android Development",
      "Google Cloud",
      "Public Speaking",
    ],
    achievements: [
      "Led 12+ successful technical workshops with 300+ attendees",
      "Organized hackathon with 150+ participants",
      "Increased club membership by 40%",
      "Received recognition from Google for community building",
    ],
    images: ["/companies/gdsc.jpg", "/companies/gdsc-event.jpg"],
    details: {
      industry: "Education / Community",
      companySize: "Student Organization",
      employmentType: "Volunteer",
      highlights: [
        "Developed leadership and communication skills",
        "Built technical community within university setting",
        "Expanded network with Google professionals",
        "Gained experience in organizing technical events and workshops",
      ],
    },
  },
  {
    id: "freelance",
    company: "Freelance",
    position: "Web Developer",
    location: "Remote",
    period: "2022 - Present",
    preview:
      "Developed custom websites and applications for various clients across industries",
    description:
      "Provided freelance web development services for multiple clients across different industries. Designed and developed custom websites, focusing on responsive design, performance optimization, and meeting client requirements.",
    responsibilities: [
      "Designed and developed custom websites from scratch",
      "Collaborated with clients to define project requirements",
      "Created responsive layouts for optimal viewing across devices",
      "Implemented custom functionalities based on client needs",
      "Provided maintenance and support services",
    ],
    skills: [
      "HTML/CSS",
      "JavaScript",
      "React",
      "WordPress",
      "Client Management",
    ],
    achievements: [
      "Completed 15+ projects with 100% client satisfaction",
      "Maintained 90% client retention rate",
      "Reduced average page load time to under 2 seconds",
      "Implemented SEO optimizations resulting in traffic increases",
    ],
    images: ["/companies/freelance.jpg"],
    details: {
      industry: "Various",
      companySize: "Independent",
      employmentType: "Freelance",
      highlights: [
        "Built portfolio of diverse projects across multiple industries",
        "Developed client management and communication skills",
        "Managed complete project lifecycle independently",
        "Gained experience in estimating, scoping, and delivering projects",
      ],
    },
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
    <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200 shadow-inner">
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
              className="w-full h-5/6 object-cover rounded-lg shadow-lg"
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
              className="w-full h-5/6 object-cover rounded-lg shadow-lg"
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md hover:bg-white"
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
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md hover:bg-white"
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

const ProjectsSection = ({ onClose }: { onClose: () => void }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectData>(
    projectData[0]
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
        <div className={`flex ${isMobile ? "flex-col" : "flex-row"} h-full`}>
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
                {projectData.map((project) => (
                  <motion.div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedProject.id === project.id
                        ? "bg-blue-100 border-l-4 border-blue-500"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm text-gray-800 leading-tight">
                        {project.company}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                        {project.period.split(" - ")[0]}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {project.position}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {project.preview}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.skills.slice(0, 2).map((skill, index) => (
                        <span
                          key={index}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{project.skills.length - 2}
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
                key={selectedProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Experience Header */}
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                      {selectedProject.position}
                    </span>
                    <span className="text-sm text-gray-500">
                      {selectedProject.period}
                    </span>
                    <span className="text-sm text-gray-500">
                      • {selectedProject.location}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-3">
                    {selectedProject.company}
                  </h1>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Image Carousel */}
                <ImageCarousel images={selectedProject.images} />

                {/* Experience Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">
                      Company Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      {selectedProject.details.industry && (
                        <div className="flex">
                          <span className="font-medium w-28">Industry:</span>
                          <span>{selectedProject.details.industry}</span>
                        </div>
                      )}
                      {selectedProject.details.companySize && (
                        <div className="flex">
                          <span className="font-medium w-28">
                            Company Size:
                          </span>
                          <span>{selectedProject.details.companySize}</span>
                        </div>
                      )}
                      {selectedProject.details.employmentType && (
                        <div className="flex">
                          <span className="font-medium w-28">
                            Position Type:
                          </span>
                          <span>
                            {selectedProject.details.employmentType}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Skills Utilized</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.skills.map((skill, index) => {
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
                  </div>

                {/* Key Responsibilities */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.responsibilities.map(
                      (responsibility, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{responsibility}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Experience Highlights */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Experience Highlights
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.details.highlights.map(
                      (highlight, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <span className="text-purple-500 mt-1">★</span>
                          <span>{highlight}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    Achievements
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.achievements.map(
                      (achievement, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <span className="text-green-500 mt-1">✓</span>
                          <span>{achievement}</span>
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

export default ProjectsSection;

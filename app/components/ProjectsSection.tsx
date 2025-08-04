import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectData {
  id: string;
  title: string;
  category: string;
  period: string;
  preview: string;
  description: string;
  technologies: string[];
  achievements: string[];
  images: string[];
  details: {
    role?: string;
    teamSize?: string;
    duration?: string;
    highlights: string[];
  };
}

const projectsData: ProjectData[] = [
  {
    id: 'halallens',
    title: 'HalalLens Mobile App',
    category: 'Software Development',
    period: 'February 2025 - June 2025',
    preview: 'Led development of halal food verification app with 5-member team, winning Best UI/UX Design award',
    description: 'A comprehensive mobile application for halal food verification that helps Muslim consumers identify halal products through advanced scanning and verification features.',
    technologies: ['React Native', 'JavaScript', 'UI/UX Design', 'Agile/Scrum'],
    achievements: [
      'Best UI/UX Design Award',
      'Most Inclusive Application Award',
      'Successfully completed within 4-month timeline',
      'Led requirement gathering and user research'
    ],
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    details: {
      role: 'Project Leader',
      teamSize: '5 members',
      duration: '4 months',
      highlights: [
        'Managed complete project lifecycle from research to deployment',
        'Led requirement gathering sessions and user research',
        'Ensured quality standards and user-centered design principles',
        'Achieved project success with dual award recognition'
      ]
    }
  },
  {
    id: 'lrt-crm',
    title: 'LRT Sumatera CRM System',
    category: 'Web Development',
    period: 'December 2024 - May 2025',
    preview: 'Developed CRM web application serving 30+ admin users and thousands of mobile app users',
    description: 'A customer relationship management web application built for LRT Sumatera Selatan to manage administrative operations and customer data efficiently.',
    technologies: ['React.js', 'JavaScript', 'RESTful API', 'Agile Development'],
    achievements: [
      'Served 30+ administrative users',
      'Managed data from thousands of mobile users',
      'Implemented 10-18 UI components',
      'Participated in agile development processes'
    ],
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    details: {
      role: 'Junior Front-End Engineer',
      teamSize: '6-8 members',
      duration: '6 months',
      highlights: [
        'Developed customer relationship management web application',
        'Implemented frontend using React.js and JavaScript frameworks',
        'Integrated RESTful APIs for seamless data management',
        'Participated in daily stand-ups and sprint planning'
      ]
    }
  },
  {
    id: 'sentiment-analysis',
    title: 'Green Economy Sentiment Analysis',
    category: 'Machine Learning',
    period: '2025',
    preview: 'Multi-task learning model using IndoBERT achieving 92.6% accuracy in aspect classification',
    description: 'Advanced machine learning project analyzing social media discussions about green economy and renewable energy using natural language processing techniques.',
    technologies: ['Python', 'IndoBERT', 'PyTorch', 'HuggingFace', 'NLP'],
    achievements: [
      '92.6% accuracy in aspect classification',
      '82.1% accuracy in sentiment analysis',
      'Analyzed 1,095 tweets from Indonesian social media',
      'Implemented LDA topic modeling'
    ],
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    details: {
      role: 'ML Engineer & Researcher',
      teamSize: 'Individual Project',
      duration: '3 months',
      highlights: [
        'Developed multi-task learning model for simultaneous classification',
        'Applied LDA topic modeling to identify discussion patterns',
        'Achieved high accuracy rates in both aspect and sentiment analysis',
        'Used cutting-edge NLP techniques with IndoBERT'
      ]
    }
  },
  {
    id: 'orangutan-habitat',
    title: 'Orangutan Habitat Optimization',
    category: 'Artificial Intelligence',
    period: '2024',
    preview: 'Genetic algorithm implementation for wildlife conservation corridor optimization',
    description: 'AI-powered solution for optimizing habitat corridors between Sebangau National Park and Bukit Baka Bukit Raya Forest to support orangutan conservation efforts.',
    technologies: ['Python', 'Genetic Algorithms', 'Spatial Analysis', 'Conservation Biology'],
    achievements: [
      'Implemented genetic algorithm for corridor optimization',
      'Applied computational intelligence for conservation',
      'Developed spatial analysis model for biodiversity',
      'Focused on environmental sustainability'
    ],
    images: [
      '/api/placeholder/600/400'
    ],
    details: {
      role: 'AI Developer',
      teamSize: 'Team Project',
      duration: '4 months',
      highlights: [
        'Implemented genetic algorithm for habitat corridor optimization',
        'Applied computational intelligence for wildlife conservation',
        'Developed spatial analysis model for biodiversity planning',
        'Contributed to environmental sustainability solutions'
      ]
    }
  },
  {
    id: 'co2-prediction',
    title: 'CO2 Emission Prediction Model',
    category: 'Data Science',
    period: '2024',
    preview: 'Comparative analysis of prediction models for Indonesia\'s CO2 emissions to 2030',
    description: 'Mathematical modeling project comparing different prediction models to forecast Indonesia\'s CO2 emissions and support environmental policy decisions.',
    technologies: ['Python', 'Statistical Modeling', 'Time Series Analysis', 'Data Science'],
    achievements: [
      'Comparative analysis of multiple prediction models',
      'CO2 emissions projections to 2030',
      'Statistical analysis and model validation',
      'Environmental forecasting applications'
    ],
    images: [
      '/api/placeholder/600/400'
    ],
    details: {
      role: 'Data Scientist',
      teamSize: 'Individual Project',
      duration: '2 months',
      highlights: [
        'Conducted comparative analysis of prediction models',
        'Developed projections for Indonesia\'s CO2 emissions to 2030',
        'Performed comprehensive statistical analysis and validation',
        'Applied environmental data science techniques'
      ]
    }
  }
];

// Image Carousel Component
const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden bg-gray-100">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Project image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>
      
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            ←
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            →
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

interface WindowState {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
}

interface SafariWindowProps {
  id: string;
  title: string;
  url: string;
  children: React.ReactNode;
  state: WindowState;
  onUpdate: (id: string, updates: Partial<WindowState>) => void;
  onClose: () => void;
  onFocus: () => void;
}

// Draggable Safari Window Component
const DraggableSafariWindow = ({ 
  id, 
  title,
  url, 
  children, 
  state, 
  onUpdate, 
  onClose,
  onFocus 
}: SafariWindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const isMobile = useRef(false);

  // Check if on mobile
  useEffect(() => {
    isMobile.current = window.innerWidth < 768;
    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    if (isMobile.current) return; 

    e.stopPropagation();
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - state.x,
      y: e.clientY - state.y
    });
    onFocus();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isResizing) {
      onUpdate(id, {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
    
    if (isResizing) {
      const newWidth = Math.max(300, resizeStart.width + (e.clientX - resizeStart.x));
      const newHeight = Math.max(200, resizeStart.height + (e.clientY - resizeStart.y));
      onUpdate(id, {
        width: newWidth,
        height: newHeight
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  // Handle resize
  const handleResizeStart = (e: React.MouseEvent) => {
    if (isMobile.current) return; // Disable resizing on mobile
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      width: state.width,
      height: state.height,
      x: e.clientX,
      y: e.clientY
    });
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart]);

  return (
    <motion.div
      ref={windowRef}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-2xl overflow-hidden"
      style={{
        position: isMobile.current ? 'relative' : 'absolute',
        left: isMobile.current ? 'auto' : `${state.x}px`,
        top: isMobile.current ? 'auto' : `${state.y}px`,
        width: isMobile.current ? '100%' : `${state.width}px`,
        height: isMobile.current ? 'auto' : `${state.height}px`,
        maxHeight: isMobile.current ? '80vh' : 'auto',
        zIndex: state.zIndex,
        cursor: isDragging ? 'grabbing' : 'auto',
        margin: isMobile.current ? '0 auto' : 0,
      }}
      onMouseDown={() => onFocus()}
    >
      {/* Window Header */}
      <div 
        className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b cursor-grab select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex gap-2 window-controls">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            aria-label="Close window"
          />
          {/* Tombol kuning tanpa interaksi */}
          <div 
            className="w-3 h-3 bg-yellow-500 rounded-full"
            aria-hidden="true"
          />
          {/* Tombol hijau tanpa interaksi */}
          <div 
            className="w-3 h-3 bg-green-500 rounded-full"
            aria-hidden="true" 
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Title */}
          {title && <span className="font-medium text-xs mb-1 hidden sm:block">{title}</span>}
          {/* URL */}
          <div className="bg-gray-200 rounded px-3 py-1 text-xs inline-block truncate max-w-[200px] sm:max-w-none">
            {url}
          </div>
        </div>
      </div>
      
      {/* Window Content */}
      <div className={`overflow-auto ${isMobile.current ? 'max-h-[60vh]' : 'h-[calc(100%-48px)]'}`}>
        {children}
      </div>
      
      {/* Resize Handle - Hide on mobile */}
      {!isMobile.current && (
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={handleResizeStart}
        >
          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 16 16">
            <path fill="currentColor" d="M13 13L3 3M13 9L9 13M13 5L5 13" strokeWidth="1" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};


const ProjectsSection = ({ onClose }: { onClose: () => void }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectData>(projectsData[0]);
  const [isMobile, setIsMobile] = useState(false);
  
  // Tambahkan state untuk window
  const [windowState, setWindowState] = useState<WindowState>({
    x: Math.max(50, window.innerWidth / 2 - 400),
    y: Math.max(50, window.innerHeight / 2 - 300),
    width: Math.min(800, window.innerWidth - 100),
    height: Math.min(600, window.innerHeight - 100),
    zIndex: 999,
    isMinimized: false
  });

  // Fungsi untuk mengupdate window
  const updateWindow = (_id: string, updates: Partial<WindowState>) => {
    setWindowState(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Fungsi untuk focus window (tidak perlu diimplementasikan, tapi tetap disediakan)
  const focusWindow = () => {
    // Tidak perlu implementasi khusus karena hanya ada 1 window
  };

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      // Update window state for mobile
      if (isMobileView) {
        setWindowState(prev => ({
          ...prev,
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight - 100
        }));
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/30 z-50 overflow-y-auto px-4 py-6 sm:p-8">
      {/* Close button - sembunyikan saat menggunakan DraggableWindow */}
      {isMobile && (
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-[9999] bg-white/80 backdrop-blur rounded-full p-2 hover:bg-white transition-colors shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Main Window - Gunakan DraggableSafariWindow */}
      <DraggableSafariWindow
        id="projectsWindow"
        title="Projects"
        url="amanda.portfolio/projects"
        state={windowState}
        onUpdate={updateWindow}
        onClose={onClose}
        onFocus={focusWindow}
      >
        {/* Content Area */}
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} h-full`}>
          {/* Sidebar - Project List */}
          <div className={`${isMobile ? 'h-48 overflow-y-auto' : 'w-80 h-full overflow-y-auto'} bg-gray-50 border-r`}>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">My Projects</h2>
              <div className="space-y-2">
                {projectsData.map((project) => (
                  <motion.div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedProject.id === project.id
                        ? 'bg-blue-100 border-l-4 border-blue-500'
                        : 'bg-white hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm text-gray-800 leading-tight">
                        {project.title}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                        {project.period.split(' - ')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{project.category}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{project.preview}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.slice(0, 2).map((tech, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 2 && (
                        <span className="text-xs text-gray-500">+{project.technologies.length - 2}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={`${isMobile ? 'flex-1 overflow-y-auto' : 'flex-1 overflow-y-auto'} p-6}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Project Header */}
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {selectedProject.category}
                    </span>
                    <span className="text-sm text-gray-500">{selectedProject.period}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-3">
                    {selectedProject.title}
                  </h1>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Image Carousel */}
                <ImageCarousel images={selectedProject.images} />

                {/* Project Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Project Details</h3>
                    <div className="space-y-2 text-sm">
                      {selectedProject.details.role && (
                        <div className="flex">
                          <span className="font-medium w-24">Role:</span>
                          <span>{selectedProject.details.role}</span>
                        </div>
                      )}
                      {selectedProject.details.teamSize && (
                        <div className="flex">
                          <span className="font-medium w-24">Team Size:</span>
                          <span>{selectedProject.details.teamSize}</span>
                        </div>
                      )}
                      {selectedProject.details.duration && (
                        <div className="flex">
                          <span className="font-medium w-24">Duration:</span>
                          <span>{selectedProject.details.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Key Highlights</h3>
                  <ul className="space-y-2">
                    {selectedProject.details.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Achievements</h3>
                  <ul className="space-y-2">
                    {selectedProject.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
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
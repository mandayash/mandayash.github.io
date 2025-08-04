import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DraggableSafariWindow, { WindowState } from './DraggableSafariWindow';

interface ExperienceData {
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

const experienceData: ExperienceData[] = [
  {
    id: 'HalalLens',
    company: 'Halal Lens',
    position: 'Project Leader',
    location: 'Universitas Pertamina',
    period: 'February 2025 - June 2025',
    preview: 'Contributed to front-end development for Indonesia\'s largest e-commerce platform',
    description: 'Worked with the front-end development team to enhance user interfaces and implement new features for Tokopedia\'s web and mobile platforms, focusing on performance optimization and responsive design.',
    responsibilities: [
      'Implemented new UI components and features using React.js',
      'Collaborated with designers to ensure accurate implementation of visual designs',
      'Optimized front-end performance and page load times',
      'Participated in code reviews and testing phases',
      'Contributed to responsive design implementation'
    ],
    skills: ['React.js', 'TypeScript', 'Redux', 'Jest', 'Responsive Design'],
    achievements: [
      'Improved page load time by 15% through code optimization',
      'Implemented 5+ new features with 100% design accuracy',
      'Reduced API response time by 20% through optimization',
      'Participated in successful migration from JavaScript to TypeScript'
    ],
    images: [
      '/companies/tokopedia.jpg',
      '/companies/tokopedia-office.jpg'
    ],
    details: {
      // industry: 'E-commerce',
      // companySize: 'Large (1000+ employees)',
      // employmentType: 'Internship',
      highlights: [
        'Worked in Agile environment with 2-week sprints',
        'Contributed to Indonesia\'s largest e-commerce platform',
        'Gained experience in large-scale web application development',
        'Collaborated with cross-functional teams including designers, product managers, and backend engineers'
      ]
    }
  },
  {
    id: 'telkom-indonesia',
    company: 'PT. Telkom Indonesia',
    position: 'UI/UX Design Intern',
    location: 'Bandung, Indonesia',
    period: 'June 2024 - August 2024',
    preview: 'Created user interface designs and conducted usability testing for digital products',
    description: 'Worked with the design team to create user-friendly interfaces for Telkom\'s digital products. Conducted user research and usability testing to improve user experience and interface design across multiple platforms.',
    responsibilities: [
      'Designed user interfaces for web and mobile applications',
      'Conducted user research and created user personas',
      'Performed usability testing and presented findings',
      'Created wireframes, prototypes, and high-fidelity mockups',
      'Collaborated with development teams during implementation'
    ],
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Usability Testing'],
    achievements: [
      'Designed interfaces used by 50,000+ daily users',
      'Improved user satisfaction scores by 12%',
      'Created comprehensive design system adopted by 3 teams',
      'Received excellence recognition for usability testing methodology'
    ],
    images: [
      '/companies/telkom.jpg',
      '/companies/telkom-office.jpg'
    ],
    details: {
      industry: 'Telecommunications',
      companySize: 'Enterprise (5000+ employees)',
      employmentType: 'Internship',
      highlights: [
        'Worked on digital products used by millions of users',
        'Gained exposure to enterprise-level design processes',
        'Collaborated with multidisciplinary teams',
        'Contributed to Indonesia\'s largest telecommunications company'
      ]
    }
  },
  {
    id: 'dicoding',
    company: 'Dicoding Indonesia',
    position: 'Technical Content Writer',
    location: 'Remote',
    period: 'September 2023 - March 2024',
    preview: 'Created technical learning content focusing on web development and machine learning',
    description: 'Developed comprehensive technical learning materials for Dicoding\'s education platform. Created coding tutorials, explanatory articles, and practical exercises focusing on web development and machine learning topics.',
    responsibilities: [
      'Researched and developed technical content for web development courses',
      'Created hands-on programming exercises and code examples',
      'Wrote clear explanations for complex technical concepts',
      'Reviewed and updated existing course materials',
      'Collaborated with subject matter experts to ensure content accuracy'
    ],
    skills: ['Technical Writing', 'Web Development', 'Machine Learning', 'Educational Content Creation'],
    achievements: [
      'Created content accessed by 10,000+ students',
      'Received 4.8/5 average content quality rating',
      'Developed 3 comprehensive learning modules',
      'Contributed to Bangkit Academy curriculum materials'
    ],
    images: [
      '/companies/dicoding.jpg'
    ],
    details: {
      industry: 'Education Technology',
      companySize: 'Medium (100-500 employees)',
      employmentType: 'Part-time',
      highlights: [
        'Developed educational content used by thousands of students',
        'Expanded technical knowledge across multiple domains',
        'Improved technical communication and teaching skills',
        'Contributed to Indonesia\'s leading tech education platform'
      ]
    }
  },
  {
    id: 'google-dsc',
    company: 'Google Developer Student Club',
    position: 'Core Team Member',
    location: 'University of Indonesia',
    period: 'August 2023 - July 2024',
    preview: 'Led technical workshops and mentored students in Google technologies',
    description: 'Served as a core team member for Google Developer Student Club at the University of Indonesia. Organized and led technical workshops, mentored fellow students, and helped build a community of developers focused on Google technologies.',
    responsibilities: [
      'Organized technical workshops and coding sessions',
      'Mentored students in mobile and web development',
      'Coordinated hackathons and collaborative coding events',
      'Facilitated communication between students and Google Developer experts',
      'Created educational resources on Google technologies'
    ],
    skills: ['Leadership', 'Event Management', 'Android Development', 'Google Cloud', 'Public Speaking'],
    achievements: [
      'Led 12+ successful technical workshops with 300+ attendees',
      'Organized hackathon with 150+ participants',
      'Increased club membership by 40%',
      'Received recognition from Google for community building'
    ],
    images: [
      '/companies/gdsc.jpg',
      '/companies/gdsc-event.jpg'
    ],
    details: {
      industry: 'Education / Community',
      companySize: 'Student Organization',
      employmentType: 'Volunteer',
      highlights: [
        'Developed leadership and communication skills',
        'Built technical community within university setting',
        'Expanded network with Google professionals',
        'Gained experience in organizing technical events and workshops'
      ]
    }
  },
  {
    id: 'freelance',
    company: 'Freelance',
    position: 'Web Developer',
    location: 'Remote',
    period: '2022 - Present',
    preview: 'Developed custom websites and applications for various clients across industries',
    description: 'Provided freelance web development services for multiple clients across different industries. Designed and developed custom websites, focusing on responsive design, performance optimization, and meeting client requirements.',
    responsibilities: [
      'Designed and developed custom websites from scratch',
      'Collaborated with clients to define project requirements',
      'Created responsive layouts for optimal viewing across devices',
      'Implemented custom functionalities based on client needs',
      'Provided maintenance and support services'
    ],
    skills: ['HTML/CSS', 'JavaScript', 'React', 'WordPress', 'Client Management'],
    achievements: [
      'Completed 15+ projects with 100% client satisfaction',
      'Maintained 90% client retention rate',
      'Reduced average page load time to under 2 seconds',
      'Implemented SEO optimizations resulting in traffic increases'
    ],
    images: [
      '/companies/freelance.jpg'
    ],
    details: {
      industry: 'Various',
      companySize: 'Independent',
      employmentType: 'Freelance',
      highlights: [
        'Built portfolio of diverse projects across multiple industries',
        'Developed client management and communication skills',
        'Managed complete project lifecycle independently',
        'Gained experience in estimating, scoping, and delivering projects'
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
          alt={`Experience image ${currentIndex + 1}`}
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

const ExperienceSection = ({ onClose }: { onClose: () => void }) => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceData>(experienceData[0]);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [windowState, setWindowState] = useState<WindowState>({
    x: Math.max(80, window.innerWidth / 2 - 450),
    y: Math.max(40, window.innerHeight / 2 - 380),
    width: Math.min(980, window.innerWidth - 100),
    height: Math.min(750, window.innerHeight - 100),
    zIndex: 999,
    isMinimized: false
  });

  // Handle click outside
  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.current === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      // Update window state for mobile
      if (isMobileView) {
        setWindowState(prev => ({
          ...prev,
          x: 10,
          y: 60,
          width: window.innerWidth - 40,
          height: window.innerHeight - 140
        }));
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateWindow = (_id: string, updates: Partial<WindowState>) => {
    setWindowState(prev => ({
      ...prev,
      ...updates
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
        title="Experience"
        url="amanda.portfolio/experience"
        state={windowState}
        onUpdate={updateWindow}
        onClose={onClose}
        onFocus={focusWindow}
      >

        {/* Content Area */}
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} h-full`}>
          {/* Sidebar - Experience List */}
          <div className={`${isMobile ? 'h-48 overflow-y-auto' : 'w-80 h-full overflow-y-auto'} bg-gray-50 border-r`}>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Professional Experience</h2>
              <div className="space-y-2">
                {experienceData.map((experience) => (
                  <motion.div
                    key={experience.id}
                    onClick={() => setSelectedExperience(experience)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedExperience.id === experience.id
                        ? 'bg-blue-100 border-l-4 border-blue-500'
                        : 'bg-white hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm text-gray-800 leading-tight">
                        {experience.company}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                        {experience.period.split(' - ')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{experience.position}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{experience.preview}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {experience.skills.slice(0, 2).map((skill, index) => (
                        <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                      {experience.skills.length > 2 && (
                        <span className="text-xs text-gray-500">+{experience.skills.length - 2}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={`${isMobile ? 'flex-1 overflow-y-auto' : 'flex-1 overflow-y-auto'} p-6`}>
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
                    <span className="text-sm text-gray-500">{selectedExperience.period}</span>
                    <span className="text-sm text-gray-500">• {selectedExperience.location}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-3">
                    {selectedExperience.company}
                  </h1>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedExperience.description}
                  </p>
                </div>

                {/* Image Carousel */}
                <ImageCarousel images={selectedExperience.images} />

                {/* Experience Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Company Details</h3>
                    <div className="space-y-2 text-sm">
                      {selectedExperience.details.industry && (
                        <div className="flex">
                          <span className="font-medium w-28">Industry:</span>
                          <span>{selectedExperience.details.industry}</span>
                        </div>
                      )}
                      {selectedExperience.details.companySize && (
                        <div className="flex">
                          <span className="font-medium w-28">Company Size:</span>
                          <span>{selectedExperience.details.companySize}</span>
                        </div>
                      )}
                      {selectedExperience.details.employmentType && (
                        <div className="flex">
                          <span className="font-medium w-28">Position Type:</span>
                          <span>{selectedExperience.details.employmentType}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Skills Utilized</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedExperience.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Key Responsibilities</h3>
                  <ul className="space-y-2">
                    {selectedExperience.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Experience Highlights */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Experience Highlights</h3>
                  <ul className="space-y-2">
                    {selectedExperience.details.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-purple-500 mt-1">★</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Achievements</h3>
                  <ul className="space-y-2">
                    {selectedExperience.achievements.map((achievement, index) => (
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

export default ExperienceSection;
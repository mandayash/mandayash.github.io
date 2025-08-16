import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DraggableSafariWindow, { WindowState } from "./DraggableSafariWindow";

// Skill categories with progress indicators
const skillsData = {
  "Programming Languages": [
    { name: "JavaScript", level: 90, icon: "⚡" },
    { name: "HTML5 & CSS3", level: 95, icon: "🎨" },
    { name: "Python", level: 80, icon: "🐍" },
    { name: "SQL", level: 85, icon: "💾" }
  ],
  "Frontend Technologies": [
    { name: "React.js", level: 90, icon: "⚛️" },
    { name: "Tailwind CSS", level: 88, icon: "🎯" },
    { name: "Responsive Design", level: 92, icon: "📱" },
    { name: "RESTful API Integration", level: 85, icon: "🔗" }
  ],
  "Data & Analytics": [
    { name: "Machine Learning", level: 75, icon: "🤖" },
    { name: "Data Visualization", level: 80, icon: "📊" },
    { name: "Power BI", level: 75, icon: "📈" },
    { name: "Google Looker Studio", level: 82, icon: "🔍" }
  ],
  "Tools & Platforms": [
    { name: "Git & Version Control", level: 88, icon: "📝" },
    { name: "Adobe Creative Suite", level: 85, icon: "🎨" },
    { name: "Figma", level: 90, icon: "✨" },
    { name: "Oracle Database", level: 80, icon: "🗄️" }
  ],
  "Soft Skills": [
    { name: "Project Management", level: 90, icon: "🎯" },
    { name: "Team Leadership", level: 88, icon: "👥" },
    { name: "UI/UX Design", level: 87, icon: "🎨" },
    { name: "Public Speaking", level: 85, icon: "🎤" }
  ]
};

const organizationsData = [
  {
    id: "himakti",
    name: "Himpunan Mahasiswa Ilmu Komputer",
    role: "Member of AcademyUP Division",
    period: "Jan 2024 – Dec 2024",
    description: "Organized programming workshops and IT-related information sessions to enhance student technical capabilities.",
    activities: ["Programming Workshops", "Academic Development", "Student Mentoring"]
  },
  {
    id: "student-council",
    name: "Student Council SMAN Sumatera Selatan",
    role: "Minister of Information, Communication, and Technology",
    period: "Jan 2021 – Jan 2022",
    description: "Led ICT division earning 'Best Ministry' and 'Most Disciplined Ministry' awards through exceptional performance.",
    activities: ["Digital Literacy Programs", "Event Design Strategy", "Technology Integration"]
  }
];

const educationData = [
  {
    id: "university",
    level: "Bachelor's Degree",
    field: "Computer Science",
    institution: "Universitas Pertamina",
    location: "Jakarta, Indonesia",
    period: "2022 - 2026 (Expected)",
    gpa: "3.82",
    achievements: [
      "Karakter Unggulan Full Scholarship Awardee",
      "Selected as Best Student in Faculty"
    ],
    courses: [
      "Data Structures & Algorithms",
      "Machine Learning",
      "Database Systems",
      "Software Engineering",
      "Artificial Intelligence",
      "Web Development"
    ]
  },
  {
    id: "high-school",
    level: "High School Diploma",
    field: "Science",
    institution: "SMAN Sumatera Selatan",
    location: "Sumatera Selatan, Indonesia",
    period: "2019 – 2022",
    achievements: [
      "Won 10+ competitions from provincial to national level",
      "Selected as Putri SMAN Sumatera Selatan – School Ambassador"
    ]
  },
  {
    id: "summer-school",
    level: "International Program",
    field: "Science & Technology of The Sea",
    institution: "French Sciences – CIEL Bretagne",
    location: "Brest, France",
    period: "June 2025 - July 2025",
    achievements: [
      "Only Indonesian participant among international students",
      "Completed 3-week intensive program on marine energy"
    ]
  }
];

const EduSection = ({ onClose }: { onClose: () => void }) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'skills' | 'organizations' | 'education'>('skills');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('Programming Languages');

  const [windowState, setWindowState] = useState<WindowState>({
    x: Math.max(80, window.innerWidth / 2 - 500),
    y: Math.max(40, window.innerHeight / 2 - 400),
    width: Math.min(1000, window.innerWidth - 100),
    height: Math.min(800, window.innerHeight - 100),
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

  const tabs = [
    { id: 'skills', name: 'Skills', icon: '⚡' },
    { id: 'organizations', name: 'Organizations', icon: '🏢' },
    { id: 'education', name: 'Education', icon: '🎓' }
  ];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black/20 z-50 overflow-y-auto px-4 py-6 sm:p-8"
    >
      <DraggableSafariWindow
        id="eduWindow"
        title=""
        url="amanda.portfolio/education"
        state={windowState}
        onUpdate={updateWindow}
        onClose={onClose}
        onFocus={focusWindow}
      >
        <div className="h-full font-sf bg-white overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 pb-4">
            <h1 className="text-3xl font-medium text-gray-900 mb-2 font-sf">
              Skills, Organizations & Education
            </h1>
            <p className="text-gray-600 leading-relaxed font-sf text-base">
              My technical expertise, organizational involvement, and educational journey.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 pb-2">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className={`${isMobile ? 'hidden sm:inline' : ''}`}>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <AnimatePresence mode="wait">
              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Skills Category Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.keys(skillsData).map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedSkillCategory(category)}
                        className={`p-4 rounded-xl text-left transition-all duration-200 ${
                          selectedSkillCategory === category
                            ? 'bg-blue-50 border-2 border-blue-200 text-blue-800'
                            : 'bg-gray-50 border-2 border-transparent hover:border-gray-200 text-gray-700'
                        }`}
                      >
                        <div className="font-medium text-sm">{category}</div>
                        <div className="text-xs opacity-70 mt-1">
                          {skillsData[category as keyof typeof skillsData].length} skills
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Selected Skills Display */}
                  <motion.div
                    key={selectedSkillCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {selectedSkillCategory}
                    </h3>
                    <div className="space-y-4">
                      {skillsData[selectedSkillCategory as keyof typeof skillsData].map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <span className="text-lg">{skill.icon}</span>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-gray-800">{skill.name}</span>
                              <span className="text-sm text-gray-600">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-white rounded-full h-2">
                              <motion.div
                                className="bg-blue-500 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === 'organizations' && (
                <motion.div
                  key="organizations"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {organizationsData.map((org, index) => (
                    <motion.div
                      key={org.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{org.name}</h3>
                          <p className="text-purple-700 font-medium">{org.role}</p>
                        </div>
                        <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                          {org.period}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">{org.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {org.activities.map((activity, actIndex) => (
                          <span
                            key={actIndex}
                            className="bg-white text-purple-700 text-xs px-3 py-1 rounded-full border border-purple-200"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'education' && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {educationData.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{edu.level} in {edu.field}</h3>
                          <p className="text-green-700 font-medium">{edu.institution}</p>
                          <p className="text-gray-600 text-sm">{edu.location}</p>
                        </div>
                        <div className="text-right">
                          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                            {edu.period}
                          </span>
                          {edu.gpa && (
                            <div className="mt-2">
                              <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                                GPA: {edu.gpa}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {edu.achievements && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-800 mb-2">Achievements</h4>
                          <div className="space-y-1">
                            {edu.achievements.map((achievement, achIndex) => (
                              <div key={achIndex} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                <span className="text-gray-700 text-sm">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {edu.courses && (
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Key Courses</h4>
                          <div className="flex flex-wrap gap-2">
                            {edu.courses.map((course, courseIndex) => (
                              <span
                                key={courseIndex}
                                className="bg-white text-green-700 text-xs px-3 py-1 rounded-full border border-green-200"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DraggableSafariWindow>
    </div>
  );
};

export default EduSection;
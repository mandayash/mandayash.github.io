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
  {
 id: "TryFitBar",
 company: "TRYFITBAR",
 position: "Social Media Strategist & Content Analyst",
 location: "UAE (Remote)",
 period: "April 2025 - July 2025",
 preview: "Revitalized dormant social media presence for UAE-based healthy meal delivery brand, achieving 105.3% increase in views",
 description: [
   "TRYFITBAR is a UAE-based healthy meal delivery brand that had been struggling with dormant social media presence for months. As their Social Media Strategist & Content Analyst, I was brought in to rebuild their digital footprint and reconnect with their audience through strategic content planning and data-driven approaches.",
   "My role involved comprehensive social media revitalization, from analyzing previous performance gaps to developing fresh content strategies that resonated with health-conscious consumers in the UAE market. The focus was on creating engaging, culturally relevant content that showcased their healthy meal options while building genuine community engagement across multiple platforms."
 ],
 responsibilities: [
   "Analyzed and revitalized dormant social media accounts after months of brand inactivity",
   "Developed integrated content strategy across Instagram and Facebook platforms",
   "Created and executed 50+ pieces of content including feeds, stories, and reels",
   "Monitored and analyzed social media performance metrics to optimize content strategy",
   "Implemented cross-platform content mirroring to maximize reach and engagement"
 ],
 skills: [
   "Social Media Strategy", 
   "Content Creation & Planning", 
   "Performance Analytics", 
   "Cross-Platform Marketing", 
   "Brand Revitalization",
   "Remote Collaboration"
 ],
 achievements: [
   "Achieved 105.3% increase in social media views, reaching 380K+ total views",
   "Generated 7.9% growth in reach with 134K+ people reached across platforms",
   "Delivered 306.5% surge in content interactions and audience engagement",
   "Maintained steady website traffic at 3.7K visits during campaign period",
   "Successfully produced and published 50+ pieces of strategic content in 4 months",
   "Rebuilt brand visibility from dormant state to active, engaging social presence"
 ],
 images: [
   "/images/experiences/fitbar-1.png", 
   "/images/experiences/fitbar-2.png", 
   "/images/experiences/fitbar-3.png", 
   "/images/experiences/fitbar-4.png", 
 ],
},
{
 id: "MeetsinID",
 company: "Meetsin.ID",
 position: "Junior Front-End Engineer",
 location: "Palembang, Indonesia",
 period: "December 2024 - May 2025",
 preview: "Developed CRM web application for LRT Sumatera Selatan, serving 30+ admin users and managing thousands of mobile user data",
 description: [
   "Meetsin.ID is a technology company based in Palembang that develops digital solutions for various clients. During my internship as Junior Front-End Engineer, I worked on a customer relationship management web application specifically designed for LRT Sumatera Selatan to streamline their administrative operations and customer data management.",
   "The project involved creating a comprehensive web-based CRM system that bridges the gap between administrative staff and mobile app users. My focus was on developing user-friendly interfaces that could efficiently handle large volumes of data while maintaining optimal performance and user experience for the administrative team."
 ],
 responsibilities: [
   "Developed 10-18 user interface components for customer relationship management system",
   "Implemented frontend solutions using React.js and JavaScript frameworks",
   "Integrated RESTful APIs to ensure seamless data flow between frontend and backend systems",
   "Participated in agile development processes including daily stand-ups and sprint planning",
   "Collaborated with cross-functional teams to deliver scalable web application solutions"
 ],
 skills: [
   "React.js",
   "JavaScript",
   "RESTful API Integration",
   "Frontend Development",
   "Agile Development",
   "UI/UX Implementation",
   "Team Collaboration"
 ],
 achievements: [
   "Successfully developed and deployed CRM web application within 6-month timeline",
   "Served 30+ administrative users with efficient and user-friendly interface",
   "Managed data integration for thousands of mobile app users seamlessly",
   "Contributed to 10-18 reusable UI components for the application architecture",
   "Actively participated in agile methodologies improving team productivity and project delivery",
   "Gained practical experience in enterprise-level web application development"
 ],
 images: [
   "/images/experiences/meetsin-1.png",
   "/images/experiences/meetsin-2.png",
   "/images/experiences/meetsin-3.png",
   "/images/experiences/meetsin-4.png"
 ],
},
{
 id: "UIUXINDO",
 company: "UIUXINDO",
 position: "Junior Data Analyst & Content Strategist",
 location: "Jakarta, Indonesia",
 period: "May 2023 - April 2025",
 preview: "Grew social media following from 9K to 19K followers (111% growth) through data-driven content strategy and analytics",
 description: [
   "UIUXINDO is a leading UI/UX design community in Indonesia that organizes events, workshops, and educational content for design professionals. As Junior Data Analyst & Content Strategist, I was responsible for leveraging data insights to optimize their digital presence and improve event engagement rates across multiple platforms.",
   "My role involved combining data analysis with content strategy to drive measurable growth in community engagement and event participation. I worked closely with the marketing team to implement data-driven approaches that significantly improved their social media performance and event registration rates over a 2-year period."
 ],
 responsibilities: [
   "Analyzed user engagement data and metrics to optimize content strategy for increased event registration",
   "Implemented data-driven decision making processes that improved performance tracking capabilities",
   "Collaborated with cross-functional teams to develop analytics dashboards using Meta Business Suite",
   "Applied statistical analysis and A/B testing methodologies to enhance campaign effectiveness",
   "Created comprehensive reporting systems to track social media growth and engagement metrics"
 ],
 skills: [
   "Data Analysis",
   "Content Strategy",
   "Statistical Analysis",
   "A/B Testing",
   "Meta Business Suite",
   "Performance Analytics",
   "Social Media Analytics",
   "Dashboard Development"
 ],
 achievements: [
   "Achieved 111% increase in social media following, growing from 9K to 19K followers over 2 years",
   "Improved performance tracking capabilities by 111% through data-driven implementation",
   "Successfully optimized content strategy resulting in increased event registration rates",
   "Developed comprehensive analytics dashboard for cross-functional team collaboration",
   "Applied A/B testing methodologies that enhanced strategic campaign effectiveness",
   "Maintained consistent growth trajectory over 24-month period through sustained data analysis"
 ],
 images: [
   "/images/experiences/uiuxindo-1.png",
   "/images/experiences/uiuxindo-2.png",
   "/images/experiences/uiuxindo-3.png",
   "/images/experiences/uiuxindo-4.png",
   "/images/experiences/uiuxindo-5.png"
 ],
},
{
 id: "UnipertaminaTA",
 company: "Universitas Pertamina",
 position: "Database Management & Analytics Assistant",
 location: "Jakarta, Indonesia",
 period: "August 2024 - January 2025",
 preview: "Achieved 90% student pass rate while teaching Oracle Database and SQL programming to 40+ students",
 description: [
   "As a Teaching Assistant at Universitas Pertamina, I supported the Database Management and Analytics course by providing hands-on guidance to students learning Oracle Database and SQL programming. My role involved bridging the gap between theoretical concepts and practical application, ensuring students gained both technical skills and analytical thinking capabilities.",
   "Working directly with 40+ students, I focused on creating an engaging learning environment that made complex database concepts accessible and practical. I developed supplementary materials and provided personalized technical assistance to help students master database optimization techniques and statistical analysis methods."
 ],
 responsibilities: [
   "Taught Oracle Database and SQL programming fundamentals to 40+ undergraduate students",
   "Created supplementary learning materials focusing on database optimization and query performance",
   "Provided one-on-one technical assistance for complex database management concepts",
   "Assisted students with statistical analysis and data visualization techniques",
   "Conducted practical lab sessions and troubleshooted technical issues during coursework"
 ],
 skills: [
   "Oracle Database",
   "SQL Programming",
   "Database Optimization",
   "Statistical Analysis",
   "Data Visualization",
   "Teaching & Mentoring",
   "Technical Documentation",
   "Problem Solving"
 ],
 achievements: [
   "Achieved impressive 90% student pass rate in Database Management course",
   "Successfully taught and mentored 40+ students in Oracle Database and SQL programming",
   "Developed comprehensive supplementary learning materials for database optimization",
   "Improved student understanding of query performance and database design principles",
   "Provided effective technical assistance that enhanced student learning outcomes",
   "Contributed to curriculum enhancement through practical, hands-on teaching approaches"
 ],
 images: [
   "/images/experiences/uniper-ta-1.png",
   "/images/experiences/uniper-ta-2.png",
   "/images/experiences/uniper-ta-3.png"
 ],
},
{
 id: "SMKTIBazma",
 company: "SMK TI Bazma",
 position: "UI/UX Teaching Intern",
 location: "Bogor, Indonesia",
 period: "August 2023 - November 2023",
 preview: "Taught UI/UX design fundamentals and design thinking methodology to high school students with positive evaluation",
 description: [
   "SMK TI Bazma is a vocational high school in Bogor specializing in Information Technology education. As a UI/UX Teaching Intern, I had the opportunity to introduce high school students to the fundamentals of user interface and user experience design, preparing them for potential careers in the growing digital design industry.",
   "My role involved developing age-appropriate curriculum that made complex design concepts accessible to teenagers while building their practical skills in design thinking and user research. I also focused on developing their communication skills, which are essential for design professionals when presenting ideas to stakeholders and clients."
 ],
 responsibilities: [
   "Taught UI/UX design fundamentals including design hierarchy and visual design principles",
   "Introduced students to user research concepts and design thinking methodology",
   "Delivered technical training sessions on public communication strategies",
   "Developed stakeholder presentation skills through practical exercises and mock presentations",
   "Created engaging lesson plans tailored for high school students' learning capabilities"
 ],
 skills: [
   "UI/UX Design Teaching",
   "Design Thinking",
   "User Research Methods",
   "Public Communication",
   "Presentation Skills",
   "Curriculum Development",
   "Student Engagement",
   "Educational Technology"
 ],
 achievements: [
   "Successfully completed 4-month teaching internship with positive evaluation from administration",
   "Effectively taught UI/UX design fundamentals to high school students",
   "Developed practical communication and presentation skills among students",
   "Created engaging curriculum that made complex design concepts accessible to teenagers",
   "Built foundation knowledge in design thinking methodology for future IT professionals",
   "Received commendable feedback for innovative teaching approaches and student engagement"
 ],
 images: [
   "/images/experiences/smk-bazma-1.png",
   "/images/experiences/smk-bazma-2.png",
   "/images/experiences/smk-bazma-3.png"
 ],
}

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

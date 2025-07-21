"use client";
import { useState } from "react";
import  { Safari }  from './magicui/safari';

const AboutMeFolder = () => {
  const [showAboutModal, setShowAboutModal] = useState(false);

  const ProfileContent = () => (
    <div className="p-6 bg-white min-h-[500px] font-sf">
      {/* Header Section */}
      <div className="flex items-start gap-6 mb-6">
        {/* Profile Photo */}
        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          AP
        </div>

        {/* Basic Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Amanda Putri Aprilliani
          </h1>
          <h2 className="text-lg text-blue-600 mb-2">
            Computer Science Student
          </h2>
          <p className="text-gray-600 flex items-center gap-2 mb-3">
            <span>📍</span> Jakarta, Indonesia
          </p>

          {/* Contact Links */}
          <div className="flex gap-3">
            <a
              href="mailto:amandaputriaprill@gmail.com"
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
            >
              📧 Email
            </a>
            <a
              href="https://linkedin.com/in/amandaputriapr"
              target="_blank"
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
            >
              💼 LinkedIn
            </a>
            <a
              href="https://github.com/mandayash"
              target="_blank"
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
            >
              💻 GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
        <p className="text-gray-700 leading-relaxed">
          Full scholarship Computer Science student at Universitas Pertamina
          with 2+ years React.js experience. Proven leadership through 10+
          competition wins and real-world impact serving 30+ users in production
          applications. Recently completed international program in France 🇫🇷
          and led award-winning projects.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">3.78</div>
          <div className="text-xs text-gray-600">GPA</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">10+</div>
          <div className="text-xs text-gray-600">Competition Wins</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">🇫🇷</div>
          <div className="text-xs text-gray-600">International</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">30+</div>
          <div className="text-xs text-gray-600">Users Served</div>
        </div>
      </div>

      {/* Recent Highlights */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Recent Highlights
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
            <span className="text-green-600">✅</span>
            <span className="text-sm">
              Led HalalLens project - Best UI/UX Winner
            </span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
            <span className="text-green-600">✅</span>
            <span className="text-sm">
              Completed International Summer School in France
            </span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
            <span className="text-blue-600">🚀</span>
            <span className="text-sm">Frontend Engineer at Meetsin.ID</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
            <span className="text-purple-600">🎯</span>
            <span className="text-sm">
              Currently seeking internship opportunities
            </span>
          </div>
        </div>
      </div>
    </div>
  );

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

      {/* Safari Popup Modal */}
      {showAboutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
          onClick={() => setShowAboutModal(false)}
        >
          <div
            className="transform scale-90 transition-transform"
            onClick={e => e.stopPropagation()} // Supaya klik di dalam modal tidak menutup modal
          >
            <Safari
              url="about.amandalearns.me"
              className="w-[800px] h-[600px]"
            >
              <ProfileContent />
            </Safari>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutMeFolder;

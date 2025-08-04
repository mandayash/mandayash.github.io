"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SkillTagProps {
  skill: string;
  color?: 'blue' | 'purple' | 'pink' | 'green' | 'yellow' | 'red' | 'gray';
}

const MacOSSkillTag = ({ skill, color = 'blue' }: SkillTagProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Color mapping for macOS style colors
  const colorMap = {
    blue: {
      bg: 'bg-blue-50/80',
      border: 'border-blue-200/60',
      text: 'text-blue-700',
      hoverBg: 'bg-blue-100/90',
      shadow: 'shadow-blue-200/30',
      icon: 'text-blue-400',
    },
    purple: {
      bg: 'bg-purple-50/80',
      border: 'border-purple-200/60',
      text: 'text-purple-700',
      hoverBg: 'bg-purple-100/90',
      shadow: 'shadow-purple-200/30',
      icon: 'text-purple-400',
    },
    pink: {
      bg: 'bg-pink-50/80',
      border: 'border-pink-200/60',
      text: 'text-pink-700',
      hoverBg: 'bg-pink-100/90',
      shadow: 'shadow-pink-200/30',
      icon: 'text-pink-400',
    },
    green: {
      bg: 'bg-green-50/80',
      border: 'border-green-200/60',
      text: 'text-green-700',
      hoverBg: 'bg-green-100/90',
      shadow: 'shadow-green-200/30',
      icon: 'text-green-400',
    },
    yellow: {
      bg: 'bg-amber-50/80',
      border: 'border-amber-200/60',
      text: 'text-amber-700',
      hoverBg: 'bg-amber-100/90',
      shadow: 'shadow-amber-200/30',
      icon: 'text-amber-400',
    },
    red: {
      bg: 'bg-red-50/80',
      border: 'border-red-200/60',
      text: 'text-red-700',
      hoverBg: 'bg-red-100/90',
      shadow: 'shadow-red-200/30',
      icon: 'text-red-400',
    },
    gray: {
      bg: 'bg-gray-50/80',
      border: 'border-gray-200/60',
      text: 'text-gray-700',
      hoverBg: 'bg-gray-100/90',
      shadow: 'shadow-gray-200/30',
      icon: 'text-gray-400',
    },
  };
  
  const colors = colorMap[color];
  
  return (
    <motion.div
      className={`px-3 py-1.5 rounded-full ${colors.bg} ${colors.border} ${colors.text} border backdrop-blur-sm 
        inline-flex items-center gap-1.5 transition-all cursor-default`}
      initial={{ scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        y: -2,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered 
          ? '0 4px 10px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' 
          : '0 1px 2px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Icon based on skill type - optional */}
      {skill.toLowerCase().includes('react') && (
        <svg className={`w-3.5 h-3.5 ${colors.icon}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 9.861A2.139 2.139 0 1 0 12 14.139 2.139 2.139 0 1 0 12 9.861zM6.008 16.255l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046.324-1.021.75-2.023 1.28-3.046-.53-1.023-.956-2.025-1.28-3.046zM12 14.958c-.321 0-.636-.031-.951-.094-.576-1.473-1.323-3.127-1.81-4.856.487-1.729 1.234-3.383 1.81-4.856.315-.062.63-.094.951-.094.321 0 .636.031.951.094.576 1.473 1.323 3.127 1.81 4.856-.487 1.729-1.234 3.383-1.81 4.856-.315.062-.63.094-.951.094zm0-8.930c-.667 1.521-1.276 3.033-1.666 4.5.39 1.467.999 2.98 1.666 4.5.667-1.521 1.276-3.033 1.666-4.5-.39-1.467-.999-2.98-1.666-4.5zM17.992 16.255l-.133-.469a23.357 23.357 0 0 0-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 0 0 1.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.171 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046-.294.986-.69 2.007-1.171 3.046z"/>
        </svg>
      )}
      {skill.toLowerCase().includes('javascript') && (
        <svg className={`w-3.5 h-3.5 ${colors.icon}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
        </svg>
      )}
      {skill.toLowerCase().includes('python') && (
        <svg className={`w-3.5 h-3.5 ${colors.icon}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
        </svg>
      )}
      
      {/* Skill name with anti-aliased text */}
      <span className="text-xs font-medium antialiased">{skill}</span>
      
      {/* Subtle glow effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          style={{
            background: `radial-gradient(circle, ${getColorHex(color)} 0%, rgba(255,255,255,0) 70%)`,
            filter: 'blur(8px)',
            zIndex: -1
          }}
        />
      )}
    </motion.div>
  );
};

// Helper function to get hex color values for glow effect
const getColorHex = (color: string) => {
  switch(color) {
    case 'blue': return 'rgba(59, 130, 246, 0.4)';
    case 'purple': return 'rgba(139, 92, 246, 0.4)';
    case 'pink': return 'rgba(236, 72, 153, 0.4)';
    case 'green': return 'rgba(34, 197, 94, 0.4)';
    case 'yellow': return 'rgba(250, 204, 21, 0.4)';
    case 'red': return 'rgba(239, 68, 68, 0.4)';
    default: return 'rgba(156, 163, 175, 0.4)';
  }
};

export default MacOSSkillTag;
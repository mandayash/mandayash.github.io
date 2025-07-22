"use client";
import { useRef } from 'react';
import Dock from './components/Dock';
import AboutMeFolder from './components/AboutMeFolder';
import { BlurIn } from './components/BlurIn';
import VariableFontText from './components/variable-font-and-cursor'



export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <main
     ref={containerRef}
     className="relative w-screen h-screen overflow-hidden bg-grid">
      {/* Sticky Note - Top Left */}
      <div className="absolute top-5 left-5">
        <div className="bg-sticky-yellow p-2 w-[270px] min-h-40 rounded-sm shadow-lg transform -rotate-2 font-lazy text-base leading-relaxed">
          <div className="font-bold text-2xl mb-2 underline font">To do:</div>
          <ul className="space-y-1 text-xl font-bold">
            <li className="line-through opacity-80">Complete International program in France</li>
            <li className="line-through opacity-80">Finish HalalLens Project</li>
            <li> - Get My Dream Internship</li>
            <li> - Finish My Udemy Class</li>
            <li> - Learn how to cook</li>
            <li> - Travel somewhere new every year</li>
          </ul>
        </div>
      </div>

      {/* Welcome Text - Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-2xl md:text-2xl font-light text-text-primary mb-2 font-sf transition-all duration-300 hover:font-semibold hover:scale-105">
          welcome to my
        </h1>
        <BlurIn>
          {/* Replace static span with VariableFontText */}
          <VariableFontText
            label="portfolio."
            className="text-8xl md:text-12xl italic text-text-primary font-garamond inline-block cursor-none"
            fontVariationMapping={{
              x: { name: "wght", min: 400, max: 800 }, // Weight variation
              y: { name: "slnt", min: 0, max: -15 },   // Slant variation (for italic)
            }}
            containerRef={containerRef}
          />
        </BlurIn>
      </div>

      {/* Folder Icons - Right Side */}
      <div className="absolute top-20 right-10 flex flex-col gap-5">
        {[
          "Professional Experiences",
          "Leadership, Public Speaking & Committee", 
          "Achievements",
          "Education and Skills"
        ].map((project, index) => (
          <div key={index} className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105">
            <img
              src="/icons/folder.png"
              alt="Folder Icon"
              className="w-16 h-16 mb-2"
              draggable={false}
            />
            <span className="text-sm text-center max-w-20 leading-tight font-sf">{project}</span>
          </div>
        ))}
      </div>

      {/* File Icons - Bottom Left */}

<div className="absolute bottom-10 left-10 flex gap-8">
  {/* Resume PDF Icon */}
  <a
    href="/cv-amanda.pdf" 
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
  >
    <img
      src="/icons/docs.png"
      alt="Resume Icon"
      className="w-16 h-16 mb-2"
      draggable={false}
    />
    <span className="text-sm text-center max-w-15 leading-tight font-sf">Resume.pdf</span>
  </a>

  {/* About Me Folder Icon with Modal */}
  <AboutMeFolder />
</div>
    <Dock />
    </main>
  );
}
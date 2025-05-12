"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from '@/lib/language-context'
import { translations } from '@/lib/translations'

// Define a type for the milestone
interface Milestone {
  year: string;
  title: string;
  description: string;
  imagePath: string;
}

export default function Timeline() {
  const { language } = useLanguage();
  const t = translations[language];
  
  // Get milestones from translations
  const milestones = t.timeline.milestones.map((milestone, index) => ({
    ...milestone,
    imagePath: `/images/image${index + 1}${index === 9 ? '.png' : '.jpg'}`
  }));
  
  const [activeMilestones, setActiveMilestones] = useState<boolean[]>(new Array(milestones.length).fill(false));
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !timelineRef.current) return;
      
      const section = sectionRef.current;
      const sectionRect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Check if section is visible
      if (sectionRect.top > viewportHeight || sectionRect.bottom < 0) {
        return;
      }
      
      // MODIFIED: Adjusted offset to make animation more responsive and complete
      const offset = -800; // Reduced from -700 to make animation faster
      
      // MODIFIED: Adjusted calculation to ensure last milestones become active
      const startPoint = viewportHeight + offset;
      // Changed to ensure the entire timeline completes even if it's still partially visible
      const endPoint = 0 - (sectionRect.height * 0.8); // Only need 80% of the section to scroll out to complete animation
      const currentPoint = sectionRect.top;
      
      // Normalize to 0-1 range
      const newProgress = 1 - ((currentPoint - endPoint) / (startPoint - endPoint));
      const clampedProgress = Math.max(0, Math.min(1, newProgress));
      
      setProgress(clampedProgress);
      
      // MODIFIED: Updated milestone activation to be more progressive
      // This will activate milestones more quickly as you scroll
      const newActiveMilestones = activeMilestones.map((_, index) => {
        // Calculate threshold more aggressively to ensure all milestones activate
        const milestoneThreshold = (index / (milestones.length)); // Multiplier of 0.9 makes activation happen earlier
        return clampedProgress >= milestoneThreshold;
      });
      
      setActiveMilestones(newActiveMilestones);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeMilestones.length, milestones.length]);
  
  return (
    <section ref={sectionRef} className="py-20 bg-white" id="timeline">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-20 text-center text-[#002F63]">{t.timeline.heading}</h2>
        
        <div className="relative" ref={timelineRef}>
          {/* Timeline center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#d1d5db] hidden md:block" 
               style={{
                 top: "205px", 
                 height: `calc(100% - 420px)`,
               }}>
            {/* Progress overlay */}
            <div className="absolute top-0 left-0 right-0 bg-[#002F63] transition-all duration-500 ease-out"
                 style={{ height: `${progress * 100}%` }}
            ></div>
          </div>
          
          {/* Milestones */}
          <div className="space-y-32">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div 
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full transition-colors duration-500 ease-out hidden md:block" 
                  style={{
                    backgroundColor: activeMilestones[index] ? "#002F63" : "#d1d5db",
                    zIndex: 10,
                  }}
                ></div>
                
                {/* Milestone content */}
                <div className={`flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-0 ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}>
                  <div className="w-full md:w-1/2 px-6 py-4 flex items-center">
                    <div className="rounded-lg shadow-md overflow-hidden transition-transform duration-700 w-full"
                         style={{
                           transform: activeMilestones[index] ? "scale(1)" : "scale(0.95)",
                           opacity: activeMilestones[index] ? 1 : 0.9,
                         }}>
                      <Image
                        src={milestone.imagePath || `/placeholder.svg?height=500&width=600&text=Milestone ${index + 1}`}
                        alt={milestone.title}
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-4 md:px-12 lg:px-16 flex items-center">
                    <div>
                      <h3 
                        className={`text-2xl md:text-3xl lg:text-4xl font-medium mb-6 transition-colors duration-500 ${
                          activeMilestones[index] ? "text-[#002F63]" : "text-gray-500"
                        }`}
                      >
                        {milestone.title} — {milestone.year}
                      </h3>
                      <p className={`text-base md:text-lg leading-relaxed transition-opacity duration-700 ${
                        activeMilestones[index] ? "text-gray-700 opacity-100" : "text-gray-500 opacity-80"
                      }`}>
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

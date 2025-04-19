"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

// Original milestones array remains unchanged
const milestones = [
  {
    year: "1985",
    title: "Gründung",
    description:
      "Optiprint wird in St. Gallen gegründet. Mit einer kleinen Produktionsfläche und großen Ambitionen beginnt die Erfolgsgeschichte unseres Unternehmens. Die ersten Leiterplatten werden in einer kleinen Werkstatt produziert, doch die Vision ist von Anfang an groß.",
    imagePath: "/images/image1.jpg"
  },
  {
    year: "1992",
    title: "Umzug nach Berneck",
    description:
      "Optiprint zieht an den neuen Standort in Berneck. Der Umzug ermöglicht eine Erweiterung der Produktionskapazität und die Umsetzung innovativer Fertigungsprozesse. Mit mehr Raum und modernen Anlagen können komplexere Projekte realisiert werden.",
    imagePath: "/images/image2.jpg"
  },
  {
    year: "1998",
    title: "Produktinnovation",
    description:
      "Einführung neuer Technologien zur Herstellung von High-End-Leiterplatten. Optiprint etabliert sich als führender Anbieter in der Schweiz. Die Investition in fortschrittliche Fertigungsmethoden zahlt sich aus und erschließt neue Marktpotenziale.",
    imagePath: "/images/image3.jpg"
  },
  {
    year: "2005",
    title: "Neue Führung",
    description:
      "Hans Jörg übernimmt die Position des CEO. Unter seiner Führung beginnt eine neue Ära des Wachstums und der internationalen Expansion. Mit frischen Ideen und strategischem Weitblick wird das Unternehmen auf den globalen Markt ausgerichtet.",
    imagePath: "/images/image4.jpg"
  },
  {
    year: "2010",
    title: "Weltraummission",
    description:
      "Optiprint-Leiterplatten werden erstmals in Satellitensystemen eingesetzt. Ein bedeutender Meilenstein, der die höchste Qualität und Zuverlässigkeit unserer Produkte bestätigt. Diese Anwendung unter extremsten Bedingungen unterstreicht die technologische Spitzenposition von Optiprint.",
    imagePath: "/images/image5.jpg"
  },
  {
    year: "2015",
    title: "Team-Wachstum",
    description:
      "Optiprint beschäftigt zum ersten Mal 100 Mitarbeitende. Ein Zeichen für das konstante Wachstum und die zunehmende Bedeutung am Markt. Das Team vereint Expertise aus verschiedenen Fachbereichen und bildet das Fundament für den anhaltenden Erfolg.",
    imagePath: "/images/image6.jpg"
  },
  {
    year: "2018",
    title: "Modernisierung",
    description:
      "Bedeutende Investitionen in modernste Produktionstechnologien ermöglichen höhere Präzision und Effizienz bei der Herstellung von High-Tech-Leiterplatten. Die Digitalisierung der Fertigungsprozesse hebt die Produktion auf ein neues Niveau.",
    imagePath: "/images/image7.jpg"
  },
  {
    year: "2022",
    title: "Nachhaltige Produktion",
    description:
      "Optiprint erhält eine renommierte Auszeichnung für nachhaltige Produktionsprozesse in der Elektronikindustrie. Ein weiterer Schritt in Richtung umweltbewusste Zukunft. Die Verringerung des ökologischen Fußabdrucks wird zu einem zentralen Unternehmensziel.",
    imagePath: "/images/image8.jpg"
  },
  {
    year: "2025",
    title: "40 Jahre Innovation",
    description:
      "Wir feiern unser 40-jähriges Bestehen mit Stolz auf die Vergangenheit und Vorfreude auf die Zukunft. Gemeinsam mit unseren Kunden, Mitarbeitenden und Partnern blicken wir auf eine erfolgreiche Geschichte zurück und richten den Blick auf kommende Herausforderungen.",
    imagePath: "/images/image9.jpg"
  },
]

// Define a type for the milestone
interface Milestone {
  year: string;
  title: string;
  description: string;
  imagePath: string;
}

export default function Timeline() {
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
  }, [activeMilestones.length]);
  
  return (
    <section ref={sectionRef} className="py-20 bg-white" id="timeline">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-20 text-center text-[#002F63]">UNSERE MEILENSTEINE</h2>
        
        <div className="relative" ref={timelineRef}>
          {/* Timeline center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#d1d5db] hidden md:block" 
               style={{
                 top: "205px", 
                 height: `calc(100% - 450px)`,
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
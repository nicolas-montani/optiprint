"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"


const milestones = [
  {
    year: "1985",
    title: "Gründung",
    description:
      "Optiprint wird in St. Gallen gegründet. Mit einer kleinen Produktionsfläche und großen Ambitionen beginnt die Erfolgsgeschichte unseres Unternehmens. Die ersten Leiterplatten werden in einer kleinen Werkstatt produziert, doch die Vision ist von Anfang an groß.",
  },
  {
    year: "1992",
    title: "Umzug nach Berneck",
    description:
      "Optiprint zieht an den neuen Standort in Berneck. Der Umzug ermöglicht eine Erweiterung der Produktionskapazität und die Umsetzung innovativer Fertigungsprozesse. Mit mehr Raum und modernen Anlagen können komplexere Projekte realisiert werden.",
  },
  {
    year: "1998",
    title: "Produktinnovation",
    description:
      "Einführung neuer Technologien zur Herstellung von High-End-Leiterplatten. Optiprint etabliert sich als führender Anbieter in der Schweiz. Die Investition in fortschrittliche Fertigungsmethoden zahlt sich aus und erschließt neue Marktpotenziale.",
  },
  {
    year: "2005",
    title: "Neue Führung",
    description:
      "Hans Jörg übernimmt die Position des CEO. Unter seiner Führung beginnt eine neue Ära des Wachstums und der internationalen Expansion. Mit frischen Ideen und strategischem Weitblick wird das Unternehmen auf den globalen Markt ausgerichtet.",
  },
  {
    year: "2010",
    title: "Weltraummission",
    description:
      "Optiprint-Leiterplatten werden erstmals in Satellitensystemen eingesetzt. Ein bedeutender Meilenstein, der die höchste Qualität und Zuverlässigkeit unserer Produkte bestätigt. Diese Anwendung unter extremsten Bedingungen unterstreicht die technologische Spitzenposition von Optiprint.",
  },
  {
    year: "2015",
    title: "Team-Wachstum",
    description:
      "Optiprint beschäftigt zum ersten Mal 100 Mitarbeitende. Ein Zeichen für das konstante Wachstum und die zunehmende Bedeutung am Markt. Das Team vereint Expertise aus verschiedenen Fachbereichen und bildet das Fundament für den anhaltenden Erfolg.",
  },
  {
    year: "2018",
    title: "Modernisierung",
    description:
      "Bedeutende Investitionen in modernste Produktionstechnologien ermöglichen höhere Präzision und Effizienz bei der Herstellung von High-Tech-Leiterplatten. Die Digitalisierung der Fertigungsprozesse hebt die Produktion auf ein neues Niveau.",
  },
  {
    year: "2022",
    title: "Nachhaltige Produktion",
    description:
      "Optiprint erhält eine renommierte Auszeichnung für nachhaltige Produktionsprozesse in der Elektronikindustrie. Ein weiterer Schritt in Richtung umweltbewusste Zukunft. Die Verringerung des ökologischen Fußabdrucks wird zu einem zentralen Unternehmensziel.",
  },
  {
    year: "2025",
    title: "40 Jahre Innovation",
    description:
      "Wir feiern unser 40-jähriges Bestehen mit Stolz auf die Vergangenheit und Vorfreude auf die Zukunft. Gemeinsam mit unseren Kunden, Mitarbeitenden und Partnern blicken wir auf eine erfolgreiche Geschichte zurück und richten den Blick auf kommende Herausforderungen.",
  },
]

// Then update the Timeline component to include scroll animations
export default function Timeline() {
  return (
    <section className="py-20 bg-white" id="timeline">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-20 text-center text-black">Unsere Meilensteine</h2>

        <div className="space-y-24 md:space-y-30">
          {milestones.map((milestone, index) => (
            <MilestoneItem key={index} milestone={milestone} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Replace the MilestoneItem function with this updated version that uses scale animation instead of fade-in

function MilestoneItem({ milestone, index }: { milestone: any; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.2,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
        index % 2 !== 0 ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className={`w-full md:w-1/2 relative transition-all duration-1000 ease-out overflow-hidden`}>
        <div
          className="w-full transition-all duration-1000 ease-out"
          style={{
            transform: isVisible ? "scale(1)" : "scale(1.2)",
            transitionDelay: `${index * 0.1}s`,
          }}
        >
          <Image
            src={`/placeholder.svg?height=500&width=600&text=Milestone ${index + 1}`}
            alt={milestone.title}
            width={600}
            height={500}
            className="w-full h-auto"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 px-4 md:px-12 lg:px-16">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6 text-black">
          {milestone.title} — {milestone.year}
        </h3>
        <p className="text-base md:text-lg leading-relaxed text-gray-700">{milestone.description}</p>
      </div>
    </div>
  )
}

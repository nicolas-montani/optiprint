// Project: optiprint
"use client"

import { useEffect, useState } from "react";
import ThreeJsHero from "@/components/ThreeJsHero";
import ImageCarousel from "@/components/image-carousel";
import Timeline from "@/components/timeline";
import LinkedInFeed from "@/components/linkedin-feed";
import Footer from "@/components/footer";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Add CSS to hide the default scrollbar - more comprehensive approach
    const style = document.createElement('style');
    style.textContent = `
      /* Hide scrollbar for all elements */
      * {
        -ms-overflow-style: none !important;  /* IE and Edge */
        scrollbar-width: none !important;     /* Firefox */
      }
      
      /* Hide scrollbar for WebKit browsers */
      *::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
        background: transparent !important;
        display: none !important;
      }
      
      /* Additional overrides for html and body */
      html, body {
        overflow-y: scroll !important;
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      
      html::-webkit-scrollbar, 
      body::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    const handleScroll = () => {
      // Calculate how far down the page the user has scrolled
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      
      // Calculate progress as a percentage
      const progress = (scrollPosition / totalHeight) * 100;
      setScrollProgress(progress);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* Custom Scroll Progress Bar */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 h-40 w-1 bg-transparent z-50">
        <div 
          className="w-full bg-[#002F63] rounded-full" 
          style={{ 
            height: `${scrollProgress}%`,
            transition: "height 0.1s"
          }}
        ></div>
      </div>

      {/* Hero Section with Three.js */}
      <ThreeJsHero />

      {/* CEO Message Section */}
      <section className="py-24 bg-gray-50">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
          <h2 className="text-[#002F63] text-base font-semibold tracking-wide mb-4 text-left">VON DER GESCHÄFTSFÜHRUNG</h2>
            <div className="w-full h-px bg-black mb-10"></div>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl leading-tight font-normal mb-10 text-left">
              "Seit 1985 entwickeln wir mit Leidenschaft und Expertise innovative Leiterplattenlösungen – eine
              Erfolgsgeschichte aus der Schweiz. Gemeinsam mit unseren Kunden und Partnern gestalten wir seit vier
              Jahrzehnten die Zukunft der Elektronik. Wir sind stolz auf das, was wir erreicht haben, und blicken mit
              Begeisterung auf die kommenden Herausforderungen."
            </blockquote>
            <p className="text-sm font-semibold tracking-wide text-left">HANS JÖRG, CEO AT OPTIPRINT AG</p>
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <ImageCarousel />

      {/* Timeline Section */}
      <Timeline />

      {/* Video Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden aspect-video">
            <iframe
              width="800"
              height="450"
              src="https://www.youtube.com/embed/AdQoiSiIE28?controls=1&disablekb=1&rel=0&modestbranding=1&showinfo=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* LinkedIn Section */}
      <LinkedInFeed />

      {/* Footer */}
      <Footer />
    </main>
  );
}
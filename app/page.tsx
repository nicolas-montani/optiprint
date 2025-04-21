"use client"

import { useEffect, useState, useRef } from "react";
import ThreeJsHero from "@/components/ThreeJsHero";
import ImageCarousel from "@/components/image-carousel";
import Timeline from "@/components/timeline";
import LinkedInFeed from "@/components/linkedin-feed";
import Footer from "@/components/footer";
import CeoText from "@/components/CeoText";
import { useRouter } from "next/navigation";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clicksLeft, setClicksLeft] = useState(5);
  const touchCountRef = useRef(0);
  const router = useRouter();
  
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

    // Easter egg touch/click handler
    const handleTouch = () => {
      touchCountRef.current += 1;
      
      if (touchCountRef.current > 5) {
        // Show the popup after 5 clicks
        setShowEasterEgg(true);
        
        // Update clicks left
        setClicksLeft(prev => {
          const newCount = prev - 1;
          
          // Redirect when count reaches 0
          if (newCount <= 0) {
            setTimeout(() => {
              router.push('/game');
            }, 500);
          }
          
          return newCount;
        });
      }
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleTouch);
    window.addEventListener("touchstart", handleTouch);
    
    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleTouch);
      window.removeEventListener("touchstart", handleTouch);
      document.head.removeChild(style);
    };
  }, [router]);

  return (
    <main className="min-h-screen relative">
      {/* Easter Egg Popup */}
      {showEasterEgg && (
        <div 
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md z-50 shadow-lg transition-opacity duration-300"
          style={{
            opacity: clicksLeft <= 0 ? 0 : 1,
          }}
        >
          {clicksLeft <= 0 ? "Redirecting..." : `${clicksLeft} clicks left`}
        </div>
      )}

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
      <CeoText />

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
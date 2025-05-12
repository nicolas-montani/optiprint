"use client"

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';

export default function CeoText() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { language } = useLanguage();
  const t = translations[language];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When section becomes at least 20% visible, trigger the animation
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once triggered, we can disconnect the observer
          observer.disconnect();
        }
      },
      {
        root: null, // use the viewport as the root
        rootMargin: '0px',
        threshold: 0.2 // trigger when 20% of the element is visible
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 
            className={`text-[#002F63] text-base font-semibold tracking-wide mb-4 text-left transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
            style={{ transitionDelay: '100ms' }}
          >
            {t.ceo.heading}
          </h2>
          
          <div 
            className={`w-full h-px bg-black mb-10 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
            style={{ transitionDelay: '300ms' }}
          ></div>
          
          <blockquote 
            className={`text-2xl md:text-3xl lg:text-4xl leading-tight font-normal mb-10 text-left transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
            style={{ transitionDelay: '500ms' }}
          >
            {t.ceo.quote}
          </blockquote>
          
          <p 
            className={`text-sm font-semibold tracking-wide text-left transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
            style={{ transitionDelay: '700ms' }}
          >
            {t.ceo.signature}
          </p>
        </div>
      </div>
    </section>
  );
}

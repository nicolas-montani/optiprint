
"use client"

import React from 'react';
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';

const LinkedInFeed = () => {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <div className="w-full px-4 md:px-8 mt-24 lg:px-12">
      <img 
        src="images/linkedin.png" 
        alt="LinkedIn Feed" 
        className="mx-auto w-full max-w-4xl rounded-lg shadow-md my-6" 
      />
      <div className="flex justify-center mt-8 mb-12">
        <a 
          href="https://www.linkedin.com/company/optiprint-ag/posts/?feedView=all" 
          target="_blank" 
          rel="noopener noreferrer"
          className="shadow-md text-center bg-[#002F63] text-white py-3 px-6 rounded-lg hover:bg-[#00407D] transition-colors duration-300 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 hover:shadow-lg"
        >
          {t.linkedin.buttonText}
        </a>
      </div>
    </div>
  );
};

export default LinkedInFeed;

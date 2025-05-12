"use client"

import { useLanguage } from '@/lib/language-context'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-full shadow-md px-2 py-1 flex items-center">
        <button
          onClick={() => setLanguage('de')}
          className={`px-2 py-1 rounded-full text-sm font-medium transition-colors ${
            language === 'de' 
              ? 'bg-[#002F63] text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Switch to German"
        >
          DE
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-2 py-1 rounded-full text-sm font-medium transition-colors ${
            language === 'en' 
              ? 'bg-[#002F63] text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
      </div>
    </div>
  )
}

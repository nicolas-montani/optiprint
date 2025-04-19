"use client"

import { useState } from "react"
import Image from "next/image"

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1)
  const totalImages = 5

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalImages ? 1 : prev + 1))
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 1 ? totalImages : prev - 1))
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="bg-white">
      <div className="max-w-[1800px] mx-auto">
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gray-900 overflow-hidden relative">
          <Image
            src={`/placeholder.svg?height=600&width=1200&text=Image${currentIndex}`}
            alt={`Optiprint PCB Technology ${currentIndex}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex justify-between items-center p-4 md:p-6 lg:p-8 bg-white border-b border-gray-200">
          <div className="flex gap-4 md:gap-5 overflow-x-auto pb-2">
            {Array.from({ length: totalImages }).map((_, i) => (
              <div
                key={i}
                className={`relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 cursor-pointer transition-opacity ${currentIndex === i + 1 ? "opacity-100" : "opacity-50"}`}
                onClick={() => handleThumbnailClick(i + 1)}
              >
                <Image
                  src={`/placeholder.svg?height=150&width=150&text=${i + 1}`}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <span className="text-sm text-gray-500">
              {currentIndex}/{totalImages}
            </span>
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="text-gray-500 hover:text-black transition-colors text-sm font-medium"
              >
                PREV
              </button>
              <button
                onClick={handleNext}
                className="text-gray-500 hover:text-black transition-colors text-sm font-medium"
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Fetch images from the API endpoint
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch the list of images from our API endpoint
        const response = await fetch('/api/carusel-images')
        const data = await response.json()
        
        if (data.images && data.images.length > 0) {
          setImages(data.images)
        } else {
          console.error('No images found in carusel folder')
        }
      } catch (error) {
        console.error('Error fetching images:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchImages()
  }, [])
  
  // Total number of images based on fetched data
  const totalImages = images.length
  
  // Auto-rotate images every 5 seconds (only if we have images)
  useEffect(() => {
    if (totalImages === 0) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === totalImages ? 1 : prev + 1))
    }, 5000) // Faster rotation - 5 seconds instead of 8
    
    return () => clearInterval(interval)
  }, [totalImages])

  // Calculate positions for side-by-side carousel
  const getCarouselItems = () => {
    if (totalImages === 0) return []
    
    // Create array of all indices
    return Array.from({ length: totalImages }, (_, i) => {
      const index = i + 1
      
      // Calculate position relative to current index
      let position = index - currentIndex
      
      // Handle wrapping for circular carousel
      if (position < -Math.floor(totalImages / 2)) {
        position += totalImages
      } else if (position > Math.floor(totalImages / 2)) {
        position -= totalImages
      }
      
      return { index, position }
    })
  }

  // If still loading or no images found
  if (loading) {
    return (
      <section className="bg-white">
        <div className="max-w-[1800px] mx-auto py-2">
          <div className="w-full h-[500px] flex items-center justify-center">
            <p className="text-lg">Loading images...</p>
          </div>
        </div>
      </section>
    )
  }
  
  if (totalImages === 0) {
    return (
      <section className="bg-white">
        <div className="max-w-[1800px] mx-auto">
          <div className="w-full h-[500px] flex items-center justify-center">
            <p className="text-lg">No images found in the carusel folder</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white">
      <div className="max-w-[1800px] mx-auto">
        {/* Side-by-side carousel with slow rotation */}
        <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden relative">
          {/* Center carousel container */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Circular track for images */}
            <div className="relative w-full h-full">
              {getCarouselItems().map(({ index, position }) => {
                const imageFile = images[index - 1] // Get the actual image path from our array
                
                // Calculate visual properties based on position
                const translateX = position * 65 // Adjusted spacing between images to 65% (was 80%)
                const scale = 1 - (Math.abs(position) * 0.15) // Scale down images further from center
                const opacity = 1 - (Math.abs(position) * 0.2) // Fade out images further from center
                const zIndex = totalImages - Math.abs(position) // Layer images with center on top
                const rotateY = position * 15 // Add perspective rotation
                
                return (
                  <div 
                    key={index}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      zIndex,
                      transform: `
                        translate(-50%, -50%)
                        translateX(${translateX}%)
                        perspective(1200px)
                        rotateY(${rotateY}deg)
                        scale(${scale})
                      `,
                      opacity: Math.max(opacity, 0),
                      transition: 'all 0.7s ease-out' // Faster transition (was 1.5s)
                    }}
                  >
                    <div 
                      className="relative w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-lg overflow-hidden shadow-2xl"
                      onClick={() => setCurrentIndex(index)}
                    >
                      <Image
                        src={`/carusel/${imageFile}`}
                        alt={`Carousel Image ${index}`}
                        fill
                        className="object-cover"
                      />
                      <div className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentIndex ? "bg-blue-500/10" : "bg-black/30"
                      }`} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
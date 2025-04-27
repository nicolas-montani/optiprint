"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function ImageGrid() {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)
  const [autoScrollDirection, setAutoScrollDirection] = useState(1) // 1 for right, -1 for left
  const [autoScrollSpeed, setAutoScrollSpeed] = useState(0.8) // reduced speed for smoother feel
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  
  // Fetch images from the API endpoint and duplicate them for infinite scrolling
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch the list of images from our API endpoint
        const response = await fetch('/api/carusel-images')
        const data = await response.json()
        
        if (data.images && data.images.length > 0) {
          // Create an array with multiple copies of the images for infinite scrolling effect
          const duplicatedImages = [...data.images, ...data.images, ...data.images]
          setImages(duplicatedImages)
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

  // Auto-scroll effect
  useEffect(() => {
    const startAutoScroll = () => {
      if (!autoScrollEnabled || !scrollContainerRef.current) return
      
      const doScroll = () => {
        if (!scrollContainerRef.current || !autoScrollEnabled) return
        
        scrollContainerRef.current.scrollLeft += autoScrollDirection * autoScrollSpeed
        handleInfiniteScroll()
        
        animationFrameRef.current = requestAnimationFrame(doScroll)
      }
      
      animationFrameRef.current = requestAnimationFrame(doScroll)
    }
    
    // Start auto-scrolling
    startAutoScroll()
    
    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current)
      }
    }
  }, [autoScrollEnabled, autoScrollDirection, autoScrollSpeed])

  // Pause auto-scroll on user interaction and resume after inactivity
  const pauseAutoScroll = () => {
    setAutoScrollEnabled(false)
    
    // Clear any existing timeout
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current)
    }
    
    // Resume auto-scroll after 4 seconds of inactivity (increased from 3)
    autoScrollTimeoutRef.current = setTimeout(() => {
      setAutoScrollEnabled(true)
    }, 4000)
  }

  // Handle infinite scrolling without disrupting the experience
  const handleInfiniteScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const scrollContainer = scrollContainerRef.current;
    const scrollWidth = scrollContainer.scrollWidth;
    const containerWidth = scrollContainer.clientWidth;
    
    // When reaching near the end (last 20% of content), jump back to the middle set
    if (scrollContainer.scrollLeft > (scrollWidth - containerWidth - 500)) {
      // Reset to the middle section without animation
      scrollContainer.scrollLeft = scrollContainer.scrollLeft - (scrollWidth / 3);
    }
    
    // When scrolling back past the beginning, jump to the middle set
    if (scrollContainer.scrollLeft < 500) {
      // Reset to the middle section without animation
      scrollContainer.scrollLeft = scrollContainer.scrollLeft + (scrollWidth / 3);
    }
    
    // Change direction less frequently
    if ((scrollContainer.scrollLeft > (scrollWidth - containerWidth - 600) || 
        scrollContainer.scrollLeft < 600) && Math.random() < 0.1) { // reduced from 0.2
      setAutoScrollDirection(prev => prev * -1);
      setAutoScrollSpeed(0.5 + Math.random()); // slightly reduced range
    }
  };

  // Mouse/touch event handlers for dragging with improved smoothness
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    
    pauseAutoScroll();
    
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    
    // Change cursor style
    scrollContainerRef.current.style.cursor = 'grabbing';
    scrollContainerRef.current.style.userSelect = 'none';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      // Restore cursor style
      scrollContainerRef.current.style.cursor = 'grab';
      scrollContainerRef.current.style.userSelect = '';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    
    pauseAutoScroll();
    
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2.5; // Increased multiplier for more responsive movement
    
    // Apply scrolling with less resistance
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    
    // Check for infinite loop conditions
    handleInfiniteScroll();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    
    pauseAutoScroll();
    
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    pauseAutoScroll();
    
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2.5; // Increased multiplier for more responsive movement
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    
    // Check for infinite loop conditions
    handleInfiniteScroll();
  };

  // Handle wheel event for smoother scrolling
  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollContainerRef.current) return;
    e.preventDefault();
    
    pauseAutoScroll();
    
    const scrollAmount = e.deltaY * 2; // Increased multiplier for faster wheel scrolling
    scrollContainerRef.current.scrollLeft += scrollAmount;
    
    // Check for infinite loop conditions
    handleInfiniteScroll();
  };

  // Handle mouse hovering
  const handleMouseEnter = () => {
    pauseAutoScroll();
  };

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
  
  if (images.length === 0) {
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
      <div className="max-w-[1800px] mx-auto py-8 px-4">
        {/* Scrollable Image Grid Layout - 2 rows height */}
        <div className="relative overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex flex-nowrap gap-6 overflow-x-auto pb-4 cursor-grab" 
            style={{ 
              gridTemplateRows: "repeat(2, 1fr)",
              display: "grid",
              gridAutoFlow: "column",
              gridAutoColumns: "calc(250px)",
              overscrollBehaviorX: "none", // Changed from "contain"
              scrollSnapType: "none", // Changed from "x mandatory"
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "auto" // Changed from default "smooth"
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
            onWheel={handleWheel}
          >
            {images.map((imageFile, index) => (
              <div 
                key={index}
                className="group relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                style={{ 
                  gridRow: index % 2 === 0 ? "1" : "2",
                  scrollSnapAlign: "none" // Changed from "start"
                }}
              >
                <Image
                  src={`/carusel/${imageFile}`}
                  alt={`Grid Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
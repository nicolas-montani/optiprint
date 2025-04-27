import React, { useRef, useState, useEffect } from 'react';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  // Add a new state to track if user manually controlled playback
  const [userControlled, setUserControlled] = useState(false);

  // Update video progress
  const updateProgress = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Set video duration once metadata is loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle seek when clicking on progress bar
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / progressRef.current.clientWidth;
      videoRef.current.currentTime = pos * videoRef.current.duration;
      
      // Mark as user-controlled when seeking
      setUserControlled(true);
      setHasInteracted(true);
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      // Mark that user has interacted with video
      setHasInteracted(true);
      
      // Set user-controlled flag to true when manually toggling
      setUserControlled(true);
      
      // Ensure sound is on when user explicitly plays
      videoRef.current.muted = false;
      
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error("Failed to play video:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Format time in MM:SS
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Setup Intersection Observer to detect when video is visible
  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.5, // When 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Update visibility state
        setIsVisible(entry.isIntersecting);
        
        // Only handle autoplay if the user hasn't manually controlled playback
        if (!userControlled) {
          // Autoplay when video comes into view
          if (entry.isIntersecting && videoRef.current && !isPlaying) {
            // Attempt to play with sound
            videoRef.current.muted = false;
            
            videoRef.current.play()
              .then(() => {
                setIsPlaying(true);
                console.log("Autoplay with sound started successfully");
              })
              .catch((error) => {
                console.error("Autoplay with sound failed:", error);
                // We won't try muted autoplay as fallback, instead wait for user interaction
              });
          }
          
          // Pause when video goes out of view (only if not user-controlled)
          if (!entry.isIntersecting && videoRef.current && isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      });
    }, options);

    // Start observing the video container
    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, [isPlaying, userControlled]); // Add userControlled to dependencies

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', updateProgress);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      // Add ended event listener to reset userControlled state
      const handleEnded = () => {
        setIsPlaying(false);
        // Optionally reset userControlled when video ends
        // setUserControlled(false);
      };
      
      video.addEventListener('ended', handleEnded);
      
      return () => {
        video.removeEventListener('timeupdate', updateProgress);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    <section className="w-full py-8 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Content inside this div */}
        <div 
          ref={videoContainerRef}
          className="relative overflow-hidden rounded-xl shadow-lg bg-black"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Video Player */}
          <video
            ref={videoRef}
            className="w-full h-auto"
            src="/video/Optiprintv3_wENGsubs.mp4"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            poster="/public/video/thumbnail.jpg"
            style={{ 
              outline: 'none',
              transform: 'scale(1.005)',
              margin: '0 auto',
            }}
            playsInline // Better mobile experience
            muted={false} // Ensure sound is on by default
          >
            Your browser does not support the video tag.
          </video>
          
          {/* Minimal Play Button - visible on hover or when paused */}
          <button
            onClick={togglePlay}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-3 hover:bg-opacity-50 transition-all ${isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'} ${!isPlaying && isVisible && !hasInteracted ? 'animate-pulse' : ''}`}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            style={{ transition: 'opacity 0.3s ease' }}
          >
            {isPlaying ? (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          
          {/* Progress Bar Container - visible on hover */}
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-4 py-2 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Progress Bar */}
            <div 
              ref={progressRef}
              className="h-2 rounded-full cursor-pointer"
              style={{ backgroundColor: '#d1d5db' }}
              onClick={handleProgressClick}
            >
              <div 
                className="h-full rounded-full relative"
                style={{ width: `${progress}%`, backgroundColor: '#002F63' }}
              >
                {/* Progress Thumb */}
                <div className="absolute w-3 h-3 rounded-full right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: '#002F63' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
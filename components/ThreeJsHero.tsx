"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Image from "next/image";
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';

export default function ThreeJsHero() {
  const { language } = useLanguage();
  const t = translations[language];
  const canvasRef = useRef<HTMLDivElement>(null);
  const [modelStatus, setModelStatus] = useState<string>("Loading 3D model...");
  
  // Fixed values
  const baseScaleFactor = 3.0; // Scale factor
  const cameraDistance = 3;
  const zRotation = -45; // 45 degree rotation on Z axis (in degrees)
  const yRotation = 180; // Y rotation 

  // Scroll animation settings
  const minZRotation = zRotation * (Math.PI / -180); // Initial Z rotation (converted to radians)
  const maxZRotation = (zRotation + 45) * (Math.PI / -180); // More negative rotation on scroll
  const minCameraY = 0; // Initial Y position
  const maxCameraY = 1.55; // Final Y position on full scroll
  const minCameraZ = cameraDistance; // Initial Z distance
  const maxCameraZ = cameraDistance - 1.50; // Final Z distance (zoomed in) on full scroll
  
  // Animation settings
  const rotationSpeed = 0.005; // Speed of rotation animation
  
  // Define the scroll position where animation should stop (pixels from top)
  const stopScrollPosition = 200; // Adjust this value to match where the "FROM THE LEADERSHIP" section starts
  
  // References to keep track of scene objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const modelObjectRef = useRef<THREE.Object3D | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cameraGroupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const actualScaleFactorRef = useRef<number>(0);

  useEffect(() => {
    const canvasContainer = canvasRef.current;
    if (!canvasContainer) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf0f0f0); // Light gray background
    
    // Create a camera group to handle camera rotations
    const cameraGroup = new THREE.Group();
    scene.add(cameraGroup);
    cameraGroupRef.current = cameraGroup;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60, // Wider field of view
      canvasContainer.clientWidth / canvasContainer.clientHeight, 
      0.1, 
      1000
    );
    cameraRef.current = camera;
    
    // Add camera to camera group
    cameraGroup.add(camera);
    
    // Position camera within the group
    camera.position.z = cameraDistance;
    
    // Apply initial Z rotation to camera group
    cameraGroup.rotation.z = minZRotation;
    
    // Create renderer with alpha
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    rendererRef.current = renderer;
    
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    canvasContainer.appendChild(renderer.domElement);
    
    // Create a group to hold the model - this will be used for animation
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelRef.current = modelGroup;
    
    // Load 3D Model
    const loader = new GLTFLoader();
    setModelStatus("Attempting to load 3D model...");
    
    loader.load(
      "/tripo_pbr_model_50b8373b-68de-4f0e-bf1c-60efbaaf5e20.glb",
      (gltf) => {
        setModelStatus("Model loaded successfully!");
        
        // Store reference to the original model
        modelObjectRef.current = gltf.scene;
        
        // Calculate bounding box to determine model size
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        
        // Get the largest dimension of the model
        const maxDimension = Math.max(size.x, size.y, size.z);
        
        // Apply scaling uniformly
        const baseActualScaleFactor = baseScaleFactor / maxDimension;
        actualScaleFactorRef.current = baseActualScaleFactor;
        
        gltf.scene.scale.set(baseActualScaleFactor, baseActualScaleFactor, baseActualScaleFactor);
        
        // Position model so its center is at (0,0,0) within the group
        gltf.scene.position.x = -center.x * baseActualScaleFactor;
        gltf.scene.position.y = -center.y * baseActualScaleFactor;
        gltf.scene.position.z = -center.z * baseActualScaleFactor;
        // turn model 180 degrees on Y axis
        gltf.scene.rotation.y = (yRotation * Math.PI) / 180;
        
        // Add the model to the rotation group
        modelGroup.add(gltf.scene);
        
        // Hide loading status message once model is loaded
        setTimeout(() => {
          setModelStatus("");
        }, 1000);
      },
      (progress) => {
        const percentComplete = Math.round((progress.loaded / progress.total) * 100);
        setModelStatus(`Loading: ${percentComplete}%`);
      },
      (error) => {
        setModelStatus("Error loading model");
        console.error("An error occurred while loading the 3D model:", error);
      }
    );
    
    // Add lights with more intensity
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(5, 10, 7.5);
    scene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-5, 5, -7.5);
    scene.add(directionalLight2);

    // Scroll handler for camera animation
    const handleScroll = () => {
      if (!cameraGroupRef.current || !cameraRef.current) return;
      
      // Get current scroll position
      const scrollPosition = window.scrollY;
      
      // Only apply animation if we haven't reached the stop position
      if (scrollPosition <= stopScrollPosition) {
        // Calculate animation progress as a percentage of the stop position
        const scrollPercentage = Math.min(scrollPosition / stopScrollPosition, 1);
        
        // Interpolate camera group Z rotation
        const zRotation = minZRotation + (scrollPercentage * (maxZRotation - minZRotation));
        cameraGroupRef.current.rotation.z = zRotation;
        
        // Interpolate camera Y position (move up)
        const yPosition = minCameraY + (scrollPercentage * (maxCameraY - minCameraY));
        cameraRef.current.position.y = yPosition;
        
        // Interpolate camera Z position (zoom in)
        const zPosition = minCameraZ + (scrollPercentage * (maxCameraZ - minCameraZ));
        cameraRef.current.position.z = zPosition;
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Animation Loop with X-axis rotation of the model
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Continuously rotate the model group around X axis
      if (modelRef.current) {
        modelRef.current.rotation.y += rotationSpeed;
      }
      
      renderer.render(scene, camera);
    };
    
    // Start animation
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!canvasContainer) return;
      
      camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      
      if (canvasContainer.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement);
      }
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] w-full bg-white overflow-hidden">
      {/* Text overlay - adjusted to be lower with mt-16 (margin-top) */}
      <div className="absolute top-0 left-0 z-10 p-8 md:p-[5%] mt-16">
        <div>
          <h1 className="text-[#002F63] text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-none mb-4">
            {t.hero.years}
          </h1>
          {/* Replaced text with SVG logo */}
          <div className="mb-8">
            <img 
              src="/logo.svg" 
              alt="Optiprint Logo" 
              className="w-auto h-32 md:h-40 lg:h-56 xl:h-64"
            />
          </div>
          <h3 className="text-5xl md:text-6xl lg:text-7xl font-normal italic text-black mt-8"> </h3>
        </div>
      </div>
      
      {/* Full width canvas container */}
      <div className="w-full h-[90vh] relative overflow-hidden bg-gray-100" ref={canvasRef}></div>
      
    </section>
  );
}

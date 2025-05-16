
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface AnimatedSvgPathProps {
  className?: string;
}

const AnimatedSvgPath: React.FC<AnimatedSvgPathProps> = ({ className }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Get all paths in the SVG
    const paths = svgRef.current.querySelectorAll("path");
    
    // Set initial state (paths invisible)
    gsap.set(paths, { 
      strokeDasharray: path => path.getTotalLength(),
      strokeDashoffset: path => path.getTotalLength(),
      opacity: 0
    });

    // Create animation for each path
    paths.forEach((path, index) => {
      gsap.to(path, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.5,
        delay: index * 0.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 75%",
          toggleActions: "play none none reset"
        }
      });
    });
    
    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <svg 
      ref={svgRef}
      className={className}
      width="200" 
      height="200" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Code symbol */}
      <path 
        d="M70 80L50 100L70 120" 
        stroke="#64FFDA" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M130 80L150 100L130 120" 
        stroke="#64FFDA" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M100 70L90 130" 
        stroke="#64FFDA" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Outline circle */}
      <path
        d="M100 180C144.183 180 180 144.183 180 100C180 55.8172 144.183 20 100 20C55.8172 20 20 55.8172 20 100C20 144.183 55.8172 180 100 180Z"
        stroke="#64FFDA"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AnimatedSvgPath;

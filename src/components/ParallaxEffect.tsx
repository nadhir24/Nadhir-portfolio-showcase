import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ParallaxEffect = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header text animation
    gsap.from(".hero-text", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
    });

    // Parallax sections
    const sections = document.querySelectorAll(".section-parallax");
    sections.forEach((section) => {
      gsap.to(section, {
        backgroundPositionY: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Animate elements on scroll
    const animateElements = document.querySelectorAll(".animate-on-scroll");
    animateElements.forEach((element) => {
      gsap.from(element, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    // Floating elements
    const floatingElements = document.querySelectorAll(".floating");
    floatingElements.forEach((element, index) => {
      gsap.to(element, {
        y: "20px",
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: index * 0.2,
      });
    });

    // Added: SVG path animations for existing SVGs in the document
    document.querySelectorAll('.svg-animate path').forEach((path, i) => {
      if (path instanceof SVGPathElement) {
        const length = path.getTotalLength();
        
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length
        });
        
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          delay: i * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: path,
            start: "top 80%",
            toggleActions: "play none none reset"
          }
        });
      }
    });

    return () => {
      // Clean up scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={parallaxRef} className="fixed inset-0 pointer-events-none z-0">
      <div className="floating absolute top-[20%] left-[10%] w-12 h-12 opacity-30">
        <div className="h-full w-full rounded-full bg-portfolio-teal/30 blur-xl"></div>
      </div>
      <div className="floating absolute top-[60%] right-[15%] w-20 h-20 opacity-20">
        <div className="h-full w-full rounded-full bg-portfolio-teal/30 blur-xl"></div>
      </div>
      <div className="floating absolute top-[30%] right-[25%] w-16 h-16 opacity-20">
        <div className="h-full w-full rounded-full bg-blue-500/30 blur-xl"></div>
      </div>
      
      {/* Added: SVG decorative patterns */}
      <div className="absolute bottom-[10%] left-[5%] w-32 h-32 opacity-10 svg-animate">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path 
            d="M10,50 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0" 
            fill="none" 
            stroke="#64FFDA" 
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="absolute top-[15%] right-[8%] w-24 h-24 opacity-10 svg-animate">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path 
            d="M10,10 L90,10 L90,90 L10,90 Z" 
            fill="none" 
            stroke="#64FFDA" 
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
};

export default ParallaxEffect;

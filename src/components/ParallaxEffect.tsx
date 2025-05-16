
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
    </div>
  );
};

export default ParallaxEffect;

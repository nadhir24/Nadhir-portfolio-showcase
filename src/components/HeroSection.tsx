
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Set visibility after a delay to trigger animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // GSAP animations
    if (sectionRef.current) {
      const tl = gsap.timeline();
      
      tl.from(".hero-text-1", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      .from(".hero-text-2", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.7")
      .from(".hero-text-3", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.7")
      .from(".hero-text-4", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.7")
      .from(".hero-cta", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.5");

      // Create floating elements effect
      gsap.to(".hero-shape", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-portfolio-teal/5 rounded-full blur-3xl hero-shape"></div>
      <div className="absolute -bottom-32 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl hero-shape"></div>
      
      <div className="hero-text-1">
        <p className="font-mono text-portfolio-teal mb-5 text-sm md:text-base">Hi, my name is</p>
      </div>
      
      <div className="hero-text-2">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-portfolio-lightest-slate mb-4">
          Nadhir Ghassan.
        </h1>
      </div>
      
      <div className="hero-text-3">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-portfolio-slate mb-6">
          I build things for the web.
        </h2>
      </div>
      
      <div className="hero-text-4 max-w-xl">
        <p className="text-portfolio-slate mb-12 text-lg">
          I'm a fullstack developer specializing in building exceptional digital experiences. 
          Currently, I'm focused on building accessible, human-centered products.
        </p>
      </div>
      
      <div className="hero-cta">
        <a href="#projects">
          <Button 
            className="bg-transparent border border-portfolio-teal text-portfolio-teal hover:bg-portfolio-teal/10 px-7 py-6"
          >
            Check out my work!
          </Button>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;


import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visibility after a delay to trigger animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} delay-[200ms]`}>
        <p className="font-mono text-portfolio-teal mb-5 text-sm md:text-base">Hi, my name is</p>
      </div>
      
      <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} delay-[400ms]`}>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-portfolio-lightest-slate mb-4">
          Nadhir Ghassan.
        </h1>
      </div>
      
      <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} delay-[600ms]`}>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-portfolio-slate mb-6">
          I build things for the web.
        </h2>
      </div>
      
      <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} delay-[800ms] max-w-xl`}>
        <p className="text-portfolio-slate mb-12 text-lg">
          I'm a fullstack developer specializing in building exceptional digital experiences. 
          Currently, I'm focused on building accessible, human-centered products.
        </p>
      </div>
      
      <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} delay-[1000ms]`}>
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


import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import ParallaxEffect from "@/components/ParallaxEffect";
import AnimatedSvgPath from "@/components/AnimatedSvgPath";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Initialize smooth scrolling effect
    const sections = document.querySelectorAll("section");
    
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleClass: { targets: section, className: "active" },
      });
    });

    // Adding smooth scroll effect for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
          document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Added: Scroll-triggered section divider SVG animations
    gsap.utils.toArray('.section-divider').forEach((divider: any) => {
      gsap.fromTo(divider, 
        { 
          width: "0%" 
        },
        { 
          width: "100%",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: divider,
            start: "top 90%",
            toggleActions: "play none none reset"
          }
        }
      );
    });
    
    return () => {
      // Clean up all scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-portfolio-navy min-h-screen overflow-x-hidden">
      <ParallaxEffect />
      <Navbar />
      
      <main className="relative z-10">
        <HeroSection />
        
        <div className="section-divider h-px bg-portfolio-teal/30 max-w-md mx-auto my-12"></div>
        
        <AboutSection />
        
        {/* Added: Decorative SVG between sections */}
        <div className="flex justify-center my-16">
          <AnimatedSvgPath className="w-24 h-24 opacity-70" />
        </div>
        
        <ProjectsSection />
        
        <div className="section-divider h-px bg-portfolio-teal/30 max-w-md mx-auto my-12"></div>
        
        <EducationSection />
        
        {/* Added: Another instance of SVG with different placement */}
        <div className="flex justify-end mr-12 my-16">
          <AnimatedSvgPath className="w-16 h-16 opacity-50" />
        </div>
        
        <CertificationsSection />
        
        <div className="section-divider h-px bg-portfolio-teal/30 max-w-md mx-auto my-12"></div>
        
        <ContactSection />
      </main>
      
      <footer className="py-6 text-center text-portfolio-slate text-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <p>Designed & Built by Nadhir Ghassan © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

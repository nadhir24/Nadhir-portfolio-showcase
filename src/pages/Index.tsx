
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="bg-portfolio-navy min-h-screen">
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      
      <footer className="py-6 text-center text-portfolio-slate text-sm">
        <div className="max-w-7xl mx-auto px-6">
          <p>Designed & Built by Nadhir Ghassan © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

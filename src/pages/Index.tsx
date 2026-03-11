
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import AnimatedBlobs from "@/components/AnimatedBlobs";
import Marquee from "@/components/Marquee";

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div style={{ position: "relative" }}>
      <AnimatedBlobs />
      <Navbar isDark={isDark} onToggleTheme={() => setIsDark((d) => !d)} />

      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      <Marquee />
    </div>
  );
};

export default Index;

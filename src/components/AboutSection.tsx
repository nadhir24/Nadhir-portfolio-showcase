
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Make sure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const skills = [
    "JavaScript (ES6+)", 
    "TypeScript",
    "React",
    "Next.js",
    "Nest.js", 
    "PostgreSQL", 
    "HTML & CSS",
    "DevOps Fundamentals",
    "Postman"
  ];

  useEffect(() => {
    if (sectionRef.current) {
      // Animate content when scrolled into view
      gsap.from(".about-heading", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
      });

      gsap.from(".skills-list li", {
        scrollTrigger: {
          trigger: ".skills-list",
          start: "top 90%",
        },
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
      });

      // Image parallax effect
      gsap.from(".about-image-container", {
        scrollTrigger: {
          trigger: ".about-image-container",
          start: "top 90%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
      });

      // Subtle parallax for the border
      gsap.to(".image-border", {
        scrollTrigger: {
          trigger: ".about-image-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        x: 15,
        y: 15,
      });
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding section-parallax relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-portfolio-navy/0 to-portfolio-light-navy/10 pointer-events-none"></div>
      
      <h2 className="numbered-heading about-heading">About Me</h2>
      
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 text-lg">
          <p className="mb-4 about-text">
            Hello! I'm Nadhir, a developer passionate about creating digital experiences that live on the internet.
            My interest in web development started back when I was in university, where I began exploring how to build
            websites and web applications.
          </p>
          
          <p className="mb-4 about-text">
            I recently graduated with a Bachelor's degree in Information Systems from Universitas Gunadarma in December 2022.
            During my time there, I actively learned coding and developed various projects to enhance my skills.
          </p>
          
          <p className="mb-4 about-text">
            I've also completed a 3-month onsite Fullstack Node.js Bootcamp at Code X Academy in 2023,
            where I honed my skills in building full-stack applications. I've recently completed a project called
            <a href="https://ranocake.vercel.app" target="_blank" rel="noopener noreferrer" className="text-portfolio-teal hover:underline"> ranocake</a>,
            which showcases my abilities as a web developer.
          </p>
          
          <p className="mb-8 about-text">
            Here are some technologies I've been working with recently:
          </p>
          
          <ul className="grid grid-cols-2 gap-2 text-base skills-list">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-start mb-2">
                <span className="text-portfolio-teal mr-2">▹</span>
                {skill}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="relative group about-image-container">
          <div className="w-full aspect-square bg-portfolio-teal/20 rounded relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-portfolio-teal/20 rounded mix-blend-multiply"></div>
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80" 
              alt="Nadhir Ghassan" 
              className="mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-300 object-cover h-full w-full"
            />
          </div>
          
          <div className="absolute -inset-1 rounded-lg border-2 border-portfolio-teal z-0 translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-300 image-border"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

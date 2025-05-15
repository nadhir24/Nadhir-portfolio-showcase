
import React from "react";

const AboutSection = () => {
  const skills = [
    "JavaScript (ES6+)", 
    "TypeScript",
    "React",
    "Node.js", 
    "Express", 
    "HTML & CSS",
    "DevOps Fundamentals",
    "Web Development"
  ];

  return (
    <section id="about" className="section-padding">
      <h2 className="numbered-heading">About Me</h2>
      
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 text-lg">
          <p className="mb-4">
            Hello! I'm Nadhir, a developer passionate about creating digital experiences that live on the internet.
            My interest in web development started back when I was in university, where I began exploring how to build
            websites and web applications.
          </p>
          
          <p className="mb-4">
            I recently graduated with a Bachelor's degree in Information Systems from Universitas Gunadarma in December 2022.
            During my time there, I actively learned coding and developed various projects to enhance my skills.
          </p>
          
          <p className="mb-4">
            I've also completed a 3-month onsite Fullstack Node.js Bootcamp at Code X Academy in 2023,
            where I honed my skills in building full-stack applications. I've recently completed a project called
            <a href="https://ranocake.vercel.app" target="_blank" rel="noopener noreferrer" className="text-portfolio-teal hover:underline"> ranocake</a>,
            which showcases my abilities as a web developer.
          </p>
          
          <p className="mb-8">
            Here are some technologies I've been working with recently:
          </p>
          
          <ul className="grid grid-cols-2 gap-2 text-base">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-start mb-2">
                <span className="text-portfolio-teal mr-2">▹</span>
                {skill}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="relative group">
          <div className="w-full aspect-square bg-portfolio-teal/20 rounded relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-portfolio-teal/20 rounded mix-blend-multiply"></div>
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80" 
              alt="Nadhir Ghassan" 
              className="mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-300 object-cover h-full w-full"
            />
          </div>
          
          <div className="absolute -inset-1 rounded-lg border-2 border-portfolio-teal z-0 translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-300"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

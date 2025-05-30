
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";

const ProjectsSection = () => {
  const featuredProjects = [
    {
      title: "Ranocake",
      description: "A modern web application for a cake shop business. Features include product catalog, online ordering, and customer reviews. Built with a responsive design that looks great on all devices.",
      image: "/lovable-uploads/8889ac13-f5b1-4ead-9f57-bc1e329dc42d.png",
      tech: ["Next.js", "Nest.js", "PostgreSQL", "Postman"],
      liveUrl: "https://ranocake.vercel.app",
      githubUrl: "https://github.com/nadhir24/ranocake"
    },
    {
      title: "62teknologi Technical Test",
      description: "Full-stack application integrating Yelp API for business listings and reviews. Demonstrates advanced API integration, data processing, and modern web development practices. Built as a technical assessment showcasing comprehensive development skills.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      tech: ["Next.js", "Nest.js", "PostgreSQL", "Yelp API", "Postman"],
      liveUrl: "#",
      githubUrl: "https://github.com/nadhir24/62teknologi-backend-test--nadhir-ghassan-"
    },
    {
      title: "Hotel Realta Management System",
      description: "Full-stack hotel management application developed during Code X Academy. I was responsible for the users module, handling user authentication, profile management, and user-related functionalities for both frontend and backend.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      tech: ["Next.js", "Nest.js", "PostgreSQL", "Postman", "Multer"],
      liveUrl: "#",
      githubUrl: "https://github.com/VierryFadhilah/hotel-realta-back-end"
    }
  ];

  return (
    <section id="projects" className="section-padding">
      <h2 className="numbered-heading">My Projects</h2>
      
      <div className="space-y-24">
        {featuredProjects.map((project, index) => (
          <div 
            key={index} 
            className="grid md:grid-cols-12 gap-4 relative"
          >
            {/* Project Image */}
            <div className={`md:col-span-7 ${index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-6 md:order-2'}`}>
              <a 
                href={project.liveUrl !== "#" ? project.liveUrl : project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block relative rounded overflow-hidden group"
              >
                <div className="absolute inset-0 bg-portfolio-teal/30 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            </div>
            
            {/* Project Content */}
            <div className={`md:col-span-7 flex flex-col justify-center ${
              index % 2 === 0 
                ? 'md:col-start-6 text-right md:items-end' 
                : 'md:col-start-1 md:order-1'
            }`}>
              <p className="font-mono text-portfolio-teal mb-1 text-sm">Featured Project</p>
              <h3 className="text-2xl font-bold mb-4 text-portfolio-lightest-slate">{project.title}</h3>
              
              <Card className="bg-portfolio-light-navy relative z-10 p-6 shadow-xl mb-4">
                <CardContent className="p-0 text-portfolio-light-slate">
                  <p>{project.description}</p>
                </CardContent>
              </Card>
              
              <ul className={`flex flex-wrap mb-6 text-sm gap-3 ${
                index % 2 === 0 ? 'justify-end' : 'justify-start'
              }`}>
                {project.tech.map((tech, techIndex) => (
                  <li key={techIndex} className="font-mono text-portfolio-light-slate">
                    {tech}
                  </li>
                ))}
              </ul>
              
              <div className="flex gap-4">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-5 h-5" />
                </a>
                {project.liveUrl !== "#" && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors"
                    aria-label="Live Preview"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-16">
        <Button className="btn">
          <a 
            href="https://github.com/nadhir24"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            View More Projects
          </a>
        </Button>
      </div>
    </section>
  );
};

export default ProjectsSection;

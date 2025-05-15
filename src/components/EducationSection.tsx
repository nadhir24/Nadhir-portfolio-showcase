
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, BookOpen } from "lucide-react";

const EducationSection = () => {
  const education = [
    {
      institution: "Universitas Gunadarma",
      degree: "Bachelor's degree, Information System",
      duration: "Sep 2018 - Dec 2022",
      description: "Activities and societies: Computers and stuff, actively learned coding and played games.",
      icon: <GraduationCap className="w-8 h-8 text-portfolio-teal" />
    },
    {
      institution: "Code X Academy",
      degree: "Fullstack Node.js Program, 3 months Onsite Bootcamp",
      duration: "Feb 2023 - May 2023",
      description: "Intensive, hands-on training in fullstack JavaScript development with Node.js, Express, and modern front-end frameworks.",
      credential: "Credential ID: 23/ACD/IV/2/0026",
      icon: <BookOpen className="w-8 h-8 text-portfolio-teal" />
    }
  ];

  return (
    <section id="education" className="section-padding">
      <h2 className="numbered-heading">Education & Experience</h2>
      
      <div className="grid gap-8">
        {education.map((item, index) => (
          <div key={index} className="md:flex gap-6 items-start group">
            <div className="md:w-1/12 mb-4 md:mb-0 flex justify-center">
              {item.icon}
            </div>
            
            <Card className="md:w-11/12 bg-portfolio-light-navy border-none shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <CardTitle className="text-portfolio-lightest-slate text-xl">{item.institution}</CardTitle>
                  <span className="text-sm text-portfolio-slate font-mono">{item.duration}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <h4 className="text-portfolio-light-slate font-medium mb-2">{item.degree}</h4>
                <p className="text-portfolio-slate mb-2">{item.description}</p>
                {item.credential && (
                  <p className="text-sm font-mono text-portfolio-teal">{item.credential}</p>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Separator className="w-16 bg-portfolio-teal h-0.5" />
      </div>
    </section>
  );
};

export default EducationSection;

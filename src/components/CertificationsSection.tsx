
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, ExternalLink } from "lucide-react";

const CertificationsSection = () => {
  const certifications = [
    {
      title: "Fullstack Node.js Program",
      issuer: "Code X Academy",
      issueDate: "May 2023",
      credentialId: "23/ACD/IV/2/0026",
      url: "#",
      skills: ["Node.js"]
    },
    {
      title: "Belajar Dasar-Dasar DevOps",
      issuer: "Dicoding Indonesia",
      issueDate: "Nov 2022",
      credentialId: "0LZ0GGQ63X65",
      url: "https://www.dicoding.com/certificates/0LZ0GGQ63X65",
      skills: ["DevOps"]
    },
    {
      title: "Belajar Dasar Pemrograman JavaScript",
      issuer: "Dicoding Indonesia",
      issueDate: "Oct 2022",
      expirationDate: "Oct 2025",
      credentialId: "JLX1L3JYJX72",
      url: "https://www.dicoding.com/certificates/JLX1L3JYJX72",
      skills: ["JavaScript"]
    },
    {
      title: "Kursus HTML & CSS",
      issuer: "Progate",
      issueDate: "Oct 2022",
      url: "https://progate.com/course_certificate/e4cdc974rk3myb",
      skills: ["Web Development"]
    },
    {
      title: "Kursus Javascript",
      issuer: "Progate",
      issueDate: "Oct 2022",
      url: "https://progate.com/course_certificate/c86122berjzrgc",
      skills: ["Web Development"]
    },
    {
      title: "Competence Certificate",
      issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
      issueDate: "Sep 2022",
      expirationDate: "Sep 2025",
      credentialId: "TIK.705.03230.2022",
      url: "https://drive.google.com/file/d/1hYaPIRcLjxr4dnQg17KeVvUtc_ZcFurw/view",
      skills: ["Professional Certification"]
    },
  ];

  return (
    <section id="certifications" className="section-padding">
      <h2 className="numbered-heading">Certifications</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <Card 
            key={index} 
            className="bg-portfolio-light-navy border-none shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="text-portfolio-teal">
                  <Award className="w-8 h-8" />
                </div>
                {cert.url && (
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-portfolio-lightest-slate opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="View Credential"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
              <CardTitle className="text-portfolio-lightest-slate text-xl mt-2">{cert.title}</CardTitle>
              <CardDescription className="text-portfolio-light-slate">{cert.issuer}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="mb-2">
                <span className="text-sm text-portfolio-slate">
                  {cert.issueDate} {cert.expirationDate && `· Expires ${cert.expirationDate}`}
                </span>
              </div>
              
              {cert.credentialId && (
                <p className="text-sm font-mono text-portfolio-teal mb-3">
                  Credential ID: {cert.credentialId}
                </p>
              )}
              
              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {cert.skills.map((skill, i) => (
                    <Badge key={i} className="bg-portfolio-teal/20 text-portfolio-teal hover:bg-portfolio-teal/30 border-none">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;

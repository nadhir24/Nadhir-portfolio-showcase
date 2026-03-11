import { useEffect, useRef } from "react";
import { Award, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certs = [
  { title: "Fullstack Node.js Program", issuer: "Code X Academy", date: "May 2023", id: "23/ACD/IV/2/0026", url: "https://drive.google.com/file/d/1TmxXEG6Yr4FAvSqxAh5maA3CmOMj5Jj9/view", tag: "Node.js" },
  { title: "Belajar Dasar-Dasar DevOps", issuer: "Dicoding Indonesia", date: "Nov 2022", id: "0LZ0GGQ63X65", url: "https://www.dicoding.com/certificates/0LZ0GGQ63X65", tag: "DevOps" },
  { title: "Belajar Dasar Pemrograman JavaScript", issuer: "Dicoding Indonesia", date: "Oct 2022", id: "JLX1L3JYJX72", url: "https://www.dicoding.com/certificates/JLX1L3JYJX72", tag: "JavaScript" },
  { title: "Kursus HTML & CSS", issuer: "Progate", date: "Oct 2022", url: "https://progate.com/course_certificate/e4cdc974rk3myb", tag: "Web Dev" },
  { title: "Kursus Javascript", issuer: "Progate", date: "Oct 2022", url: "https://progate.com/course_certificate/c86122berjzrgc", tag: "Web Dev" },
  { title: "Competence Certificate", issuer: "BNSP", date: "Sep 2022", id: "TIK.705.03230.2022", url: "https://drive.google.com/file/d/1hYaPIRcLjxr4dnQg17KeVvUtc_ZcFurw/view", tag: "Professional" },
];

const CertificationsSection = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll(".cert-item"), {
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
      y: 35, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out",
    });
  }, []);

  return (
    <section id="certifications" ref={ref} className="sc-section">
      <h2 className="sc-section-title">Certifications</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
        {certs.map((c, i) => (
          <a
            key={i}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-item sc-card sc-link"
            style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Award size={22} style={{ color: "var(--text-muted)" }} />
              <ExternalLink size={14} style={{ color: "var(--text-muted)", opacity: 0.4 }} />
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text)", margin: 0, lineHeight: 1.35 }}>{c.title}</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>{c.issuer}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
              <span className="skill-chip">{c.tag}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", opacity: 0.6 }}>{c.date}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;

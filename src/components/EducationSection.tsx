import { useEffect, useRef } from "react";
import { GraduationCap, BookOpen } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    institution: "Universitas Gunadarma",
    role: "Bachelor's degree, Information System",
    period: "Sep 2018 – Dec 2022",
    note: "Actively learned coding, developed various projects, and explored computers and stuff.",
    Icon: GraduationCap,
  },
  {
    institution: "Code X Academy",
    role: "Fullstack Node.js Bootcamp (3 months Onsite)",
    period: "Feb 2023 – May 2023",
    note: "Intensive training in fullstack JavaScript — Node.js, Express, and modern front-end frameworks.",
    credential: "Credential ID: 23/ACD/IV/2/0026",
    Icon: BookOpen,
  },
];

const EducationSection = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll(".edu-item"), {
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
      y: 40, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power3.out",
    });
  }, []);

  return (
    <section id="education" ref={ref} className="sc-section">
      <h2 className="sc-section-title">Experience</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {items.map((item, i) => (
          <div key={i} className="edu-item sc-card" style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
            <item.Icon size={28} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "0.2rem" }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.4rem" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text)", margin: 0 }}>{item.institution}</h3>
                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontFamily: "monospace" }}>{item.period}</span>
              </div>
              <p style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--text)", marginBottom: "0.4rem" }}>{item.role}</p>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--text-muted)" }}>{item.note}</p>
              {item.credential && (
                <p style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem", opacity: 0.7 }}>
                  {item.credential}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;

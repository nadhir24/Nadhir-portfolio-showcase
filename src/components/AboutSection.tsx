import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "JavaScript (ES6+)", "TypeScript", "React", "Next.js",
  "Nest.js", "PostgreSQL", "HTML & CSS", "DevOps", "Postman",
];

const AboutSection = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll(".fade-up"), {
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
      y: 40, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out",
    });
  }, []);

  return (
    <section id="about" ref={ref} className="sc-section">
      <h2 className="sc-section-title fade-up">About</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }} className="md:grid-cols-[2fr_1fr]">
        {/* Text */}
        <div>
          <p className="fade-up" style={{ fontSize: "1.15rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.25rem" }}>
            Hello! I'm <strong style={{ color: "var(--text)", fontWeight: 600 }}>Nadhir</strong>, a developer passionate about creating
            digital experiences that live on the internet. My interest in web development started back in university,
            where I began exploring how to build websites and web applications.
          </p>
          <p className="fade-up" style={{ fontSize: "1.15rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.25rem" }}>
            I graduated with a Bachelor's degree in Information Systems from Universitas Gunadarma (Dec 2022)
            and completed a 3-month Fullstack Node.js Bootcamp at Code X Academy in 2023.
          </p>
          <p className="fade-up" style={{ fontSize: "1.15rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "2.5rem" }}>
            I recently completed{" "}
            <a href="https://ranocake.vercel.app" target="_blank" rel="noopener noreferrer" className="sc-link"
              style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>
              ranocake
            </a>
            , which showcases my abilities as a fullstack developer.
          </p>

          {/* Skills as chips */}
          <div className="fade-up" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {skills.map((s) => (
              <span key={s} className="skill-chip">{s}</span>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div className="fade-up" style={{ position: "relative" }}>
          <div style={{
            borderRadius: "1.25rem", overflow: "hidden", aspectRatio: "1/1",
            border: "1px solid var(--border-color)"
          }}>
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
              alt="Nadhir Ghassan"
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                filter: "grayscale(20%)", transition: "filter 0.4s ease, transform 0.4s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = "grayscale(0%)"; e.currentTarget.style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = "grayscale(20%)"; e.currentTarget.style.transform = "scale(1)"; }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

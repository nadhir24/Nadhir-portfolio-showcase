import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left + 20, y: e.clientY - rect.top - 60 });
  };

  const handleProjectClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setHovered(null); // Hide floating preview instantly

    // Aesthetic fade out transition before route change
    gsap.to(sectionRef.current?.querySelectorAll(".proj-row") || [], {
      y: -20,
      opacity: 0,
      stagger: 0.04,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        navigate(`/work/${id}`);
      }
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    // Create GSAP context for better React 18 lifestyle management
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!.querySelectorAll(".proj-row"), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          onEnter: () => ScrollTrigger.refresh() // Ensure accurate calculation
        },
        y: 30, stagger: 0.08, duration: 0.7, ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="sc-section">
      <h2 className="sc-section-title">Selected Works</h2>

      {/* Thick top line */}
      <div style={{ height: "2px", background: "var(--text)", marginBottom: "0" }} />

      {/* Project list */}
      <div style={{ position: "relative" }} onMouseMove={handleMouseMove}>
        {projectsData.map((p, i) => (
          <a
            key={i}
            href={`/work/${p.id}`}
            onClick={(e) => handleProjectClick(e, p.id)}
            className="proj-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1.5rem 0.5rem",
              borderBottom: "1px solid var(--border-color)",
              textDecoration: "none",
              color: "var(--text)",
              transition: "opacity 0.25s ease",
              cursor: "pointer",
              position: "relative",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Left: indicator pill + name */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "6px",
                  height: "2rem",
                  borderRadius: "3px",
                  background: "var(--text)",
                  opacity: 1, // Full opacity as requested
                  transition: "opacity 0.25s ease",
                }}
              />
              <span
                style={{
                  fontSize: "clamp(1.3rem, 3vw, 2rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  opacity: 1, // Full opacity as requested
                  transition: "opacity 0.25s ease",
                }}
              >
                {p.title}
              </span>
            </div>

            {/* Right: category */}
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: 400,
                color: "var(--text-muted)",
                opacity: 1, // Full opacity as requested
                transition: "opacity 0.25s ease",
              }}
            >
              {p.category}
            </span>
          </a>
        ))}

        {/* Floating preview card (appears on hover) */}
        {hovered !== null && (
          <div
            style={{
              position: "absolute",
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              width: "280px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              backdropFilter: "blur(16px)",
              borderRadius: "1rem",
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 50,
              boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
              transition: "opacity 0.2s ease",
            }}
          >
            <img
              src={projectsData[hovered].image}
              alt={projectsData[hovered].title}
              style={{ width: "100%", height: "140px", objectFit: "cover", display: "block" }}
            />
            <div style={{ padding: "0.75rem 1rem" }}>
              <p style={{ fontSize: "0.85rem", color: "var(--text)", fontWeight: 500, margin: 0 }}>
                {projectsData[hovered].description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* View more */}
      <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}>
        <a
          href="https://github.com/nadhir24"
          target="_blank"
          rel="noopener noreferrer"
          className="sc-link"
          style={{
            fontSize: "0.85rem", fontWeight: 500, color: "var(--text-muted)",
            padding: "0.6rem 1.5rem", borderRadius: "9999px",
            border: "1px solid var(--border-color)",
          }}
        >
          View More on GitHub ↗
        </a>
      </div>
    </section>
  );
};

export default ProjectsSection;

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Hero3D from "./Hero3D";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-name", { y: 80, opacity: 0, duration: 1.2 })
      .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
      .from(".hero-links", { y: 20, opacity: 0, duration: 0.8 }, "-=0.4");
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign: "left",
        position: "relative",
        zIndex: 10,
        padding: "0 10vw",
      }}
    >
      {/* 3D Background canvas */}
      <Hero3D />

      <div style={{ position: "relative", zIndex: 20, maxWidth: "600px" }}>
        {/* Giant name */}
        <div className="hero-name">
          <h1
            style={{
              fontSize: "clamp(3rem, 9vw, 9rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 0.85,
              color: "var(--text)",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Nadhir
            <br />
            Ghassan
          </h1>
        </div>

        {/* CTA links */}
        <div
          className="hero-links"
          style={{
            display: "flex",
            gap: "2.5rem",
            marginTop: "3rem",
          }}
        >
          <button
            onClick={() => scrollTo("#projects")}
            style={{
              background: "none",
              border: "none",
              fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
              fontWeight: 500,
              color: "var(--text)",
              cursor: "pointer",
              padding: 0,
              textDecoration: "none",
              transition: "opacity 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.35")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            see my work
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            style={{
              background: "none",
              border: "none",
              fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
              fontWeight: 500,
              color: "var(--text)",
              cursor: "pointer",
              padding: 0,
              textDecoration: "none",
              transition: "opacity 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.35")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            get in touch
          </button>
        </div>
      </div>

      {/* Marquee at bottom of hero */}
      <div
        className="hero-sub"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
        }}
      >
        <div className="marquee-wrapper">
          <div className="marquee-inner">
            {[1, 2].map((dup) => (
              <span key={dup}>
                {["Frontend Development", "Web Design", "UX Design", "Full-Stack Development", "React", "TypeScript"].map((s) => (
                  <span key={`${dup}-${s}`}>• {s}&nbsp;&nbsp;&nbsp;</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

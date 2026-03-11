import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skills = [
    "JavaScript (ES6+)", "TypeScript", "React", "Next.js",
    "Nest.js", "PostgreSQL", "HTML & CSS", "DevOps", "Postman",
];

const AboutPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const imgWrapperRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Main text and elements fade-up reveal
        const elements = gsap.utils.toArray(".fade-up") as HTMLElement[];

        elements.forEach((el) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        });

        // Skill chips stagger
        gsap.from(".skill-chip", {
            scrollTrigger: {
                trigger: ".skills-container",
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            y: 20,
            opacity: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: "back.out(1.5)"
        });

        // Parallax and mask reveal for the image
        if (imgWrapperRef.current && imgRef.current) {
            // Unmask effect
            gsap.fromTo(imgWrapperRef.current,
                { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
                {
                    scrollTrigger: {
                        trigger: imgWrapperRef.current,
                        start: "top 80%",
                    },
                    clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                    duration: 1.5,
                    ease: "power4.inOut"
                }
            );

            // Parallax scroll effect inside the wrapper
            gsap.fromTo(imgRef.current,
                { y: "-10%" },
                {
                    scrollTrigger: {
                        trigger: imgWrapperRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                    y: "10%",
                    ease: "none"
                }
            );
        }
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                zIndex: 10,
                maxWidth: "72rem",
                margin: "0 auto",
                padding: "7rem 2rem 4rem",
            }}
        >
            <h1 className="fade-up sc-section-title" style={{ marginBottom: "3rem" }}>About</h1>

            <div
                className="about-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "3rem",
                    alignItems: "start",
                }}
            >
                {/* Text */}
                <div>
                    <p className="fade-up" style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                        I am a results-driven <strong style={{ color: "var(--text)", fontWeight: 600 }}>Full-Stack Developer</strong> specializing in building robust, scalable web applications. With a Bachelor's degree in Information Systems from Universitas Gunadarma and specialized training in modern Node.js ecosystems, I possess a strong foundation in both system architecture and user-centric design.
                    </p>
                    <p className="fade-up" style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "2.5rem" }}>
                        My recent projects, including comprehensive e-commerce platforms like
                        <a href="https://ranocake.vercel.app" target="_blank" rel="noopener noreferrer"
                            style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: "3px", transition: "opacity 0.2s", margin: "0 0.3rem" }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.4")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                            Ranocake
                        </a>
                        and
                        <a href="https://deenha.com" target="_blank" rel="noopener noreferrer"
                            style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: "3px", transition: "opacity 0.2s", margin: "0 0.3rem" }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.4")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                            Deenha
                        </a>
                        , reflect my commitment to engineering seamless digital experiences from the database layout to the frontend interface.
                    </p>

                    <div className="fade-up" style={{ marginBottom: "2.5rem" }}>
                        <a
                            href="/Nadhir Ghassan-resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                                padding: "0.8rem 1.5rem", borderRadius: "9999px",
                                border: "1px solid var(--border-color)", background: "transparent",
                                color: "var(--text)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500,
                                transition: "background 0.2s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--border-color)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                            Download Resume <Download size={16} />
                        </a>
                    </div>

                    <div className="skills-container" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {skills.map((s) => (
                            <span key={s} className="skill-chip">{s}</span>
                        ))}
                    </div>
                </div>

                {/* Photo */}
                <div style={{ position: "relative", maxWidth: "400px", margin: "0 auto", width: "100%" }}>
                    <div ref={imgWrapperRef} style={{ borderRadius: "1.25rem", overflow: "hidden", border: "1px solid var(--border-color)", height: "400px", position: "relative" }}>
                        <img
                            ref={imgRef}
                            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
                            alt="Nadhir Ghassan"
                            style={{
                                width: "100%", height: "120%", objectFit: "cover", // 120% height for parallax room
                                position: "absolute", top: 0, left: 0,
                                filter: "grayscale(20%)", transition: "filter 0.4s ease, transform 0.5s ease", display: "block",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.filter = "grayscale(0%)"; e.currentTarget.style.transform = "scale(1.03)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.filter = "grayscale(20%)"; e.currentTarget.style.transform = "scale(1)"; }}
                        />
                    </div>
                </div>
            </div>

            {/* Next Page Navigation */}
            <div className="fade-up" style={{ marginTop: "6rem", display: "flex", justifyContent: "flex-end", borderTop: "1px solid var(--border-color)", paddingTop: "2rem" }}>
                <Link
                    to="/work"
                    style={{
                        display: "flex", alignItems: "center", gap: "1rem", color: "var(--text)", textDecoration: "none",
                        fontSize: "1.2rem", fontWeight: 600, transition: "opacity 0.2s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                    Next: Selected Works <ArrowRight size={20} />
                </Link>
            </div>
        </div>
    );
};

export default AboutPage;

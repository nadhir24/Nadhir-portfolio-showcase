import { useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, Download, MapPin } from "lucide-react";
import { usePageNavigate } from "@/hooks/usePageNavigate";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useIsPresent } from "framer-motion";
import { eventBus } from "@/lib/eventBus";

gsap.registerPlugin(ScrollTrigger);

const skills = [
    "JavaScript (ES6+)", "TypeScript", "React", "Next.js",
    "Nest.js", "PostgreSQL", "HTML & CSS", "DevOps", "Postman",
];

const AboutPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigateTo = usePageNavigate(containerRef);
    const imgRef = useRef<HTMLImageElement>(null);
    const imgWrapperRef = useRef<HTMLDivElement>(null);
    const isPresent = useIsPresent();

    const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 16px 48px rgba(0, 0, 0, 0.08)";
    };

    const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
    };

    const bentoCardStyle = {
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        backdropFilter: "blur(14px)",
        borderRadius: "1.25rem",
        padding: "1.5rem",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
    } as const;

    useEffect(() => {
        if (!isPresent) {
            eventBus.emit("PAGE_TRANSITION_OUT", { type: "fold" });
        } else {
            eventBus.emit("PAGE_TRANSITION_IN", { type: "fade" });
        }
    }, [isPresent]);

    useGSAP(() => {
        const mm = gsap.matchMedia();

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

        mm.add("(min-width: 768px)", () => {
            ScrollTrigger.create({
                trigger: ".about-photo-col",
                start: "top 120px",
                end: "bottom bottom",
                endTrigger: ".about-content-col",
                pin: true,
                pinSpacing: false,
            });
        });

        return () => {
            mm.revert();
        };
    }, { scope: containerRef });

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
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

            <div className="about-layout">
                <div
                    className="about-photo-col"
                >
                    <div
                        className="fade-up"
                        style={{ ...bentoCardStyle, minHeight: "420px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.5rem" }}
                        onMouseEnter={handleCardMouseEnter}
                        onMouseLeave={handleCardMouseLeave}
                    >
                        <div>
                            <p style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>
                                Portrait
                            </p>
                        </div>
                        <div ref={imgWrapperRef} style={{ borderRadius: "1rem", overflow: "hidden", border: "1px solid var(--border-color)", height: "340px", position: "relative" }}>
                            <img
                                ref={imgRef}
                                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
                                alt="Nadhir Ghassan"
                                style={{
                                    width: "100%",
                                    height: "120%",
                                    objectFit: "cover",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    filter: "grayscale(20%)",
                                    transition: "filter 0.4s ease, transform 0.5s ease",
                                    display: "block",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.filter = "grayscale(0%)";
                                    e.currentTarget.style.transform = "scale(1.03)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.filter = "grayscale(20%)";
                                    e.currentTarget.style.transform = "scale(1)";
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="about-content-col about-bento-stack">
                    <div
                        className="fade-up about-bio-card"
                        style={{ ...bentoCardStyle, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1rem", minHeight: "320px" }}
                        onMouseEnter={handleCardMouseEnter}
                        onMouseLeave={handleCardMouseLeave}
                    >
                        <div>
                            <p style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>
                                Bio
                            </p>
                            <p style={{ fontSize: "clamp(1.2rem, 2.4vw, 1.7rem)", lineHeight: 1.6, color: "var(--text)", maxWidth: "36rem" }}>
                                I build polished full-stack products that feel as thoughtful in the interface as they are solid in the architecture.
                                My focus is turning ambitious ideas into fast, scalable web experiences with clear visual taste.
                            </p>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", color: "var(--text-muted)", fontSize: "0.95rem" }}>
                            <span>Fullstack Developer</span>
                            <span>•</span>
                            <span>React · Next.js · Nest.js</span>
                        </div>
                    </div>

                    <div
                        className="fade-up"
                        style={{ ...bentoCardStyle, display: "flex", flexDirection: "column", gap: "1.25rem", justifyContent: "space-between" }}
                        onMouseEnter={handleCardMouseEnter}
                        onMouseLeave={handleCardMouseLeave}
                    >
                        <div>
                            <p style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>
                                Status
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", color: "var(--text)", fontSize: "1rem", fontWeight: 600, marginBottom: "0.9rem" }}>
                                <MapPin size={16} />
                                <span>Indonesia</span>
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--text)", fontWeight: 600 }}>
                            <span className="status-dot" />
                            <span>Open to Work</span>
                        </div>
                    </div>

                    <div
                        className="fade-up skills-container"
                        style={{ ...bentoCardStyle, display: "flex", flexDirection: "column", gap: "1.25rem" }}
                        onMouseEnter={handleCardMouseEnter}
                        onMouseLeave={handleCardMouseLeave}
                    >
                        <p style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                            Tech Stack
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                            {skills.map((s) => (
                                <span key={s} className="skill-chip">{s}</span>
                            ))}
                        </div>
                    </div>

                    <div
                        className="fade-up"
                        style={{ ...bentoCardStyle, display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "space-between" }}
                        onMouseEnter={handleCardMouseEnter}
                        onMouseLeave={handleCardMouseLeave}
                    >
                        <div>
                            <p style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>
                                Currently Building
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.85rem" }}>
                                <span className="teal-dot" />
                                <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>Deenha</span>
                            </div>
                            <a
                                href="https://deenha.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: "4px", transition: "opacity 0.2s ease" }}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                            >
                                deenha.com ↗
                            </a>
                        </div>
                        <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                            An evolving commerce platform focused on elegant browsing, seamless ordering, and a smoother brand story.
                        </p>
                    </div>

                    <div
                        className="fade-up"
                        style={{ ...bentoCardStyle, display: "flex", flexDirection: "column", gap: "1.25rem", justifyContent: "space-between" }}
                        onMouseEnter={handleCardMouseEnter}
                        onMouseLeave={handleCardMouseLeave}
                    >
                        <div>
                            <p style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>
                                Resume
                            </p>
                            <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                                Download my latest resume for a snapshot of product work, engineering strengths, and project experience.
                            </p>
                        </div>
                        <div>
                            <a
                                href="/Nadhir%20Ghassan-resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.8rem 1.5rem",
                                    borderRadius: "9999px",
                                    border: "1px solid var(--border-color)",
                                    background: "transparent",
                                    color: "var(--text)",
                                    textDecoration: "none",
                                    fontSize: "0.9rem",
                                    fontWeight: 500,
                                    transition: "background 0.2s ease",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--border-color)")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                                Download Resume <Download size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prev / Next Navigation */}
            <div className="fade-up" style={{ marginTop: "6rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "2rem" }}>
                <button
                    onClick={() => navigateTo("/")}
                    style={{
                        display: "flex", alignItems: "center", gap: "0.75rem", background: "none", border: "none",
                        color: "var(--text-muted)", cursor: "pointer", fontSize: "1rem", fontWeight: 500,
                        transition: "color 0.2s ease", padding: 0,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                    <ArrowLeft size={18} /> Home
                </button>
                <button
                    onClick={() => navigateTo("/work")}
                    style={{
                        display: "flex", alignItems: "center", gap: "0.75rem", background: "none", border: "none",
                        color: "var(--text)", cursor: "pointer", fontSize: "1.2rem", fontWeight: 600,
                        transition: "opacity 0.2s ease", padding: 0,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                    Selected Works <ArrowRight size={20} />
                </button>
            </div>
        </motion.div>
    );
};

export default AboutPage;

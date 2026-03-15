import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projectsData } from "@/data/projects";
import { motion, useIsPresent } from "framer-motion";
import { eventBus } from "@/lib/eventBus";

const WorkPage = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    // QuickTo trackers for high-performance cursor following
    const xTo = useRef<gsap.QuickToFunc>();
    const yTo = useRef<gsap.QuickToFunc>();

    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const isPresent = useIsPresent();

    useEffect(() => {
        if (!isPresent) {
            eventBus.emit("PAGE_TRANSITION_OUT", { type: "fold" });
        } else {
            eventBus.emit("PAGE_TRANSITION_IN", { type: "fade" });
        }
    }, [isPresent]);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Intro animation for rows using fromTo for strict mode safety
        gsap.fromTo(".proj-row",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.3 // reduced delay so they appear sooner
            }
        );

        // Initialize quickTo for cursor
        if (cursorRef.current) {
            xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
            yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });
        }
    }, { scope: pageRef });

    const handleProjectClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault();

        // Hide floating card immediately
        if (cursorRef.current) {
            gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.2 });
        }

        // Animate out the rows and then navigate
        gsap.to(containerRef.current?.querySelectorAll(".proj-row") || [], {
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

    const containerRectRef = useRef<DOMRect | null>(null);

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (xTo.current && yTo.current) {
            if (!containerRectRef.current) containerRectRef.current = e.currentTarget.getBoundingClientRect();
            const rect = containerRectRef.current;
            xTo.current(e.clientX - rect.left + 24);
            yTo.current(e.clientY - rect.top - 70);
        }
    };

    const handleContainerMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        containerRectRef.current = e.currentTarget.getBoundingClientRect();
    };

    const handleContainerMouseLeave = () => {
        containerRectRef.current = null;
    };

    const handleMouseEnter = (idx: number) => {
        setHoveredProject(idx);
        gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" });
    };

    const handleMouseLeave = () => {
        gsap.to(cursorRef.current, { scale: 0.8, opacity: 0, duration: 0.2, ease: "power3.out" });
    };

    return (
        <motion.div
            ref={pageRef as any}
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
            <h1 className="sc-section-title">Selected Works</h1>

            {/* Thick top separator */}
            <div style={{ height: "2px", background: "var(--text)", marginBottom: 0 }} />

            <div ref={containerRef} style={{ position: "relative" }} onMouseMove={onMouseMove} onMouseEnter={handleContainerMouseEnter} onMouseLeave={handleContainerMouseLeave}>
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
                            padding: "1.75rem 0.25rem",
                            borderBottom: "1px solid var(--border-color)",
                            textDecoration: "none",
                            color: "var(--text)",
                            cursor: "pointer",
                            opacity: 0 // Set to 0 so HTML matches initial fromTo state, prevents FOUC
                        }}
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <div className="proj-dot" style={{
                                width: "5px", height: "1.8rem", borderRadius: "3px",
                                background: "var(--text)",
                                flexShrink: 0,
                            }} />
                            <span style={{
                                fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
                                fontWeight: 700,
                                letterSpacing: "-0.02em"
                            }}>
                                {p.title}
                            </span>
                        </div>
                        <span style={{
                            fontSize: "0.85rem",
                            color: "var(--text-muted)",
                        }}>
                            {p.category}
                        </span>
                    </a>
                ))}

                {/* GSAP optimized floating cursor card */}
                <div
                    ref={cursorRef}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "300px",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        backdropFilter: "blur(16px)",
                        borderRadius: "1rem",
                        overflow: "hidden",
                        pointerEvents: "none",
                        zIndex: 50,
                        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                        opacity: 0,
                        scale: 0.8,
                        transformOrigin: "center center"
                    }}
                >
                    {hoveredProject !== null && projectsData[hoveredProject] && (
                        <>
                            <img
                                src={projectsData[hoveredProject].image}
                                alt={projectsData[hoveredProject].title}
                                style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }}
                            />
                            <div style={{ padding: "1rem" }}>
                                <p style={{ fontSize: "0.9rem", color: "var(--text)", fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
                                    {projectsData[hoveredProject].description}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div style={{ marginTop: "3rem", textAlign: "center" }}>
                <a
                    href="https://github.com/nadhir24" target="_blank" rel="noopener noreferrer"
                    style={{
                        fontSize: "0.85rem", color: "var(--text-muted)",
                        padding: "0.6rem 1.5rem", borderRadius: "9999px",
                        border: "1px solid var(--border-color)", textDecoration: "none",
                        display: "inline-block", transition: "opacity 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                    View More on GitHub ↗
                </a>
            </div>

            {/* Next Page Navigation */}
            <div style={{ marginTop: "6rem", display: "flex", justifyContent: "flex-end", borderTop: "1px solid var(--border-color)", paddingTop: "2rem" }}>
                <Link
                    to="/experience"
                    style={{
                        display: "flex", alignItems: "center", gap: "1rem", color: "var(--text)", textDecoration: "none",
                        fontSize: "1.2rem", fontWeight: 600, transition: "opacity 0.2s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                    Next: Experience <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </Link>
            </div>
        </motion.div>
    );
};

export default WorkPage;

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageNavigate } from "@/hooks/usePageNavigate";
import { projectsData } from "@/data/projects";
import { motion, useIsPresent } from "framer-motion";
import { eventBus } from "@/lib/eventBus";

gsap.registerPlugin(ScrollTrigger);

const WorkPage = () => {
    const navigate = useNavigate();
    const pageRef = useRef<HTMLDivElement>(null);
    const navigateTo = usePageNavigate(pageRef);
    const cursorRef = useRef<HTMLDivElement>(null);

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
        if (!pageRef.current) return;

        // Stagger reveal for bento cards
        gsap.fromTo(".project-card",
            { y: 60, opacity: 0, scale: 0.96 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.1,
                duration: 0.9,
                ease: "power3.out",
                delay: 0.3,
            }
        );

        // Title animation
        gsap.fromTo(".sc-section-title",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
        );

        // Initialize quickTo for floating cursor card
        if (cursorRef.current) {
            xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
            yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });
        }
    }, { scope: pageRef });

    const handleProjectClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        if (cursorRef.current) {
            gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.2 });
        }
        gsap.to(pageRef.current?.querySelectorAll(".project-card") || [], {
            y: -20,
            opacity: 0,
            stagger: 0.04,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => navigate(`/work/${id}`),
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
                position: "relative",
                zIndex: 10,
                maxWidth: "72rem",
                margin: "0 auto",
                padding: "7rem 2rem 4rem",
            }}
        >
            <h1 className="sc-section-title" style={{ opacity: 0 }}>Selected Works</h1>

            <div
                style={{ position: "relative" }}
                onMouseMove={onMouseMove}
                onMouseEnter={handleContainerMouseEnter}
                onMouseLeave={handleContainerMouseLeave}
            >
                {/* Bento Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "1.5rem",
                    }}
                    className="work-bento-grid"
                >
                    {projectsData.map((p, i) => {
                        // First project spans full width for emphasis
                        const isFeature = i === 0;
                        return (
                            <a
                                key={p.id}
                                href={`/work/${p.id}`}
                                onClick={(e) => handleProjectClick(e, p.id)}
                                className="project-card"
                                style={{
                                    gridColumn: isFeature ? "1 / -1" : undefined,
                                    textDecoration: "none",
                                    color: "var(--text)",
                                    cursor: "pointer",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                    padding: "1rem",
                                    background: "var(--bg-card)",
                                    border: "1px solid var(--border-color)",
                                    borderRadius: "1.25rem",
                                    backdropFilter: "blur(14px)",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    opacity: 0, // GSAP fromTo will handle this
                                }}
                                onMouseEnter={(e) => {
                                    handleMouseEnter(i);
                                    e.currentTarget.style.transform = "translateY(-4px)";
                                    e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.1)";
                                }}
                                onMouseLeave={(e) => {
                                    handleMouseLeave();
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                <div
                                    style={{
                                        aspectRatio: isFeature ? "21 / 9" : "16 / 10",
                                        borderRadius: "0.75rem",
                                        overflow: "hidden",
                                        border: "1px solid var(--border-color)",
                                    }}
                                >
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        loading={i > 1 ? "lazy" : undefined}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block",
                                            transition: "transform 0.5s ease",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                    />
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "0 0.25rem" }}>
                                    <span style={{
                                        fontSize: isFeature ? "clamp(1.5rem, 3vw, 2.2rem)" : "clamp(1.1rem, 2vw, 1.5rem)",
                                        fontWeight: 700,
                                        fontFamily: "'Sora', system-ui, sans-serif",
                                        letterSpacing: "-0.02em",
                                    }}>
                                        {p.title}
                                    </span>
                                    <span style={{
                                        fontSize: "0.8rem",
                                        color: "var(--text-muted)",
                                        letterSpacing: "0.04em",
                                        textTransform: "uppercase",
                                        flexShrink: 0,
                                    }}>
                                        {p.category}
                                    </span>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* Floating cursor card (desktop only) */}
                <div
                    ref={cursorRef}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "280px",
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
                        transformOrigin: "center center",
                    }}
                >
                    {hoveredProject !== null && projectsData[hoveredProject] && (
                        <div style={{ padding: "1rem" }}>
                            <p style={{ fontSize: "0.85rem", color: "var(--text)", fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
                                {projectsData[hoveredProject].description}
                            </p>
                        </div>
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

            {/* Prev / Next Navigation */}
            <div style={{ marginTop: "6rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "2rem" }}>
                <button
                    onClick={() => navigateTo("/about")}
                    style={{
                        display: "flex", alignItems: "center", gap: "0.75rem", background: "none", border: "none",
                        color: "var(--text-muted)", cursor: "pointer", fontSize: "1rem", fontWeight: 500,
                        transition: "color 0.2s ease", padding: 0,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                    <ArrowLeft size={18} /> About
                </button>
                <button
                    onClick={() => navigateTo("/experience")}
                    style={{
                        display: "flex", alignItems: "center", gap: "0.75rem", background: "none", border: "none",
                        color: "var(--text)", cursor: "pointer", fontSize: "1.2rem", fontWeight: 600,
                        transition: "opacity 0.2s ease", padding: 0,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                    Experience <ArrowRight size={20} />
                </button>
            </div>
        </motion.div>
    );
};

export default WorkPage;

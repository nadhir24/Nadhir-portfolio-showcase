import { useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "@/data/projects";
import { motion, useIsPresent } from "framer-motion";
import { eventBus } from "@/lib/eventBus";

const ProjectDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const heroImgRef = useRef<HTMLImageElement>(null);
    const isPresent = useIsPresent();

    const currentIndex = projectsData.findIndex((p) => p.id === id);
    const project = projectsData[currentIndex];

    useGSAP(() => {
        if (!isPresent) {
            eventBus.emit("PAGE_TRANSITION_OUT", { type: "fold" });
        } else {
            eventBus.emit("PAGE_TRANSITION_IN", { type: "fade" });
        }
    }, [isPresent]);

    useGSAP(() => {
        if (!containerRef.current || !project) return;

        // Scroll to top on new project load
        window.scrollTo(0, 0);

        const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.5 }); // Delay for 3D intro

        tl.from(".proj-hero-wrapper", { y: 60, scale: 0.95, opacity: 0, duration: 1 })
            .from(".proj-title", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
            .from(".proj-line", { scaleX: 0, transformOrigin: "left", duration: 0.8, ease: "power2.inOut" }, "-=0.6")
            .from(".proj-meta-item", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.4");

        // Hero Image Parallax
        if (heroImgRef.current) {
            gsap.fromTo(heroImgRef.current,
                { y: "-15%" },
                {
                    scrollTrigger: {
                        trigger: ".proj-hero-wrapper",
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                    y: "15%",
                    ease: "none"
                }
            );
        }

        // Gallery Images Timeline Reveal
        const galleryImgs = gsap.utils.toArray(".gallery-img-wrapper") as HTMLElement[];
        if (galleryImgs.length > 0) {
            gsap.from(galleryImgs, {
                scrollTrigger: {
                    trigger: ".gallery-container",
                    start: "top 85%",
                },
                y: 50,
                scale: 0.95,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            });
        }
    }, { scope: containerRef, dependencies: [id, project] });

    if (!project) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1 style={{ color: "var(--text)" }}>Project not found</h1>
            </div>
        );
    }

    const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : projectsData[projectsData.length - 1];
    const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : projectsData[0];

    return (
        <motion.div
            ref={containerRef as any}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            style={{
                minHeight: "100vh",
                padding: "8rem 2rem 6rem",
                position: "relative",
                zIndex: 10,
                maxWidth: "80rem",
                margin: "0 auto",
            }}
        >
            {/* Floating Back Button */}
            <button
                onClick={() => navigate("/work")}
                className="back-btn"
                style={{
                    position: "fixed",
                    left: "2rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "50%",
                    background: "var(--text)",
                    color: "var(--bg)",
                    border: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    zIndex: 50,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
                aria-label="Back to projects"
            >
                <ArrowLeft size={24} strokeWidth={3} />
            </button>

            {/* Hero Image */}
            <div
                className="proj-hero-wrapper"
                style={{
                    width: "100%",
                    height: "60vh",
                    minHeight: "400px",
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                    marginBottom: "3rem",
                    border: "1px solid var(--border-color)",
                    position: "relative",
                }}
            >
                <img
                    ref={heroImgRef}
                    src={project.image}
                    alt={project.title}
                    style={{
                        width: "100%",
                        height: "130%", // Taller for parallax
                        objectFit: "cover",
                        display: "block",
                        position: "absolute",
                        top: 0, left: 0
                    }}
                />
            </div>

            {/* Title & Divider */}
            <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
                <h1
                    className="proj-title"
                    style={{
                        fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                        color: "var(--text)",
                        margin: "0 0 1rem 0",
                        lineHeight: 1.1,
                    }}
                >
                    {project.title}
                </h1>
                <div className="proj-line" style={{ height: "1px", background: "var(--border-color)", width: "100%", marginBottom: "3rem" }} />

                {/* Content Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr",
                        gap: "4rem",
                        alignItems: "start",
                    }}
                >
                    {/* Metadata (Left) */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <div className="proj-meta-item" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <span style={{
                                background: "var(--text)", color: "var(--bg)", padding: "0.25rem 1rem",
                                borderRadius: "9999px", fontSize: "0.85rem", fontWeight: 600
                            }}>Date</span>
                            <span style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{project.date}</span>
                        </div>
                        <div className="proj-meta-item" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <span style={{
                                background: "var(--text)", color: "var(--bg)", padding: "0.25rem 1rem",
                                borderRadius: "9999px", fontSize: "0.85rem", fontWeight: 600
                            }}>Roles</span>
                            <span style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{project.role}</span>
                        </div>
                        {project.url && (
                            <div className="proj-meta-item" style={{ marginTop: "1rem" }}>
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="sc-link"
                                    style={{ fontSize: "0.95rem", fontWeight: 500, borderBottom: "1px solid var(--text)" }}
                                >
                                    Live Link ↗
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Description (Right) */}
                    <div className="proj-meta-item">
                        <p style={{ fontSize: "1.2rem", lineHeight: 1.8, color: "var(--text-muted)", margin: 0 }}>
                            {project.fullDescription}
                        </p>
                    </div>
                </div>
            </div>

            {/* Project Gallery - Content Images */}
            {project.contentImages && project.contentImages.length > 0 && (
                <div className="gallery-container" style={{
                    marginTop: "6rem",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "2rem",
                    maxWidth: "80rem",
                    margin: "6rem auto 0"
                }}>
                    {project.contentImages.map((img, idx) => (
                        <div
                            key={idx}
                            className="gallery-img-wrapper"
                            style={{
                                borderRadius: "1.25rem",
                                overflow: "hidden",
                                border: "1px solid var(--border-color)",
                                background: "var(--bg-card)",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.04)"
                            }}
                        >
                            <img
                                src={img}
                                alt={`${project.title} content ${idx + 1}`}
                                style={{ width: "100%", height: "auto", display: "block" }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Next/Prev Navigation Footer */}
            <div className="proj-meta-item" style={{ marginTop: "8rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "3rem" }}>
                <Link
                    to={`/work/${prevProject.id}`}
                    style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                    <ArrowLeft size={20} />
                    <span style={{ fontSize: "1.2rem", fontWeight: 600 }}>{prevProject.title}</span>
                </Link>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    More Projects
                </div>
                <Link
                    to={`/work/${nextProject.id}`}
                    style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                    <span style={{ fontSize: "1.2rem", fontWeight: 600 }}>{nextProject.title}</span>
                    <ArrowRight size={20} />
                </Link>
            </div>
        </motion.div>
    );
};

export default ProjectDetailPage;

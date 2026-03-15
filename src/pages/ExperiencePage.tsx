import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useIsPresent } from "framer-motion";
import { eventBus } from "@/lib/eventBus";

const items = [
    {
        institution: "Universitas Gunadarma",
        role: "Bachelor's degree, Information System",
        period: "Sep 2018 – Dec 2022",
        note: "Actively learned coding, developed various projects, and explored computers.",
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

const ExperiencePage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
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

        // Title animation
        gsap.from(".sc-section-title", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.5
        });

        // Experience items ScrollTrigger
        const eduItems = gsap.utils.toArray(".edu-item") as HTMLElement[];
        eduItems.forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: i * 0.15 // Add stagger equivalent delay relative to scroll
            });
        });
    }, { scope: containerRef });

    return (
        <motion.div
            ref={containerRef as any}
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
            <h1 className="sc-section-title">Experience</h1>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {items.map((item, i) => (
                    <div key={i} className="edu-item sc-card" style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                        <item.Icon size={26} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "0.2rem" }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.4rem" }}>
                                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text)", margin: 0 }}>{item.institution}</h3>
                                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontFamily: "monospace" }}>{item.period}</span>
                            </div>
                            <p style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--text)", marginBottom: "0.4rem" }}>{item.role}</p>
                            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--text-muted)" }}>{item.note}</p>
                            {item.credential && (
                                <p style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem", opacity: 0.6 }}>
                                    {item.credential}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Next Page Navigation */}
            <div style={{ marginTop: "6rem", display: "flex", justifyContent: "flex-end", borderTop: "1px solid var(--border-color)", paddingTop: "2rem" }}>
                <Link
                    to="/certifications"
                    className="sc-link"
                    style={{
                        display: "flex", alignItems: "center", gap: "1rem", color: "var(--text)", textDecoration: "none",
                        fontSize: "1.2rem", fontWeight: 600, transition: "opacity 0.2s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                    Next: Certifications <ArrowRight size={20} />
                </Link>
            </div>
        </motion.div>
    );
};

export default ExperiencePage;

import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, ExternalLink, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useIsPresent } from "framer-motion";
import { eventBus } from "@/lib/eventBus";

const certs = [
    { title: "Fullstack Node.js Program", issuer: "Code X Academy", date: "May 2023", url: "https://drive.google.com/file/d/1TmxXEG6Yr4FAvSqxAh5maA3CmOMj5Jj9/view" },
    { title: "Belajar Dasar-Dasar DevOps", issuer: "Dicoding Indonesia", date: "Nov 2022", url: "https://www.dicoding.com/certificates/0LZ0GGQ63X65" },
    { title: "Belajar Dasar Pemrograman JavaScript", issuer: "Dicoding Indonesia", date: "Oct 2022", url: "https://www.dicoding.com/certificates/JLX1L3JYJX72" },
    { title: "Kursus HTML & CSS", issuer: "Progate", date: "Oct 2022", url: "https://progate.com/course_certificate/e4cdc974rk3myb" },
    { title: "Kursus Javascript", issuer: "Progate", date: "Oct 2022", url: "https://progate.com/course_certificate/c86122berjzrgc" },
    { title: "Competence Certificate", issuer: "BNSP", date: "Sep 2022", url: "https://drive.google.com/file/d/1hYaPIRcLjxr4dnQg17KeVvUtc_ZcFurw/view" },
];

const CertificationsPage = () => {
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

        gsap.from(".sc-section-title", {
            y: 30, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.5
        });

        const rows = gsap.utils.toArray(".cert-row") as HTMLElement[];
        if (rows.length > 0) {
            gsap.from(rows, {
                scrollTrigger: {
                    trigger: ".cert-container",
                    start: "top 85%",
                },
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out"
            });
        }
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
            <h1 className="sc-section-title">Certifications</h1>

            {/* Thick separator */}
            <div style={{ height: "2px", background: "var(--text)", marginBottom: 0 }} />

            <div className="cert-container" style={{ display: "flex", flexDirection: "column" }}>
                {certs.map((c, i) => (
                    <a
                        key={i}
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-row"
                        style={{
                            padding: "1.5rem 0.5rem",
                            borderBottom: "1px solid var(--border-color)",
                            textDecoration: "none",
                            color: "var(--text)",
                            display: "grid",
                            gridTemplateColumns: "1fr auto",
                            gap: "1rem",
                            alignItems: "center",
                            transition: "background 0.2s ease, padding-left 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--bg-card)";
                            e.currentTarget.style.paddingLeft = "1.5rem";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.paddingLeft = "0.5rem";
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <Award size={20} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                            <span style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 600 }}>
                                {c.title}
                            </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", textAlign: "right" }}>
                            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{c.issuer}</span>
                            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "monospace", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                {c.date} <ExternalLink size={14} style={{ opacity: 0.5 }} />
                            </span>
                        </div>
                    </a>
                ))}
            </div>

            {/* Next Page Navigation */}
            <div style={{ marginTop: "6rem", display: "flex", justifyContent: "flex-end", borderTop: "1px solid var(--border-color)", paddingTop: "2rem" }}>
                <Link
                    to="/contact"
                    className="sc-link"
                    style={{
                        display: "flex", alignItems: "center", gap: "1rem", color: "var(--text)", textDecoration: "none",
                        fontSize: "1.2rem", fontWeight: 600, transition: "opacity 0.2s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                    Next: Contact <ArrowRight size={20} />
                </Link>
            </div>
        </motion.div>
    );
};

export default CertificationsPage;

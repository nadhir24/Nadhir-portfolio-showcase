import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, useIsPresent } from "framer-motion";
import { eventBus } from "@/lib/eventBus";

const HomePage = () => {
    const containerRef = useRef<HTMLElement>(null);
    const isPresent = useIsPresent();

    // Magnetic link references
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        if (!isPresent) {
            eventBus.emit("PAGE_TRANSITION_OUT", { type: "fold" });
        } else {
            eventBus.emit("PAGE_TRANSITION_IN", { type: "fade" });
        }
    }, [isPresent]);

    useGSAP(() => {
        // Hero Text Advanced Reveal
        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 });

        tl.fromTo(".hero-text-line",
            { yPercent: 120, rotationX: -90, opacity: 0 },
            {
                yPercent: 0,
                rotationX: 0,
                transformOrigin: "bottom center -50",
                opacity: 1,
                stagger: 0.15,
                duration: 1.5,
            }
        )
            .fromTo(".hero-links a",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 0.7,
                    stagger: 0.1,
                    duration: 1,
                }, "-=1")
            .fromTo(".marquee-wrapper",
                { y: 20, opacity: 0 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                }, "-=0.8");

        // Continuous Marquee Animation
        gsap.to(".marquee-inner", {
            xPercent: -50,
            ease: "none",
            duration: 20,
            repeat: -1,
        });

        // Magnetic Links Effect - simplified to avoid forced reflow
        linksRef.current.forEach((link) => {
            if (!link) return;

            const txt = link.querySelector(".link-text") as HTMLElement;
            let cachedX = 0, cachedY = 0;

            link.addEventListener("mouseenter", () => {
                gsap.to(txt, { scale: 1.1, duration: 0.3, ease: "power2.out" });
            });

            link.addEventListener("mousemove", (e) => {
                // Use relative mouse position instead of DOM measurements
                const bounds = link.getBoundingClientRect();
                cachedX = (e.clientX - bounds.left - bounds.width / 2) * 0.1;
                cachedY = (e.clientY - bounds.top - bounds.height / 2) * 0.1;
                gsap.to(txt, { x: cachedX, y: cachedY, duration: 0.3, ease: "power2.out" });
            });

            link.addEventListener("mouseleave", () => {
                gsap.to(txt, { x: 0, y: 0, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            });
        });

        return () => {
            gsap.killTweensOf(".marquee-inner");
            linksRef.current.forEach(link => {
                const clones = link?.querySelectorAll(".link-text");
                if (clones) gsap.killTweensOf(clones);
            });
        };
    }, { scope: containerRef });

    return (
        <motion.section
            ref={containerRef as any}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            style={{
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                zIndex: 10,
                padding: "0 1.5rem",
                perspective: "1000px" // Enable 3D transforms for child elements
            }}
        >
            {/* Giant name with clipped reveal */}
            <div className="hero-name">
                <h1
                    style={{
                        fontSize: "clamp(3rem, 13vw, 11rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.05em",
                        lineHeight: 0.85,
                        color: "var(--text)",
                        textTransform: "uppercase",
                        margin: 0,
                    }}
                >
                    <div style={{ overflow: "hidden", paddingBottom: "2px" }}>
                        <div className="hero-text-line" style={{ willChange: "transform, opacity", opacity: 0 }}>Nadhir</div>
                    </div>
                    <div style={{ overflow: "hidden", paddingBottom: "2px" }}>
                        <div className="hero-text-line" style={{ willChange: "transform, opacity", opacity: 0 }}>Ghassan</div>
                    </div>
                </h1>
            </div>

            {/* CTA links */}
            <div className="hero-links" style={{ display: "flex", gap: "3.5rem", marginTop: "3rem" }}>
                {[
                    { label: "see my work", href: "/work" },
                    { label: "get in touch", href: "/contact" },
                ].map(({ label, href }, index) => (
                    <a
                        key={label}
                        href={href}
                        ref={(el) => (linksRef.current[index] = el)}
                        style={{
                            display: "inline-block",
                            background: "none",
                            border: "none",
                            fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
                            fontWeight: 400,
                            color: "var(--text)",
                            cursor: "pointer",
                            padding: "1rem", // Add padding to make hovering area larger for magnet
                            margin: "-1rem",
                            textDecoration: "none",
                            opacity: 0, // fromTo will bring it up to 0.7
                        }}
                        onMouseEnter={(e) => gsap.to(e.currentTarget, { opacity: 1, duration: 0.25 })}
                        onMouseLeave={(e) => gsap.to(e.currentTarget, { opacity: 0.7, duration: 0.25 })}
                    >
                        <span className="link-text" style={{ display: "inline-block" }}>
                            {label}
                        </span>
                    </a>
                ))}
            </div>

            {/* Marquee at very bottom */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
                <div className="marquee-wrapper" style={{ overflow: "hidden", whiteSpace: "nowrap", width: "100%", opacity: 0 }}>
                    <div className="marquee-inner" style={{ display: "inline-block", padding: "1rem 0" }}>
                        {[...Array(4)].map((_, dupIndex) => (
                            <span key={dupIndex} style={{ display: "inline-flex", alignItems: "center" }}>
                                {["Frontend Development", "Web Design", "UX Design", "Full-Stack", "React", "TypeScript"].map((item, i) => (
                                    <span key={i} style={{
                                        marginRight: "2rem",
                                        fontSize: "0.85rem",
                                        fontWeight: 500,
                                        letterSpacing: "0.05em",
                                        textTransform: "uppercase",
                                        color: "var(--text-muted)"
                                    }}>
                                        • {item}
                                    </span>
                                ))}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default HomePage;

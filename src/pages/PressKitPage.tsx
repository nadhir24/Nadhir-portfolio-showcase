import { useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, Music2, Download, Disc3, Mail, Instagram, Phone, Headphones, MapPin, Clock, Users } from "lucide-react";
import { usePageNavigate } from "@/hooks/usePageNavigate";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useIsPresent } from "framer-motion";
import { eventBus } from "@/lib/eventBus";

gsap.registerPlugin(ScrollTrigger);

const genres = ["RnB", "Amapiano", "House", "Baile Funk", "IndoBounce", "Dutch", "Big Room"];

const venues = [
    "Amora Blok M",
    "Anak Kemang JKT",
    "B.O.F JKT",
    "Bablas JKT",
    "BBK JKT",
    "Bengkel Space SCBD",
    "Black Angel JKT",
    "Blaze SCBD",
    "Booze Bar JKT",
    "Cleon JKT",
    "Delulu",
    "Double Spoon JKT",
    "Extrajoss Booth",
    "Fat Tiger NYE Countdown 2026",
    "Fyne",
    "Grind Boys Private Party Service",
    "Halfway JKT",
    "Helens Gunawarman",
    "JakCoffee Tea JKT",
    "Kismet JKT",
    "Pabbo JKT",
    "PATS X JKT",
    "Pier No.12 PIK",
    "Posto Dormire JKT",
    "Sinopsis Cafe Koja",
    "Stalk SCBD",
    "Stories SCBD",
    "Wedding Service",
    "XXX by Leon SCBD",
    "ZUI JKT",
];

const rateRows = [
    { label: "Fee Range", icon: Music2 },
    { label: "Playtime", icon: Clock },
    { label: "Extra Time", icon: Clock },
    { label: "Crew Support", icon: Users },
];

const PressKitPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigateTo = usePageNavigate(containerRef);
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

        gsap.from(".pk-title", {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.3,
        });

        gsap.utils.toArray<HTMLElement>(".pk-reveal").forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                    toggleActions: "play none none reverse",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: i * 0.08,
            });
        });
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
                position: "relative",
                zIndex: 10,
                maxWidth: "72rem",
                margin: "0 auto",
                padding: "7rem 2rem 4rem",
            }}
        >
            {/* ── Hero ── */}
            <div className="pk-title" style={{ marginBottom: "4rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                    <Disc3 size={22} style={{ color: "var(--text-muted)" }} />
                    <span style={{ fontFamily: "monospace", fontSize: "0.8rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--text-muted)" }}>Press Kit</span>
                </div>
                <h1 className="sc-section-title" style={{ marginBottom: "1rem" }}>NRG</h1>
                <p style={{ fontSize: "1.1rem", fontWeight: 500, color: "var(--text-muted)", maxWidth: "34rem", lineHeight: 1.6, margin: 0 }}>
                    DJ — Jakarta, Indonesia. Electronic music since 2012, still sharpening the craft today.
                </p>
            </div>

            {/* ── About ── */}
            <section className="pk-reveal sc-card" style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", margin: "0 0 1rem" }}>About</h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-muted)", margin: 0 }}>
                    NRG (Nadhir) is a DJ from Jakarta, Indonesia, who has been passionate about music since an early age.
                    His interest in electronic music began in 2012, during the rise of shuffle dance among students.
                    Since then, NRG has been diving deep into DJing, learning the art of mixing, and continuously
                    sharpening his skills to this day.
                </p>
            </section>

            {/* ── Sound ── */}
            <section className="pk-reveal sc-card" style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", margin: "0 0 1rem" }}>Sound</h2>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)", margin: "0 0 0.75rem" }}>Wide Spectrum</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                    {genres.map((g) => (
                        <span key={g} className="skill-chip">{g}</span>
                    ))}
                </div>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <Headphones size={18} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "0.25rem" }} />
                    <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--text-muted)", margin: 0 }}>
                        To support his sets, NRG regularly creates edits and mashups, available on SoundCloud and YouTube.
                        These works reflect his approach to crowd reading, transitions, and maintaining energy throughout a set.
                    </p>
                </div>
            </section>

            {/* ── Experiences ── */}
            <section className="pk-reveal sc-card" style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", margin: "0 0 0.25rem" }}>Experiences</h2>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--text-muted)", margin: "0 0 1.5rem" }}>
                    NRG has played in several clubs &amp; cafes across Jakarta.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {venues.map((v) => (
                        <span
                            key={v}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                fontSize: "0.85rem",
                                fontWeight: 500,
                                color: "var(--text)",
                                background: "var(--bg-card)",
                                border: "1px solid var(--border-color)",
                                borderRadius: "999px",
                                padding: "0.45rem 0.9rem",
                                transition: "transform 0.2s ease, border-color 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.borderColor = "var(--text-muted)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.borderColor = "var(--border-color)";
                            }}
                        >
                            <MapPin size={12} style={{ color: "var(--text-muted)" }} />
                            {v}
                        </span>
                    ))}
                </div>
            </section>

            {/* ── Rate Card ── */}
            <section className="pk-reveal sc-card" style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", margin: "0 0 0.25rem" }}>Rate Card</h2>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--text-muted)", margin: "0 0 1.5rem" }}>
                    DJ Performance Fee — negotiable depending on event concept, duration, and location.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
                    {[
                        {
                            title: "Jabodetabek",
                            rows: [
                                { label: "Fee Range", value: "Rp 1.000.000 – Rp 1.500.000", sub: "Negotiable" },
                                { label: "Playtime", value: "60 – 90 Minutes" },
                                { label: "Extra Time", value: "Rp 750.000 / 45 Minutes" },
                                { label: "Crew Support", value: "3 Pax — DJ / Technical Support / Coordinator" },
                            ],
                        },
                        {
                            title: "Outside Jabodetabek",
                            rows: [
                                { label: "Fee Range", value: "Rp 1.500.000 – Rp 2.000.000", sub: "Negotiable" },
                                { label: "Playtime", value: "60 – 90 Minutes" },
                                { label: "Extra Time", value: "Rp 1.250.000 / 45 Minutes" },
                                { label: "Crew Support", value: "3 Pax — DJ / Technical Support / Coordinator" },
                            ],
                        },
                    ].map((card) => (
                        <div
                            key={card.title}
                            style={{
                                background: "var(--bg-card)",
                                border: "1px solid var(--border-color)",
                                borderRadius: "1rem",
                                padding: "1.5rem",
                            }}
                        >
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", margin: "0 0 1rem" }}>{card.title}</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                                {card.rows.map((row) => {
                                    const Icon = rateRows.find((r) => r.label === row.label)?.icon ?? Music2;
                                    return (
                                        <div key={row.label} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                                            <Icon size={16} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "0.2rem" }} />
                                            <div style={{ minWidth: 0 }}>
                                                <div style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.15rem" }}>{row.label}</div>
                                                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>{row.value}</div>
                                                {row.sub && <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{row.sub}</div>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: "1.25rem", fontSize: "0.85rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
                    <p style={{ margin: "0 0 0.25rem" }}>— Rates are negotiable depending on event concept, duration, and location.</p>
                    <p style={{ margin: "0 0 0.25rem" }}>— Technical requirements outside standard setup may affect the final fee.</p>
                    <p style={{ margin: 0 }}>— Transport &amp; accommodation adjusted to venue location.</p>
                </div>
            </section>

            {/* ── Hospitality ── */}
            <section className="pk-reveal sc-card" style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", margin: "0 0 1.5rem" }}>Hospitality</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
                    {[
                        {
                            title: "Inside Jakarta",
                            items: [
                                "Mineral water (minimum 3 bottles)",
                                "Soft drinks / isotonic drinks",
                                "Light snacks",
                                "1 meal for talent",
                                "Sampoerna mild 1 pack",
                                "Smoking area access (if available)",
                                "Secure and comfortable DJ booth / backstage area",
                            ],
                        },
                        {
                            title: "Outside Jakarta",
                            items: [
                                "All of the above",
                                "Ground transportation (airport / station — hotel — venue)",
                                "Accommodation (1 room for talent, minimum 1 night)",
                            ],
                        },
                    ].map((card) => (
                        <div
                            key={card.title}
                            style={{
                                background: "var(--bg-card)",
                                border: "1px solid var(--border-color)",
                                borderRadius: "1rem",
                                padding: "1.5rem",
                            }}
                        >
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", margin: "0 0 0.9rem" }}>{card.title}</h3>
                            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                                {card.items.map((item) => (
                                    <li key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", fontSize: "0.92rem", lineHeight: 1.55, color: "var(--text-muted)" }}>
                                        <span style={{ color: "var(--text)", marginTop: "0.1rem" }}>—</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <p style={{ marginTop: "1.25rem", fontSize: "0.85rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
                    Hospitality requirements may be adjusted based on event duration, travel distance, and venue conditions.
                </p>
            </section>

            {/* ── Contact ── */}
            <section className="pk-reveal sc-card" style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)", margin: "0 0 1.5rem" }}>Contact</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
                    {[
                        { Icon: Mail, label: "Email", value: "nadhirghassanwork@gmail.com", href: "mailto:nadhirghassanwork@gmail.com" },
                        { Icon: Instagram, label: "Instagram", value: "@nadhir_24", href: "https://instagram.com/nadhir_24" },
                        { Icon: Phone, label: "Phone", value: "0822 4637 8028", href: "tel:+6282246378028" },
                        { Icon: Headphones, label: "SoundCloud", value: "nadhirghassan24 / tracks", href: "https://soundcloud.com/nadhirghassan24/tracks" },
                    ].map((c) => (
                        <a
                            key={c.label}
                            href={c.href}
                            target={c.href.startsWith("http") ? "_blank" : undefined}
                            rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="sc-link"
                            style={{
                                display: "flex",
                                gap: "0.85rem",
                                alignItems: "center",
                                background: "var(--bg-card)",
                                border: "1px solid var(--border-color)",
                                borderRadius: "1rem",
                                padding: "1.1rem 1.25rem",
                                minWidth: 0,
                            }}
                        >
                            <c.Icon size={20} style={{ color: "var(--text)", flexShrink: 0 }} />
                            <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.15rem" }}>{c.label}</div>
                                <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.value}</div>
                            </div>
                        </a>
                    ))}
                </div>
                <div style={{ marginTop: "1.5rem" }}>
                    <a
                        href="/NRG PRESSKIT.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sc-link"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: "var(--text)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "999px",
                            padding: "0.7rem 1.4rem",
                            background: "var(--bg-card)",
                        }}
                    >
                        <Download size={16} /> Download Press Kit PDF
                    </a>
                </div>
            </section>

            {/* Prev / Next Navigation */}
            <div style={{ marginTop: "6rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "2rem" }}>
                <button
                    onClick={() => navigateTo("/experience")}
                    style={{
                        display: "flex", alignItems: "center", gap: "0.75rem", background: "none", border: "none",
                        color: "var(--text-muted)", cursor: "pointer", fontSize: "1rem", fontWeight: 500,
                        transition: "color 0.2s ease", padding: 0,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                    <ArrowLeft size={18} /> Experience
                </button>
                <button
                    onClick={() => navigateTo("/contact")}
                    style={{
                        display: "flex", alignItems: "center", gap: "0.75rem", background: "none", border: "none",
                        color: "var(--text)", cursor: "pointer", fontSize: "1.2rem", fontWeight: 600,
                        transition: "opacity 0.2s ease", padding: 0,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                    Contact <ArrowRight size={20} />
                </button>
            </div>
        </motion.div>
    );
};

export default PressKitPage;

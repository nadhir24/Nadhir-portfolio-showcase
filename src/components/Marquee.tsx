const ITEMS = [
    "Frontend Development",
    "Web Design",
    "UX Design",
    "React",
    "TypeScript",
    "Full-Stack Development",
];

const MarqueeText = () => (
    <>
        {ITEMS.map((item, i) => (
            <span key={i}>• {item} &nbsp;</span>
        ))}
    </>
);

const Marquee = () => (
    <footer className="relative z-10 py-2" aria-label="Scrolling skills marquee">
        <div className="marquee-wrapper">
            <div className="marquee-inner">
                {/* Duplicate for seamless loop */}
                <MarqueeText />
                <MarqueeText />
            </div>
        </div>
        <p className="text-center text-xs py-3" style={{ color: "var(--text-muted)" }}>
            Designed &amp; Built by Nadhir Ghassan © {new Date().getFullYear()}
        </p>
    </footer>
);

export default Marquee;

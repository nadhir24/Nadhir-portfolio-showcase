const socialLinks = [
    {
        label: "GitHub",
        href: "https://github.com/nadhir24",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 20, height: 20, fill: "currentColor" }}>
                <path d="M12 1.5C6.2 1.5 1.5 6.3 1.5 12.2c0 4.7 3 8.7 7.1 10.1.5.1.7-.2.7-.5v-2c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.5 1.1 3.1.8.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.2-4.7-5.2 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 .9a10.5 10.5 0 0 1 5.5 0c2.1-1.2 3-.9 3-.9.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.1-2.4 4.9-4.8 5.2.4.3.7 1 .7 2v3c0 .3.2.6.7.5a10.7 10.7 0 0 0 7.1-10.1C22.5 6.3 17.8 1.5 12 1.5Z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/nadhir-ghassan24",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 20, height: 20, fill: "currentColor" }}>
                <path d="M4.98 3.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM3.5 8.5h3v12h-3v-12Zm5.5 0h2.87v1.64h.04c.4-.76 1.38-1.94 3.34-1.94 3.57 0 4.23 2.35 4.23 5.4v6.9h-3v-6.12c0-1.46-.03-3.34-2.04-3.34-2.04 0-2.35 1.6-2.35 3.24v6.22h-3v-12Z" />
            </svg>
        ),
    },
    {
        label: "Email",
        href: "mailto:nadhirghassanwork@gmail.com",
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 20, height: 20, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" }}>
                <path d="M3 6.75h18v10.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.25V6.75Z" />
                <path d="m3.75 7.5 8.25 6 8.25-6" />
            </svg>
        ),
    },
];

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer
            style={{
                position: "relative",
                zIndex: 10,
                borderTop: "1px solid var(--border-color)",
                padding: "3rem 2rem",
                textAlign: "center",
            }}
        >
            <div
                style={{
                    maxWidth: "72rem",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1.5rem",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center" }}>
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                            aria-label={link.label}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "2.75rem",
                                height: "2.75rem",
                                borderRadius: "9999px",
                                color: "var(--text-muted)",
                                textDecoration: "none",
                                transition: "color 0.2s ease, transform 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = "var(--text)";
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = "var(--text-muted)";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: 0 }}>
                    © {year} Nadhir Ghassan
                </p>

                <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    style={{
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-card)",
                        color: "var(--text)",
                        borderRadius: "9999px",
                        padding: "0.8rem 1.4rem",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        transition: "transform 0.2s ease, opacity 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.opacity = "0.8";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.opacity = "1";
                    }}
                >
                    Back to top
                </button>
            </div>
        </footer>
    );
};

export default Footer;

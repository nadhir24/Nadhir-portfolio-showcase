import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, X } from "lucide-react";

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Experience", href: "/experience" },
  { name: "Certifications", href: "/certifications" },
  { name: "Contact", href: "/contact" },
];

const Navbar = ({ isDark, onToggleTheme }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    // Reset scroll state on navigation
    setIsScrolled(window.scrollY > 40);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "1.25rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "background 0.3s ease, backdrop-filter 0.3s ease",
          background: isScrolled
            ? isDark
              ? "rgba(12,12,12,0.85)"
              : "rgba(245,245,240,0.85)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(16px)" : "none",
          borderBottom: isScrolled ? `1px solid var(--border-color)` : "none",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          style={{
            fontWeight: 800,
            fontSize: "1.3rem",
            letterSpacing: "-0.02em",
            color: "var(--text)",
            textDecoration: "none",
          }}
        >
          NG
        </Link>

        {/* Right Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "50%",
              border: `1px solid var(--border-color)`,
              background: "var(--bg-card)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(20deg) scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(0deg) scale(1)")}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Hamburger / Close */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "50%",
              border: `1px solid var(--border-color)`,
              background: "var(--bg-card)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {isMenuOpen ? (
              <X size={16} />
            ) : (
              /* Grid icon (4 dots) */
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <circle cx="4" cy="4" r="1.5" fill="currentColor" />
                <circle cx="12" cy="4" r="1.5" fill="currentColor" />
                <circle cx="4" cy="12" r="1.5" fill="currentColor" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Full-Screen Overlay Menu */}
      <div
        aria-hidden={!isMenuOpen}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: isDark ? "rgba(12,12,12,0.95)" : "rgba(245,245,240,0.95)",
          backdropFilter: "blur(24px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: "4rem 8vw 4rem", // Increased top padding to avoid header clash
          overflowY: "auto",
          transition: "opacity 0.4s ease, transform 0.4s ease, visibility 0.4s",
          opacity: isMenuOpen ? 1 : 0,
          visibility: isMenuOpen ? "visible" : "hidden",
          transform: isMenuOpen ? "translateY(0)" : "translateY(-12px)",
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                onClick={handleNavClick}
                style={{
                  display: "inline-block",
                  fontSize: "clamp(2rem, 8vw, 5rem)", // Reduced minimum size from 3rem to 2rem
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "var(--text)",
                  textDecoration: "none",
                  transition: "opacity 0.3s ease, transform 0.3s ease, padding-left 0.3s ease",
                  opacity: isActive ? 1 : 0.4,
                  paddingLeft: isActive ? "15px" : "0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.paddingLeft = "20px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = isActive ? "1" : "0.4";
                  e.currentTarget.style.paddingLeft = isActive ? "20px" : "0";
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer links in menu */}
        <div style={{ marginTop: "4rem", display: "flex", gap: "2rem" }}>
          {[
            { label: "GitHub ↗", href: "https://github.com/nadhir24" },
            { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/nadhir-ghassan24" },
            { label: "Resume ↗", href: "/Nadhir Ghassan-resume.pdf" }
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "color 0.2s ease"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;

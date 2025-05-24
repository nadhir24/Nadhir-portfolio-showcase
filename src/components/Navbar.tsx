import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#education" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 px-5 md:px-10 transition-all duration-300 ${
        isScrolled
          ? "bg-portfolio-navy/90 backdrop-blur shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="text-portfolio-teal font-bold text-2xl">
          NG
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-portfolio-lightest-slate"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <ol className="flex">
            {navLinks.map((link, i) => (
              <li key={i}>
                <a href={link.href} className="nav-link">
                  <span className="text-portfolio-teal font-mono mr-1">
                    0{i + 1}.
                  </span>
                  {link.name}
                </a>
              </li>
            ))}
          </ol>
          <a
            href="public\Nadhir Ghassan-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4"
          >
            <Button className="bg-transparent border border-portfolio-teal text-portfolio-teal hover:bg-portfolio-teal/10">
              Resume
            </Button>
          </a>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-portfolio-light-navy/95 flex flex-col items-center justify-center z-40">
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="text-portfolio-lightest-slate hover:text-portfolio-teal text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-portfolio-teal font-mono block text-center mb-1">
                    0{i + 1}.
                  </span>
                  {link.name}
                </a>
              ))}
              <a
                href="/Nadhir_Ghassan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4"
              >
                <Button className="bg-transparent border border-portfolio-teal text-portfolio-teal hover:bg-portfolio-teal/10">
                  Resume
                </Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

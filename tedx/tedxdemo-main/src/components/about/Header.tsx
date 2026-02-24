import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Speakers", href: "#speakers" },
    { name: "Events", href: "/events" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/95 backdrop-blur-sm border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - No animations */}
          <a href="https://www.ted.com/tedx" target="_blank" rel="noopener noreferrer" className="flex flex-col">
            <div className="text-2xl font-black tracking-tight">
              <span className="tedx-gradient-text">TEDx</span>
              <span className="text-foreground">DJSCE</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              <span className="tedx-gradient-text font-semibold">x</span> = independently organized TED event
            </p>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.name === "Events" ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 wavy-underline"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 wavy-underline"
                >
                  {link.name}
                </a>
              )
            ))}

            {/* Register Now Button - Glassmorphism */}
            <button className="group relative px-6 py-2.5 bg-primary/80 backdrop-blur-md text-primary-foreground font-semibold text-sm rounded-lg transition-all duration-300 hover:bg-primary/70 hover:shadow-[0_8px_32px_rgba(255,0,0,0.3)] overflow-hidden border border-white/20 hover:border-white/40">
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

              {/* Glass effect from top-left corner */}
              <div className="absolute top-0 left-0 w-0 h-0 bg-gradient-to-br from-white/40 to-transparent group-hover:w-full group-hover:h-full transition-all duration-500 ease-out backdrop-blur-sm" />

              {/* Glass effect from bottom-right corner */}
              <div className="absolute bottom-0 right-0 w-0 h-0 bg-gradient-to-tl from-white/30 to-transparent group-hover:w-full group-hover:h-full transition-all duration-500 ease-out delay-100 backdrop-blur-sm" />

              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />

              <span className="relative flex items-center gap-2 z-10">
                Register Now
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in-up">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                link.name === "Events" ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 px-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 px-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
              <button className="group relative mt-2 w-full px-6 py-2.5 bg-primary/80 backdrop-blur-md text-primary-foreground font-semibold rounded-lg hover:bg-primary/70 transition-all duration-300 overflow-hidden border border-white/20 hover:border-white/40 hover:shadow-[0_8px_32px_rgba(255,0,0,0.3)]">
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

                {/* Glass effect from top-left corner */}
                <div className="absolute top-0 left-0 w-0 h-0 bg-gradient-to-br from-white/40 to-transparent group-hover:w-full group-hover:h-full transition-all duration-500 ease-out backdrop-blur-sm" />

                {/* Glass effect from bottom-right corner */}
                <div className="absolute bottom-0 right-0 w-0 h-0 bg-gradient-to-tl from-white/30 to-transparent group-hover:w-full group-hover:h-full transition-all duration-500 ease-out delay-100 backdrop-blur-sm" />

                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />

                <span className="relative z-10">Register Now</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

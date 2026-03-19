"use client";

const navLinks = ["about", "projects", "contact"] as const;

interface NavProps {
  activeSection: string;
  isScrolled: boolean;
  scrollTo: (id: string) => void;
}

export default function Nav({ activeSection, isScrolled, scrollTo }: NavProps) {
  return (
    <nav className={`nav ${isScrolled ? "scrolled" : ""}`}>
      {/* Logo */}
      <button className="nav-logo" onClick={() => scrollTo("hero")}>
        <span style={{ color: "var(--accent)" }}>&lt;</span>
        rohan.dev
        <span style={{ color: "var(--accent)" }}>/&gt;</span>
      </button>

      {/* Center Links */}
      <div className="nav-links" style={{ display: "flex", gap: "2.5rem" }}>
        {navLinks.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            className={`nav-link ${activeSection === link ? "active" : ""}`}
          >
            {link}
          </button>
        ))}
      </div>

      {/* Status badge */}
      <div className="nav-status">[ AVAILABLE FOR WORK ]</div>
    </nav>
  );
}

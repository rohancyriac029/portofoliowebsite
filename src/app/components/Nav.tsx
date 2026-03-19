"use client";
import { useState, useRef, useEffect, useCallback } from "react";

const navLinks = ["about", "projects", "contact"] as const;

interface NavProps {
  activeSection: string;
  isScrolled: boolean;
  scrollTo: (id: string) => void;
}

export default function Nav({ activeSection, isScrolled, scrollTo }: NavProps) {
  const linksRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const updateIndicator = useCallback((key: string) => {
    const container = linksRef.current;
    const el = linkRefs.current.get(key);
    if (!container || !el) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicator({
      left: elRect.left - containerRect.left,
      width: elRect.width,
      opacity: 1,
    });
  }, []);

  /* Move indicator to active section (when not hovering) */
  useEffect(() => {
    if (!isHovering) {
      if ((navLinks as readonly string[]).includes(activeSection)) {
        updateIndicator(activeSection);
      } else {
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
      }
    }
  }, [activeSection, isHovering, updateIndicator]);

  return (
    <nav className={`nav ${isScrolled ? "scrolled" : ""}`}>
      {/* Logo */}
      <button className="nav-logo" onClick={() => scrollTo("hero")}>
        <span style={{ color: "var(--accent)" }}>&lt;</span>
        rohan.dev
        <span style={{ color: "var(--accent)" }}>/&gt;</span>
      </button>

      {/* Center Links */}
      <div
        ref={linksRef}
        className="nav-links"
        style={{ display: "flex", gap: "2.5rem", position: "relative" }}
        onMouseLeave={() => {
          setIsHovering(false);
          if ((navLinks as readonly string[]).includes(activeSection)) {
            updateIndicator(activeSection);
          } else {
            setIndicator((prev) => ({ ...prev, opacity: 0 }));
          }
        }}
      >
        {navLinks.map((link) => (
          <button
            key={link}
            ref={(el) => {
              if (el) linkRefs.current.set(link, el);
            }}
            onClick={() => scrollTo(link)}
            onMouseEnter={() => {
              setIsHovering(true);
              updateIndicator(link);
            }}
            className={`nav-link ${activeSection === link ? "active" : ""}`}
          >
            {link}
          </button>
        ))}
        {/* Sliding indicator */}
        <div
          className="nav-indicator"
          style={{
            left: indicator.left,
            width: indicator.width,
            opacity: indicator.opacity,
          }}
        />
      </div>

      {/* Status badge */}
      <div className="nav-status">[ AVAILABLE FOR WORK ]</div>
    </nav>
  );
}

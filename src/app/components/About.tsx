"use client";
import { useRef, useEffect } from "react";

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(".reveal, .reveal-left, .reveal-right, .word-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [ref]);
}

const skills = [
  {
    label: "+ LANGUAGES & FRAMEWORKS",
    tags: ["PYTHON", "C", "C++", "MERN", "RUST"],
  },
  {
    label: "+ DATABASES",
    tags: ["SQL", "NOSQL"],
  },
  {
    label: "+ PROJECT FIELDS",
    tags: ["AI/ML", "DISTRIBUTED SYSTEMS", "ARM CODE", "COMPUTER NETWORKS", "ARDUINO"],
  },
];

export default function About() {
  const aboutRef = useRef<HTMLElement>(null);
  useReveal(aboutRef);

  return (
    <section id="about" ref={aboutRef} className="section">
      {/* Section header */}
      <div className="section-header reveal stagger-children">
        <div className="section-header-left">
          <span className="section-number">( 01 )</span>
          <h2 className="section-title">ABOUT</h2>
        </div>
        <span className="section-label">[ BIO + STACK ]</span>
      </div>

      {/* Two-column grid */}
      <div className="about-grid">
        {/* Left — Bio */}
        <div className="reveal-left">
          <p className="body-text" style={{ marginBottom: "1.5rem" }}>
            Passionate learner and{" "}
            <strong>full-stack developer</strong>{" "}
            focused on delivering impactful results through creativity and innovation.
            Experienced in tackling dynamic challenges and crafting intuitive user experiences.
          </p>
          <p className="body-text" style={{ marginBottom: "2.5rem" }}>
            Currently expanding knowledge in{" "}
            <strong>AI/ML</strong>
            {" "}and exploring{" "}
            <strong>distributed systems</strong>{" "}
            concepts.
          </p>
          {/* Ghost buttons */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {[
              { label: "[ ↗ GITHUB ]", href: "https://github.com/rohancyriac029" },
              { label: "[ ↗ LINKEDIN ]", href: "https://www.linkedin.com/in/rohan-cyriac-6a71b930a" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right — Skills */}
        <div className="reveal-right" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {skills.map(({ label, tags }) => (
            <div key={label}>
              <p className="skills-group-label">{label}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {tags.map((tag) => (
                  <span key={tag} className="tag tag-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

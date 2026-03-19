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

export default function Contact() {
  const contactRef = useRef<HTMLElement>(null);
  useReveal(contactRef);

  const splitWords = (text: string) =>
    text.split(" ").map((word, i) => (
      <span
        key={i}
        className="word-reveal"
        style={{ transitionDelay: `${i * 0.08}s`, marginRight: "0.35em" }}
      >
        {word}
      </span>
    ));

  return (
    <section id="contact" ref={contactRef} className="section">
      {/* Section header */}
      <div className="section-header reveal stagger-children">
        <div className="section-header-left">
          <span className="section-number">( 03 )</span>
          <h2 className="section-title">CONTACT</h2>
        </div>
        <span className="section-label">[ LET&apos;S TALK ]</span>
      </div>

      {/* Giant text */}
      <div style={{ marginBottom: "4rem" }}>
        <div
          className="contact-heading"
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "clamp(3rem, 8vw, 8rem)",
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            lineHeight: 0.95,
          }}
        >
          <div style={{ color: "var(--text)", overflow: "hidden", paddingBottom: "0.1em" }}>
            {splitWords("HAVE AN IDEA?")}
          </div>
          <div style={{ overflow: "hidden", paddingBottom: "0.1em" }}>
            <span
              style={{
                display: "inline-block",
                WebkitTextStroke: "1.5px var(--text)",
                color: "transparent",
                transition: "all 0.22s ease",
              }}
              className="word-reveal"
            >
              LET&apos;S BUILD IT.
            </span>
          </div>
        </div>
      </div>

      {/* Contact buttons */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
        className="reveal"
      >
        <a href="mailto:rohancyriac572@gmail.com" className="btn-primary">
          [ ✉ EMAIL ]
        </a>
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
    </section>
  );
}

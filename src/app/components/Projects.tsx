"use client";
import { useState, useRef, useEffect } from "react";
import ProjectCard, { type Project } from "./ProjectCard";

const projects: Project[] = [
  {
    index: "00",
    title: "COUNCIL",
    description:
      "A serverless multi-agent AI editorial boardroom that transforms one prompt into a live debate, strategic paths, and a final annotated draft. Built with Amazon Bedrock (Nova/Claude), AWS Lambda, API Gateway (REST + WebSocket), DynamoDB, and S3; deployed via AWS CDK.",
    tags: ["AWS", "MULTI-AGENT AI", "SERVERLESS", "BEDROCK", "CDK"],
    githubUrl: "https://github.com/rohancyriac029/ai-for-bharat",
    websiteUrl: "https://ai-for-bharat-omega.vercel.app/",
  },
  {
    index: "01",
    title: "DEATH ROULETTE",
    description:
      "A 2D psychological tabletop horror game where you sit across a dark table from a mysterious dealer. A shotgun lies between you, loaded with an unknown mix of live and blank shells. Each turn you must decide — shoot yourself or the dealer — risking damage or gaining another turn.",
    tags: ["GODOT", "GDSCRIPT", "2D", "GAME DEV"],
    githubUrl: "https://github.com/rohancyriac029/dne-typeshyt",
  },
  {
    index: "02",
    title: "PHARMA INTELLIGENCE",
    description:
      "AI-powered drug discovery and market analysis platform. Uses a multi-agent orchestration system with Gemini AI to parse natural-language queries, search clinical trials, analyze patent landscapes, and generate comprehensive PDF reports with opportunity scoring.",
    tags: ["REACT", "GEMINI AI", "TYPESCRIPT", "PRISMA", "MULTI-AGENT"],
    githubUrl: "https://github.com/rohancyriac029/ey-techathon-pharmaceutical",
  },
  {
    index: "03",
    title: "BAL.RS",
    description:
      "A load balancer in Rust leveraging thread efficiency and memory safety. Uses log files to dynamically switch algorithms, monitor server health, and implement queuing to prevent downtime.",
    tags: ["RUST", "LOAD BALANCER", "DISTRIBUTED SYSTEMS", "SECURITY"],
    githubUrl: "https://github.com/rohancyriac029/rohan029-bal.rs",
  },
  {
    index: "04",
    title: "AI INVENTORY ARBITRAGE",
    description:
      "An autonomous inventory management system using ML agents and LLMs to analyze supply chain strategy. Connected to the Gemini API with real-time performance insights.",
    tags: ["AI", "ML", "GEMINI API", "SUPPLY CHAIN"],
    githubUrl: "https://github.com/rohancyriac029/ai-inventory-arbitrage",
  },
];

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

export default function Projects() {
  const CARD_GAP = 24; // 1.5rem
  const CARD_WIDTH = 400 + CARD_GAP;

  const [activeCard, setActiveCard] = useState(0);
  const shelfRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  const [cardTilts, setCardTilts] = useState<{ x: number; y: number }[]>(
    projects.map(() => ({ x: 0, y: 0 }))
  );

  useReveal(projectsRef);

  /* ── Click to focus + scroll into view ── */
  const selectCard = (idx: number) => {
    setActiveCard(idx);
    shelfRef.current?.children[idx]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  /* ── Navigate via arrows ── */
  const goToCard = (dir: number) => {
    const next = Math.max(0, Math.min(projects.length - 1, activeCard + dir));
    selectCard(next);
  };

  /* ── Card tilt ── */
  const onCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * 10;
    const ry = (-(e.clientX - cx) / (rect.width / 2)) * 10;
    setCardTilts((prev) => {
      const next = [...prev];
      next[idx] = { x: rx, y: ry };
      return next;
    });
  };

  const onCardMouseLeave = (idx: number) => {
    setCardTilts((prev) => {
      const next = [...prev];
      next[idx] = { x: 0, y: 0 };
      return next;
    });
  };

  const shelfProgress = projects.length > 1 ? activeCard / (projects.length - 1) : 0;

  return (
    <section id="projects" ref={projectsRef} className="section">
      {/* Section header */}
      <div className="section-header reveal stagger-children">
        <div className="section-header-left">
          <span className="section-number">( 02 )</span>
          <h2 className="section-title">PROJECTS</h2>
        </div>
        <span className="section-label">[ {projects.length} SELECTED WORKS ]</span>
      </div>

      {/* Scroll-snap shelf */}
      <div
        ref={shelfRef}
        className="shelf-scroll"
        style={{
          display: "flex",
          gap: "1.5rem",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          padding: "2rem 0.5rem 2rem 0",
          perspective: "1000px",
        }}
      >
        {projects.map((project, idx) => (
          <div
            key={project.index}
            style={{ scrollSnapAlign: "start", flexShrink: 0, cursor: "none" }}
            onClick={() => selectCard(idx)}
          >
            <ProjectCard
              project={project}
              idx={idx}
              isActive={idx === activeCard}
              tilt={cardTilts[idx]}
              isDragging={false}
              onMouseMove={onCardMouseMove}
              onMouseLeave={onCardMouseLeave}
            />
          </div>
        ))}
      </div>

      {/* Shelf controls */}
      <div className="shelf-controls">
        {/* Progress bar */}
        <div
          style={{
            flex: 1,
            height: 1,
            background: "var(--border)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: `${shelfProgress * 100}%`,
              background: "var(--accent)",
              transition: "width 0.3s var(--ease-spring)",
            }}
          />
        </div>

        {/* Arrows + counter */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
          <button
            onClick={() => goToCard(-1)}
            disabled={activeCard === 0}
            className="shelf-arrow"
            style={{
              color: activeCard === 0 ? "var(--ghost)" : "var(--text)",
              border: `1px solid ${activeCard === 0 ? "var(--ghost)" : "var(--border)"}`,
            }}
          >
            ←
          </button>
          <span className="shelf-counter">
            {String(activeCard + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => goToCard(1)}
            disabled={activeCard === projects.length - 1}
            className="shelf-arrow"
            style={{
              color: activeCard === projects.length - 1 ? "var(--ghost)" : "var(--text)",
              border: `1px solid ${activeCard === projects.length - 1 ? "var(--ghost)" : "var(--border)"}`,
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* All projects button */}
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <a
          href="https://github.com/rohancyriac029"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          [ ALL PROJECTS ON GITHUB ] →
        </a>
      </div>
    </section>
  );
}

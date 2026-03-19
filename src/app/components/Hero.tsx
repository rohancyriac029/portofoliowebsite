"use client";
import { useState, useEffect, useRef, useMemo } from "react";

const typewriterWords = ["Developer", "AI Enthusiast", "Problem Solver", "Innovator"];

interface HeroProps {
  scrollTo: (id: string) => void;
}

export default function Hero({ scrollTo }: HeroProps) {
  /* Typewriter state */
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const words = useMemo(() => typewriterWords, []);

  /* Canvas ref */
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Parallax scroll */
  const [scrollY, setScrollY] = useState(0);

  /* ── Parallax scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Typewriter ── */
  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && typewriterIndex < currentWord.length) {
        setTypewriterText(currentWord.substring(0, typewriterIndex + 1));
        setTypewriterIndex((i) => i + 1);
      } else if (isDeleting && typewriterIndex > 0) {
        setTypewriterText(currentWord.substring(0, typewriterIndex - 1));
        setTypewriterIndex((i) => i - 1);
      } else if (!isDeleting && typewriterIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typewriterIndex === 0) {
        setIsDeleting(false);
        setWordIndex((w) => (w + 1) % words.length);
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [typewriterIndex, isDeleting, wordIndex, words]);

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 280;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(240,237,232,0.35)";
        ctx.fill();
      }

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(240,237,232,${0.07 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 3rem 5rem",
        overflow: "hidden",
      }}
    >
      {/* Particle canvas — far layer */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />

      {/* Parallax floating shapes — near layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          transform: `translateY(${scrollY * 0.25}px)`,
          pointerEvents: "none",
        }}
      >
        {/* Outlined circle */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "18%",
            width: 60,
            height: 60,
            border: "1px solid rgba(232,255,71,0.12)",
            borderRadius: "50%",
          }}
        />
        {/* Cross */}
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: "6%",
            width: 30,
            height: 30,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              width: 1,
              height: "100%",
              background: "rgba(240,237,232,0.08)",
              transform: "translateX(-50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: "100%",
              height: 1,
              background: "rgba(240,237,232,0.08)",
              transform: "translateY(-50%)",
            }}
          />
        </div>
        {/* Diamond */}
        <div
          style={{
            position: "absolute",
            bottom: "28%",
            right: "8%",
            width: 35,
            height: 35,
            border: "1px solid rgba(240,237,232,0.06)",
            transform: "rotate(45deg)",
          }}
        />
        {/* Small circle */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "30%",
            width: 20,
            height: 20,
            border: "1px solid rgba(232,255,71,0.08)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Content */}
      {/* Content — mid layer */}
      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "70%",
          transform: `translateY(${scrollY * 0.12}px)`,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ width: 30, height: 1, background: "var(--muted)" }} />
          <span className="eyebrow">( Full-Stack Developer )</span>
        </div>

        {/* Name */}
        <h1
          className="hero-name"
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "clamp(4rem, 10vw, 10rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          <span style={{ color: "var(--text)", display: "block" }}>ROHAN</span>
          <span
            style={{
              display: "block",
              WebkitTextStroke: "1.5px var(--text)",
              color: "transparent",
            }}
          >
            CYRIAC
          </span>
        </h1>

        {/* Typewriter */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1.2rem",
            color: "var(--accent)",
            margin: "2rem 0",
            minHeight: "2rem",
          }}
        >
          <span>&gt;&nbsp;</span>
          <span className="typewriter-cursor">{typewriterText}</span>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => scrollTo("projects")}>
            [ VIEW MY WORK ]
          </button>
          <button className="btn-ghost" onClick={() => scrollTo("contact")}>
            [ GET IN TOUCH ]
          </button>
        </div>
      </div>

      {/* Vertical scroll indicator */}
      <div
        className="scroll-indicator"
        style={{
          position: "absolute",
          bottom: "5rem",
          right: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            color: "var(--muted)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 60,
            background: "linear-gradient(to bottom, var(--muted), transparent)",
          }}
        />
      </div>
    </section>
  );
}

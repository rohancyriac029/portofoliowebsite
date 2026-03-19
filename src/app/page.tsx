"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  /* Nav & scroll */
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* Custom cursor */
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLCanvasElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  /* ── Scroll handler ── */
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    setIsScrolled(scrollY > 50);
    setScrollProgress(docH > 0 ? scrollY / docH : 0);

    const threshold = window.innerHeight / 2;
    for (const id of ["hero", "about", "projects", "contact"]) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + scrollY;
        if (scrollY + threshold >= top && scrollY + threshold < top + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ── Custom cursor ── */
  useEffect(() => {
    const dot = cursorRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      dot.style.transform = `translate(${x - 5}px, ${y - 5}px)`;
      ringX += (x - 40 - ringX) * 0.15;
      ringY += (y - 40 - ringY) * 0.15;
    };

    const animate = () => {
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      animId = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      dot.style.width = dot.style.height = "20px";
      ring.style.width = ring.style.height = "60px";
      ring.style.borderColor = "var(--accent)";
    };
    const onLeave = () => {
      dot.style.width = dot.style.height = "10px";
      ring.style.width = ring.style.height = "36px";
      ring.style.borderColor = "rgba(232,255,71,0.5)";
    };

    const interactives = document.querySelectorAll("a, button");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMove);
    animId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  /* ── Magnetic UI elements ── */
  useEffect(() => {
    const strength = 0.2;
    const selectors = ".btn-primary, .btn-ghost, .nav-link, .nav-logo";
    const elements = document.querySelectorAll<HTMLElement>(selectors);
    const handlers = new Map<
      HTMLElement,
      { move: (e: MouseEvent) => void; leave: () => void }
    >();

    elements.forEach((el) => {
      const move = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      };
      const leave = () => {
        el.style.transform = "translate(0, 0)";
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      handlers.set(el, { move, leave });
    });

    return () => {
      handlers.forEach(({ move, leave }, el) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  /* ── Scroll velocity blur ── */
  useEffect(() => {
    let currentBlur = 0;
    let scrollVelocity = 0;
    let lastY = window.scrollY;
    let animId: number;

    const onScroll = () => {
      const y = window.scrollY;
      scrollVelocity = Math.abs(y - lastY);
      lastY = y;
    };

    const animate = () => {
      const target = Math.min(scrollVelocity * 0.12, 1.5);
      currentBlur += (target - currentBlur) * 0.15;
      scrollVelocity *= 0.9;
      if (mainRef.current) {
        mainRef.current.style.filter =
          currentBlur > 0.05 ? `blur(${currentBlur}px)` : "none";
      }
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    animId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  /* ── Interactive background grid ── */
  useEffect(() => {
    const canvas = gridRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mouseX = -1000,
      mouseY = -1000;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cell = 50;
      const radius = 200;

      for (let x = 0; x <= canvas.width; x += cell) {
        const d = Math.abs(x - mouseX);
        const a = d < radius ? 0.015 + 0.055 * (1 - d / radius) : 0.015;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = `rgba(240,237,232,${a})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += cell) {
        const d = Math.abs(y - mouseY);
        const a = d < radius ? 0.015 + 0.055 * (1 - d / radius) : 0.015;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = `rgba(240,237,232,${a})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      for (let x = 0; x <= canvas.width; x += cell) {
        for (let y = 0; y <= canvas.height; y += cell) {
          const dist = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
          if (dist < radius) {
            const ga = 0.3 * (1 - dist / radius);
            ctx.beginPath();
            ctx.arc(x, y, 1.5 + (1 - dist / radius) * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(232,255,71,${ga})`;
            ctx.fill();
          }
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  /* ── Scroll to section ── */
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Custom Cursor ── */}
      <div
        id="cursor"
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 10, height: 10,
          borderRadius: "50%",
          background: "var(--accent)",
          mixBlendMode: "difference",
          zIndex: 9999,
          pointerEvents: "none",
          transition: "width 0.2s, height 0.2s",
        }}
      />
      <div
        id="cursor-ring"
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 36, height: 36,
          border: "1px solid rgba(232,255,71,0.5)",
          borderRadius: "50%",
          zIndex: 9998,
          pointerEvents: "none",
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
        }}
      />

      {/* ── Interactive Grid ── */}
      <canvas ref={gridRef} className="grid-canvas" />

      {/* ── Noise Overlay ── */}
      <div
        style={{
          position: "fixed", inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* ── Scroll Progress Bar (right edge) ── */}
      <div
        style={{
          position: "fixed",
          right: 0, top: 0,
          width: 2,
          height: `${(1 - scrollProgress) * 100}%`,
          background: "var(--accent)",
          zIndex: 100,
          transition: "height 0.1s linear",
          transformOrigin: "top",
        }}
      />

      {/* ── Sections ── */}
      <Nav activeSection={activeSection} isScrolled={isScrolled} scrollTo={scrollTo} />

      <main ref={mainRef}>
        <Hero scrollTo={scrollTo} />
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
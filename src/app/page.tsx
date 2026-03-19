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

      <main>
        <Hero scrollTo={scrollTo} />
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
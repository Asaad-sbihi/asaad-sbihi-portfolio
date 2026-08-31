"use client";

import { useEffect, useRef, useState } from "react";
import useSmoothScroll from "@/hooks/useSmoothScroll";
import useReducedMotion from "@/hooks/useReducedMotion";
import { HERO } from "@/lib/content";

export default function Hero() {
  const scrollTo = useSmoothScroll();
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState("");
  const heroRef = useRef(null);
  const courtRef = useRef(null);
  const consoleRef = useRef(null);

  // Typewriter for the `shipping:` line.
  useEffect(() => {
    if (reduced) {
      setTyped(HERO.shipping[0]);
      return;
    }
    let word = 0;
    let chars = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const current = HERO.shipping[word];
      chars += deleting ? -1 : 1;
      setTyped(current.slice(0, chars));

      if (!deleting && chars === current.length) {
        deleting = true;
        timer = setTimeout(tick, 1600);
        return;
      }
      if (deleting && chars === 0) {
        deleting = false;
        word = (word + 1) % HERO.shipping.length;
      }
      timer = setTimeout(tick, deleting ? 38 : 75);
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [reduced]);

  // Court parallax on scroll.
  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      const y = Math.min(window.scrollY, 900);
      if (courtRef.current) {
        courtRef.current.style.transform = `perspective(680px) rotateX(64deg) translateY(${y * -0.06}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  const handlePointerMove = (e) => {
    if (reduced || !consoleRef.current) return;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    consoleRef.current.style.transform = `translate(${x * -16}px, ${y * -12}px)`;
  };

  const handlePointerLeave = () => {
    if (consoleRef.current) consoleRef.current.style.transform = "";
  };

  return (
    <section
      className="hero"
      id="top"
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero__bg" />
      <div className="court" ref={courtRef} />
      <div className="streak streak--a" />
      <div className="streak streak--b" />
      <div className="ball" />

      <div>
        <h1 className="hero__title">
          <span><i>{HERO.titleA}</i></span> <span><i>{HERO.titleB}</i></span>
        </h1>
        <ul className="hero__meta">
          {HERO.meta.map((m) => (
            <li key={m.label}>
              <b>{m.label}</b>
              {m.value}
            </li>
          ))}
        </ul>
      </div>

      <div className="console" ref={consoleRef}>
        <div className="console__bar">
          <b /><b /><b />
          <span>asaad@casablanca</span>
        </div>
        <code>
          <span className="k">const</span> asaad = {"{"}
          {"\n  role: "}<span className="s">&quot;Full-Stack AI Engineer&quot;</span>,
          {"\n  stack: ["}
          <span className="s">&quot;React&quot;</span>{", "}
          <span className="s">&quot;Next.js&quot;</span>{", "}
          <span className="s">&quot;Laravel&quot;</span>,
          {"\n          "}
          <span className="s">&quot;Python&quot;</span>{", "}
          <span className="s">&quot;LLMs&quot;</span>{"],"}
          {"\n  focus: "}<span className="s">&quot;AI-Powered Systems&quot;</span>,
          {"\n  shipping: "}<span className="s">{typed}</span>
          <span className="caret" />
          {"\n}"}
        </code>
      </div>

      <div className="hero__foot">
        <p className="hero__sub">
          {HERO.sub[0]}
          <br />
          {HERO.sub[1]}
        </p>

        <div className="hero__cards">
          <a className="gcard" href="#projects" onClick={(e) => scrollTo(e, "#projects")}>
            <div className="gcard__thumb">&lt;/&gt;</div>
            <div>
              <p className="gcard__label">Selected work</p>
              <p className="gcard__text">AI products shipped to production, not demos.</p>
              <span className="gcard__link">See projects →</span>
            </div>
          </a>

          <div className="gcard gcard--stat">
            <div>
              <p className="gcard__label">Since 2024</p>
              <p className="gcard__big">3 yrs</p>
              <p className="gcard__text">shipping web products end to end</p>
            </div>
            <div className="dots" aria-hidden="true">
              <i /><i /><i />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

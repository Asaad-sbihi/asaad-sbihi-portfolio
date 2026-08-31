"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";
import { SLIDES } from "@/lib/content";

const SWAP_MS = 320;

export default function Focus() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const [auto, setAuto] = useState(true);

  const go = useCallback((next, manual = false) => {
    if (manual) setAuto(false);
    setSwapping(true);
    setTimeout(() => {
      setIndex((next + SLIDES.length) % SLIDES.length);
      setSwapping(false);
    }, SWAP_MS);
  }, []);

  // Autoplay, paused after any manual interaction.
  useEffect(() => {
    if (!auto || reduced) return;
    const id = setInterval(() => go(index + 1), 6500);
    return () => clearInterval(id);
  }, [auto, reduced, index, go]);

  // Arrow keys move the carousel.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(index + 1, true);
      if (e.key === "ArrowLeft") go(index - 1, true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, go]);

  const slide = SLIDES[index];

  return (
    <section className="focus" id="about">
      <div className="wrap">
        <div className={`focus__type${swapping ? " swap" : ""}`}>
          <div className="focus__line focus__line--ghost">{slide.ghost}</div>
          <div className="focus__line focus__line--ink">{slide.ink}</div>
        </div>

        <div className={`focus__card${swapping ? " swap" : ""}`}>
          <Image
            className={`focus__portrait${slide.code ? "" : " on"}`}
            src="/avatar.jpg"
            alt="Portrait of Asaad Sbihi"
            width={256}
            height={256}
            priority
          />

          {slide.code && (
            <div className="focus__code on">
              {slide.code.map((line, i) => (
                <div key={i}>
                  {line.map(([text, cls], j) => (
                    <span key={j} className={cls}>{text}</span>
                  ))}
                </div>
              ))}
            </div>
          )}

          <div className="focus__chip">
            <b>Asaad Sbihi</b>
            <span>{slide.role}</span>
          </div>
        </div>

        <div className="focus__nav">
          <button className="arrow arrow--prev" onClick={() => go(index - 1, true)} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button className="arrow arrow--next" onClick={() => go(index + 1, true)} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="focus__dots" role="tablist" aria-label="Profile">
            {SLIDES.map((s, i) => (
              <button
                key={s.ghost}
                role="tab"
                aria-current={i === index}
                aria-label={`${s.ghost} ${s.ink}`}
                onClick={() => go(i, true)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

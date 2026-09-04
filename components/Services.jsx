"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { useModal } from "@/context/ModalContext";
import { LAYERS } from "@/lib/content";

export default function Services() {
  const { openModal } = useModal();
  const railRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });
  const [dragging, setDragging] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /** One card plus the gap, measured from the DOM so it stays
   *  correct at every breakpoint instead of a hardcoded 320. */
  const step = useCallback(() => {
    const rail = railRef.current;
    const card = rail?.querySelector(".railcard");
    if (!card) return 320;
    const styles = getComputedStyle(rail);
    const gap = parseFloat(styles.columnGap || styles.gap) || 24;
    return card.offsetWidth + gap;
  }, []);

  const slide = (direction) => {
    railRef.current?.scrollBy({ left: direction * step(), behavior: "smooth" });
  };

  const syncArrows = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setAtStart(rail.scrollLeft <= 2);
    setAtEnd(rail.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    syncArrows();
    window.addEventListener("resize", syncArrows);
    return () => window.removeEventListener("resize", syncArrows);
  }, [syncArrows]);

  // Mouse drag only — touch keeps native momentum scrolling,
  // which feels better than any JS reimplementation.
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return;
    drag.current = { active: true, startX: e.clientX, startLeft: railRef.current.scrollLeft };
    setDragging(true);
    railRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    e.preventDefault();
    railRef.current.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };

  const endDrag = () => {
    drag.current.active = false;
    setDragging(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      slide(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      slide(-1);
    }
  };

  return (
    <section className="stack" id="services">
      <div className="wrap">
        <Reveal className="stack__card">
          <div>
            <div className="tile">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2.5" y="3.5" width="19" height="17" rx="3" />
                <path d="M7 9l3 3-3 3M13 15h4" />
              </svg>
            </div>
            <h2>
              Take a tour
              <br />
              of the stack
            </h2>
            <p>
              Five layers, one delivery: design, marketing, and motion — with the front and back
              end that ship them. Drag or use the arrows to see what I actually work with.
            </p>
            <button className="btn" onClick={() => openModal("brief")}>
              Start a project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          <div className="rail__wrap">
            <div className="rail__nav">
              <button
                className="arrow arrow--prev arrow--sm"
                onClick={() => slide(-1)}
                disabled={atStart}
                aria-label="Previous stack layer"
                aria-controls="stack-rail"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <button
                className="arrow arrow--next arrow--sm"
                onClick={() => slide(1)}
                disabled={atEnd}
                aria-label="Next stack layer"
                aria-controls="stack-rail"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div
              id="stack-rail"
              className={`rail${dragging ? " dragging" : ""}`}
              ref={railRef}
              role="group"
              aria-label="Stack layers, scrollable"
              tabIndex={0}
              onScroll={syncArrows}
              onKeyDown={onKeyDown}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onPointerLeave={endDrag}
            >
              {LAYERS.map((layer, i) => (
                <article className={`railcard railcard--${i + 1}`} key={layer.title}>
                  <span className="railcard__num">{layer.num}</span>
                  <div className="railcard__info">
                    <b>{layer.title}</b>
                    <span>{layer.body}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

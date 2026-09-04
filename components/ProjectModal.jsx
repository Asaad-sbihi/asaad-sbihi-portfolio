"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Centered case-study modal for a project card.
 *
 * `project` is a PROJECTS entry that carries a `caseStudy` object, or null
 * when closed. Mirrors ContactModal's conventions: scrim + Escape + backdrop
 * click to close, body scroll lock (`body.modal-open { overflow:hidden }`),
 * focus moved to the ✕ on open and restored to the trigger on close, and a
 * simple Tab focus-trap inside the panel. A sticky header keeps the ✕ in
 * reach while the body scrolls.
 *
 * A `caseStudy` may contain:
 *   - `compare`: { before, after } — an "Avant vs Après" section with a
 *     Côte à côte / Avant / Après toggle. Each side is { label, src, note }.
 *   - `gallery`: [{ src, caption, note }] — a 2-col post grid.
 * Both are optional and render in that order.
 */
export default function ProjectModal({ project, onClose }) {
  const isOpen = !!project;

  // Keep the last project rendered through the close transition.
  const [shown, setShown] = useState(project);
  // Images that failed to load — fall back to a labelled placeholder.
  const [brokenImgs, setBrokenImgs] = useState({});
  // "both" | "before" | "after" for the Avant/Après comparison.
  const [compareView, setCompareView] = useState("both");

  useEffect(() => {
    if (project) {
      setShown(project);
      setBrokenImgs({});
      setCompareView("both");
    }
  }, [project]);

  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const lastFocused = useRef(null);

  // Scroll lock + remember/restore focus.
  useEffect(() => {
    if (isOpen) {
      lastFocused.current = document.activeElement;
      document.body.classList.add("modal-open");
      const t = setTimeout(() => closeRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
    document.body.classList.remove("modal-open");
    lastFocused.current?.focus?.();
  }, [isOpen]);

  // Escape to close + Tab trap.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll(
        'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const study = shown?.caseStudy;

  const renderSide = (kind, data) => (
    <figure className={`pmodal__side pmodal__side--${kind}`} key={kind}>
      <span className="pmodal__badge">{data.label}</span>
      <div className="pmodal__frame">
        {data.src && !brokenImgs[kind] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.src}
            alt={data.label}
            loading="lazy"
            onError={() => setBrokenImgs((b) => ({ ...b, [kind]: true }))}
          />
        ) : (
          <span>{data.label}</span>
        )}
      </div>
      {data.note && (
        <figcaption className="pmodal__meta">
          <span>{data.note}</span>
        </figcaption>
      )}
    </figure>
  );

  return (
    <div
      className={`pmodal${isOpen ? " is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={study ? study.title : "Project details"}
      aria-hidden={!isOpen}
    >
      <div className="pmodal__scrim" onClick={onClose} />

      <div className="pmodal__panel" ref={panelRef}>
        <div className="pmodal__header">
          <p className="eyebrow">Case study</p>
          <button
            className="pmodal__close"
            onClick={onClose}
            ref={closeRef}
            aria-label="Close project details"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {study && (
          <div className="pmodal__body">
            <h2>{study.title}</h2>
            <p className="pmodal__intro">{study.intro}</p>
            {study.role && <p className="pmodal__role">{study.role}</p>}

            {study.sections?.map((sec, i) => (
              <section className="pmodal__sec" key={i}>
                {sec.heading && <h3 className="pmodal__h3">{sec.heading}</h3>}
                {sec.body && <p className="pmodal__text">{sec.body}</p>}
              </section>
            ))}

            {study.video && (
              <section className="pmodal__sec">
                {study.video.heading && <h3 className="pmodal__h3">{study.video.heading}</h3>}
                <div className="pmodal__video">
                  {study.video.src && !brokenImgs.video ? (
                    <video
                      src={study.video.src}
                      controls
                      playsInline
                      preload="metadata"
                      poster={study.video.poster || undefined}
                      onError={() => setBrokenImgs((b) => ({ ...b, video: true }))}
                    />
                  ) : (
                    <div className="pmodal__video-ph">
                      <span>{study.video.label || "Video showcase"}</span>
                    </div>
                  )}
                </div>
                {study.video.label && <p className="pmodal__vidlabel">{study.video.label}</p>}
                {study.video.note && <p className="pmodal__text">{study.video.note}</p>}
              </section>
            )}

            {study.tools?.length > 0 && (
              <section className="pmodal__sec">
                <h3 className="pmodal__h3">Tools Used</h3>
                <ul className="pmodal__tools">
                  {study.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </section>
            )}

            {study.compare && (
              <section className="pmodal__cmp">
                <h3 className="pmodal__h3">Avant vs Après — Charte Graphique</h3>

                <div className="pmodal__toggle" role="group" aria-label="Compare brand identity">
                  {[
                    ["both", "Côte à côte"],
                    ["before", "Avant"],
                    ["after", "Après"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={compareView === value}
                      onClick={() => setCompareView(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className={`pmodal__sides pmodal__sides--${compareView}`}>
                  {(compareView === "both" || compareView === "before") &&
                    renderSide("before", study.compare.before)}
                  {(compareView === "both" || compareView === "after") &&
                    renderSide("after", study.compare.after)}
                </div>
              </section>
            )}

            {study.gallery?.length > 0 && (
              <div className="pmodal__gallery">
                {study.gallery.map((item, i) => (
                  <figure className="pmodal__item" key={i}>
                    <div className="pmodal__frame">
                      {item.src && !brokenImgs[i] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.src}
                          alt={item.caption || `${shown.title} — ${i + 1}`}
                          loading="lazy"
                          onError={() => setBrokenImgs((b) => ({ ...b, [i]: true }))}
                        />
                      ) : (
                        <span>{item.caption || `Post ${String(i + 1).padStart(2, "0")}`}</span>
                      )}
                    </div>
                    <figcaption className="pmodal__meta">
                      <b>{item.caption || `Post ${String(i + 1).padStart(2, "0")}`}</b>
                      {item.note && <span>{item.note}</span>}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

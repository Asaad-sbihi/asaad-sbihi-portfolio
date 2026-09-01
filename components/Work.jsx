"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import ProjectModal from "@/components/ProjectModal";
import Reveal from "@/components/Reveal";
import { FILTERS, PROJECTS } from "@/lib/content";

export default function Work() {
  // `filter` holds a tag value ("All" | "Développement" | "Design" | "Media" | "Ads")
  const [filter, setFilter] = useState("All");

  // The project whose case-study modal is open, or null. (isModalOpen === !!activeCase)
  const [activeCase, setActiveCase] = useState(null);

  const visible = useMemo(
    () => PROJECTS.filter((p) => filter === "All" || p.tags.includes(filter)),
    [filter]
  );

  const activeLabel = FILTERS.find((f) => f.tag === filter)?.label ?? filter;

  return (
    <section className="work" id="projects">
      <div className="wrap">
        <Reveal className="work__head">
          <h2>
            Selected
            <br />
            work
          </h2>
          <div className="filters" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f.tag}
                className="chip"
                aria-pressed={filter === f.tag}
                onClick={() => setFilter(f.tag)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid">
          {visible.length === 0 && (
            <article className="project project--empty">
              <p>No projects tagged “{activeLabel}” yet.</p>
            </article>
          )}

          {visible.map((p, i) => {
            // A card can link out (p.url), open a case study (p.caseStudy),
            // or be static.
            const hasCase = !!p.caseStudy;
            const Tag = p.url ? "a" : hasCase ? "button" : "article";
            const interactiveProps = p.url
              ? { href: p.url, target: "_blank", rel: "noopener noreferrer" }
              : hasCase
              ? { type: "button", onClick: () => setActiveCase(p) }
              : {};

            return (
              <Reveal
                as={Tag}
                className="project"
                delay={i * 70}
                key={`${filter}-${p.title}`}
                {...interactiveProps}
              >
                <div className={`project__vis${p.logo ? " project__vis--logo" : ""}`}>
                  {p.image ? (
                    p.image.endsWith(".svg") ? (
                      // SVGs are served straight from /public — the image
                      // optimizer would send them as attachments and not render.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.title} loading="lazy" />
                    ) : (
                      <Image src={p.image} alt={p.title} fill sizes="(max-width:768px) 100vw, 33vw" />
                    )
                  ) : (
                    <span>0{i + 1}</span>
                  )}
                </div>
                <div className="project__body">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  {(p.url || hasCase) && (
                    <span className="project__go">
                      {p.url ? "View project" : "View details"}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        {p.url ? (
                          <path d="M7 17L17 7M8 7h9v9" />
                        ) : (
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        )}
                      </svg>
                    </span>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <ProjectModal project={activeCase} onClose={() => setActiveCase(null)} />
    </section>
  );
}

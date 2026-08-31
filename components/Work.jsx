"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import { FILTERS, PROJECTS } from "@/lib/content";

export default function Work() {
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () => PROJECTS.filter((p) => filter === "All" || p.tags.includes(filter)),
    [filter]
  );

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
                key={f}
                className="chip"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid">
          {visible.length === 0 && (
            <article className="project project--empty">
              <p>No projects tagged “{filter}” yet.</p>
            </article>
          )}

          {visible.map((p, i) => {
            const Tag = p.url ? "a" : "article";
            const linkProps = p.url
              ? { href: p.url, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <Reveal
                as={Tag}
                className="project"
                delay={i * 70}
                key={`${filter}-${p.title}`}
                {...linkProps}
              >
                <div className={`project__vis${p.logo ? " project__vis--logo" : ""}`}>
                  {p.image ? (
                    <Image src={p.image} alt={p.title} fill sizes="(max-width:768px) 100vw, 33vw" />
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
                  {p.url && (
                    <span className="project__go">
                      View project
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M8 7h9v9" />
                      </svg>
                    </span>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

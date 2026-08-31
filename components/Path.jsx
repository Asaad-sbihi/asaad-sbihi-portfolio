"use client";

import Reveal from "@/components/Reveal";
import useReveal from "@/hooks/useReveal";
import { EDUCATION, JOBS, LANGUAGES } from "@/lib/content";

export default function Path() {
  const [sideRef, sideVisible] = useReveal();

  return (
    <section className="path" id="path">
      <div className="wrap path__grid">
        <Reveal>
          <h2>
            Where I&apos;ve
            <br />
            been building
          </h2>
          {JOBS.map((job) => (
            <div className="job" key={job.title}>
              <div className="job__when">{job.when}</div>
              <div>
                <h3>{job.title}</h3>
                <em>{job.company}</em>
                <p>{job.body}</p>
              </div>
            </div>
          ))}
        </Reveal>

        <aside
          ref={sideRef}
          className={`side reveal${sideVisible ? " in" : ""}`}
          style={{ "--d": "140ms" }}
        >
          <h3>Education</h3>
          <ul>
            {EDUCATION.map((e) => (
              <li key={e.title}>
                <b>{e.title}</b>
                <span>{e.when}</span>
              </li>
            ))}
          </ul>

          <h3>Languages</h3>
          <ul>
            {LANGUAGES.map((l) => (
              <li key={l.title}>
                <b>{l.title}</b>
                <span>{l.when}</span>
                <div className="bar">
                  <i style={{ width: sideVisible ? l.level : 0 }} />
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

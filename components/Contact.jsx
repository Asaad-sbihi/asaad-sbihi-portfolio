"use client";

import DownloadCV from "@/components/DownloadCV";
import { useModal } from "@/context/ModalContext";
import { SITE } from "@/lib/content";

export default function Contact() {
  const { openModal } = useModal();

  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <h2>
          Let&apos;s
          <br />
          talk
        </h2>

        <div className="contact__rows">
          <div>
            <span>Email</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div>
            <span>Phone</span>
            <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
          </div>
          <div>
            <span>LinkedIn</span>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
              /in/asaad-sbihi
            </a>
          </div>
          <div>
            <span>Based in</span>
            <p>{SITE.location}</p>
          </div>
        </div>

        <div className="contact__cta">
          <button className="btn btn--light" onClick={() => openModal("brief")}>
            Send a brief
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <DownloadCV />
        </div>
      </div>
    </section>
  );
}

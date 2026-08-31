"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/content";

/**
 * Real anchor with a download attribute, so right-click, middle-click
 * and keyboard all behave normally. On a plain click we verify the file
 * exists first — a missing PDF would otherwise "download" a 404 page,
 * which looks like success and isn't. Falls back to a toast, not alert().
 */
export default function DownloadCV({ className = "btn btn--light" }) {
  const [toast, setToast] = useState(null); // { message, tone }
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const notify = (message, tone = "err") => {
    setToast({ message, tone });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 5000);
  };

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(SITE.resume, { method: "HEAD", cache: "no-store" });
      const type = res.headers.get("content-type") || "";

      // A dev server or SPA host can answer 200 with an HTML fallback,
      // so check the content type as well as the status.
      if (!res.ok || !type.includes("pdf")) {
        notify(`The CV isn't uploaded yet — drop your PDF at public${SITE.resume}.`);
        return;
      }

      const link = document.createElement("a");
      link.href = SITE.resume;
      link.download = SITE.resumeFilename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      notify("Downloading your CV…", "ok");
    } catch {
      notify(`Couldn't reach the file. Email me at ${SITE.email} and I'll send it over.`);
    }
  };

  return (
    <>
      <a
        className={className}
        href={SITE.resume}
        download={SITE.resumeFilename}
        onClick={handleClick}
      >
        Download CV
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4v12M7 12l5 5 5-5M5 20h14" />
        </svg>
      </a>

      <div className="toast-wrap" role="status" aria-live="polite">
        {toast && (
          <div className={`toast toast--${toast.tone}`}>
            <span className="toast__dot" aria-hidden="true" />
            {toast.message}
          </div>
        )}
      </div>
    </>
  );
}

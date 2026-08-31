"use client";

import { useEffect, useRef, useState } from "react";
import { useModal } from "@/context/ModalContext";
import { COPY_BY_TOPIC, SITE, TOPICS } from "@/lib/content";

// FormSubmit needs no account: the first message triggers a one-time
// confirmation email to SITE.email — click the link in it and every
// later message lands in that inbox. If you'd rather use Formspree,
// set NEXT_PUBLIC_FORMSPREE_ID and it takes priority.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const ENDPOINT =
  FORMSPREE_ID && FORMSPREE_ID !== "xxxxxxxx"
    ? `https://formspree.io/f/${FORMSPREE_ID}`
    : `https://formsubmit.co/ajax/${SITE.email}`;

const EMPTY = { name: "", email: "", brief: "", _gotcha: "" };

export default function ContactModal() {
  const { isOpen, closeModal, topic, setTopic } = useModal();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | pending | error
  const panelRef = useRef(null);
  const firstFieldRef = useRef(null);
  const lastFocused = useRef(null);

  // Lock scroll, remember focus, restore it on close.
  useEffect(() => {
    if (isOpen) {
      lastFocused.current = document.activeElement;
      document.body.classList.add("modal-open");
      const t = setTimeout(() => firstFieldRef.current?.focus(), 380);
      return () => clearTimeout(t);
    }
    document.body.classList.remove("modal-open");
    lastFocused.current?.focus?.();
  }, [isOpen]);

  // Escape to close + focus trap inside the panel.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
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
  }, [isOpen, closeModal]);

  // Reset the form a moment after the panel has slid away.
  useEffect(() => {
    if (isOpen) return;
    const t = setTimeout(() => {
      setValues(EMPTY);
      setErrors({});
      setStatus("idle");
    }, 500);
    return () => clearTimeout(t);
  }, [isOpen]);

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Add your name so I know who I'm replying to.";
    if (!values.email.trim()) next.email = "Add an email so I can reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "That email address looks incomplete.";
    if (values.brief.trim().length < 20)
      next.brief = "A couple of sentences helps — what are you building?";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values._gotcha) return; // bot filled the honeypot
    if (!validate()) return;

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          topic: TOPICS.find((t) => t.id === topic)?.label ?? "Something else",
          message: values.brief,
          _subject: `${TOPICS.find((t) => t.id === topic)?.label ?? "Message"} from ${values.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      // Both providers answer 200 even when the message was NOT delivered, so
      // the JSON body is the real signal:
      //   Formspree   -> { ok: true } | { errors: [...] }
      //   FormSubmit  -> { success: "true" } | { success: "false", message }
      //                  (success:"false" until SITE.email is confirmed once)
      let data = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON body — fall through to the res.ok check below */
      }
      const delivered =
        data.ok === true || data.success === true || data.success === "true";

      if (delivered || (res.ok && data.ok === undefined && data.success === undefined)) {
        setStatus("sent");
      } else if (!FORMSPREE_ID && res.ok) {
        // FormSubmit accepted the request but is holding it: the address
        // still needs its one-time email confirmation.
        setStatus("pending");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const copy = COPY_BY_TOPIC[topic] ?? COPY_BY_TOPIC.other;

  return (
    <div
      className={`modal${isOpen ? " is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Contact Asaad Sbihi"
      aria-hidden={!isOpen}
    >
      <div className="modal__scrim" onClick={closeModal} />

      <div className="modal__panel" ref={panelRef}>
        <button className="modal__close" onClick={closeModal} aria-label="Close contact form">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {status === "sent" ? (
          <div className="sent">
            <div className="sent__mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12.5l5 5L20 6.5" />
              </svg>
            </div>
            <h3>Brief received</h3>
            <p>Thanks {values.name.split(" ")[0]} — I read every message and usually reply within a day.</p>
            <button className="btn" onClick={closeModal}>Close</button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Get in touch</p>
            <h2>{copy.title}</h2>
            <p className="modal__intro">{copy.intro}</p>

            <div className="topic" role="radiogroup" aria-label="What is this about?">
              {TOPICS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={topic === t.id}
                  className="topic__opt"
                  onClick={() => setTopic(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {status === "pending" && (
              <div className="modal__status modal__status--info" role="status">
                Almost there — FormSubmit just emailed a one-time confirmation link
                to the site owner. Once that link is clicked, send this again and it
                will arrive. Nothing is lost in the meantime.
              </div>
            )}

            {status === "error" && (
              <div className="modal__status modal__status--err" role="alert">
                That didn&apos;t send.{" "}
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent(
                    `${TOPICS.find((t) => t.id === topic)?.label ?? "Message"} from ${values.name}`
                  )}&body=${encodeURIComponent(values.brief)}`}
                  style={{ textDecoration: "underline" }}
                >
                  Open your email app instead
                </a>
                .
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* honeypot: real people never see or fill this */}
              <input
                className="hp"
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                value={values._gotcha}
                onChange={update("_gotcha")}
                aria-hidden="true"
              />

              <div className={`field${errors.name ? " has-error" : ""}`}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  ref={firstFieldRef}
                  value={values.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </div>

              <div className={`field${errors.email ? " has-error" : ""}`}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={update("email")}
                  placeholder="you@company.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <span className="field__error">{errors.email}</span>}
              </div>

              <div className={`field${errors.brief ? " has-error" : ""}`}>
                <label htmlFor="brief">Brief details</label>
                <textarea
                  id="brief"
                  name="brief"
                  value={values.brief}
                  onChange={update("brief")}
                  placeholder="What are you building, who is it for, and when do you need it live?"
                  aria-invalid={!!errors.brief}
                />
                {errors.brief && <span className="field__error">{errors.brief}</span>}
              </div>

              <button className="btn" type="submit" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <span className="spin" aria-hidden="true" />
                    Sending
                  </>
                ) : (
                  <>
                    {topic === "brief" ? "Send brief" : "Send message"}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <p className="modal__note">Or email {SITE.email}</p>
          </>
        )}
      </div>
    </div>
  );
}

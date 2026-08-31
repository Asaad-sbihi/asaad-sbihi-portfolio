"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";
import useSmoothScroll from "@/hooks/useSmoothScroll";
import { MENU, NAV } from "@/lib/content";

export default function Header() {
  const { openModal } = useModal();
  const scrollTo = useSmoothScroll();
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const onScroll = () => setStuck(window.scrollY > (hero?.offsetHeight ?? 700) - 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const handleNav = (e, href) => {
    setMenuOpen(false);
    scrollTo(e, href);
  };

  return (
    <>
      <header className={`topbar${stuck ? " is-stuck" : ""}`}>
        <nav className="topbar__group topbar__group--left">
          {NAV.map((item) => (
            <a
              key={item.href}
              className="navlink"
              href={item.href}
              onClick={(e) => handleNav(e, item.href)}
            >
              {item.label.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </a>
          ))}
        </nav>

        <a className="brand" href="#top" onClick={(e) => handleNav(e, "#top")} aria-label="Asaad Sbihi, home">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 4 3 12l6 8M15 4l6 8-6 8" />
          </svg>
          Asaad Sbihi
        </a>

        <div className="topbar__group topbar__group--right">
          <button className="talk" onClick={() => openModal("other")}>Let&apos;s talk</button>
          <button
            className="burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <nav className="menu" aria-label="Main" aria-hidden={!menuOpen}>
        {MENU.map((item) => (
          <a key={item.href} href={item.href} onClick={(e) => handleNav(e, item.href)}>
            {item.label}
          </a>
        ))}
        <p>Casablanca, Morocco — available for freelance &amp; full-time</p>
      </nav>
    </>
  );
}

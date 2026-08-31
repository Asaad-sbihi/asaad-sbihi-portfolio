"use client";

import { useCallback } from "react";

const HEADER_OFFSET = 92;

/**
 * Smooth-scrolls to a section id. preventDefault stops the browser
 * (and any embedded preview/webview) from treating this as a
 * navigation, and we deliberately don't touch the URL. Respects
 * reduced motion.
 */
export default function useSmoothScroll() {
  return useCallback((event, href) => {
    if (!href?.startsWith("#")) return;
    event.preventDefault();

    const target = document.querySelector(href);
    if (!target) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }, []);
}

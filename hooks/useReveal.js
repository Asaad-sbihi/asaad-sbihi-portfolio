"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Adds the .in class once an element scrolls into view.
 * Returns [ref, isVisible] — pair it with the .reveal class.
 */
export default function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -60px", ...options }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [options]);

  return [ref, visible];
}

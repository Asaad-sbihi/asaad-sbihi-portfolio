"use client";

import useReveal from "@/hooks/useReveal";

/** Wraps children in a scroll-triggered fade-up. */
export default function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const [ref, visible] = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? " in" : ""}${className ? " " + className : ""}`}
      style={delay ? { "--d": `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

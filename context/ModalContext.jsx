"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import ContactModal from "@/components/ContactModal";

const ModalContext = createContext(null);

/**
 * Shared modal state. openModal() optionally takes a topic id from
 * TOPICS in lib/content.js — "Send a brief" and "Start a project"
 * pass "brief" so the form opens with Project brief already selected.
 */
export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState("brief");

  const openModal = useCallback((nextTopic = "other") => {
    // guard against being handed a click event by mistake
    setTopic(typeof nextTopic === "string" ? nextTopic : "other");
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openModal, closeModal, topic, setTopic }),
    [isOpen, openModal, closeModal, topic]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ContactModal />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside <ModalProvider>");
  return ctx;
}

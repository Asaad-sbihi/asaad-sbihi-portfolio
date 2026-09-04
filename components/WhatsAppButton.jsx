import { SITE } from "@/lib/content";

/**
 * Fixed bottom-right WhatsApp launcher. Links straight to a wa.me chat
 * (never tel:), so it always opens WhatsApp with a pre-filled message —
 * never a phone-call prompt.
 */
export default function WhatsAppButton() {
  const message = "Bonjour Asaad, je vous contacte depuis votre portfolio.";
  const href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-fab"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.02 2C6.5 2 2.03 6.48 2.03 12c0 1.88.5 3.63 1.44 5.15L2 22l4.98-1.42A9.94 9.94 0 0 0 12.02 22C17.53 22 22 17.52 22 12S17.53 2 12.02 2Zm0 18.1c-1.7 0-3.29-.47-4.65-1.29l-.33-.2-3.11.89.9-3-.22-.34a8.07 8.07 0 0 1-1.28-4.36c0-4.5 3.68-8.16 8.2-8.16 4.51 0 8.19 3.66 8.19 8.16 0 4.5-3.68 8.3-8.2 8.3Z" />
        <path d="M17.47 14.38c-.29-.15-1.7-.84-1.96-.93-.26-.1-.46-.15-.65.14-.19.29-.75.93-.92 1.12-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.58-.9-2.16-.24-.58-.48-.5-.65-.51h-.56c-.19 0-.51.07-.78.36-.26.29-1.02 1-1.02 2.44s1.04 2.83 1.19 3.03c.15.19 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34Z" />
      </svg>
      <span>Chat on WhatsApp</span>
    </a>
  );
}

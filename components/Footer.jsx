import { SITE } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="foot">
      <span>© {new Date().getFullYear()} {SITE.name}</span>
      <span>Design + Motion + Code · Casablanca</span>
    </footer>
  );
}

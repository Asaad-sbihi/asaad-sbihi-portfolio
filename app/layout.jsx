import { Archivo, IBM_Plex_Mono, Inter } from "next/font/google";
import { ModalProvider } from "@/context/ModalContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE } from "@/lib/content";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const TITLE = `${SITE.name} — ${SITE.role}`;

export const metadata = {
  metadataBase: new URL("https://asaadsbihi.com"), // change to your real domain
  title: TITLE,
  description: SITE.tagline,
  openGraph: {
    title: TITLE,
    description: SITE.tagline,
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: SITE.tagline,
  },
};

export const viewport = {
  themeColor: "#0a4ea8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <ModalProvider>{children}</ModalProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}

import { Archivo, IBM_Plex_Mono, Inter } from "next/font/google";
import { ModalProvider } from "@/context/ModalContext";
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

export const metadata = {
  metadataBase: new URL("https://asaadsbihi.com"), // change to your real domain
  title: `${SITE.name} — ${SITE.role}`,
  description:
    "Full-Stack developer in Casablanca building intelligent web apps with React, Next.js, Laravel, Python and LLMs.",
  openGraph: {
    title: `${SITE.name} — ${SITE.role}`,
    description: "Intelligent web apps, built to scale.",
    type: "website",
    locale: "en_US",
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
      </body>
    </html>
  );
}

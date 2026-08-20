import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "JoDy's — Mime ivoirien entre potes",
  description:
    "WÊTAI, KÉCLÉ, EXPRESSION : le jeu de mime ivoirien à télécharger. Joue offline avec tes amis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${outfit.variable} ${syne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

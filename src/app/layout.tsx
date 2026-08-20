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
  title: "JoDy's \u2014 Mime ivoirien entre potes",
  description:
    "W\u00caTAI, K\u00c9CL\u00c9, EXPRESSION : le jeu de mime ivoirien \u00e0 t\u00e9l\u00e9charger. Joue offline avec tes amis.",
  openGraph: {
    title: "JoDy's \u2014 Mime ivoirien entre potes",
    description:
      "W\u00caTAI, K\u00c9CL\u00c9, EXPRESSION \u2014 mimes, \u00e9clats de rire et potes autour du t\u00e9l\u00e9phone.",
    images: [{ url: "/brand/cover-wetai.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${outfit.variable} ${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

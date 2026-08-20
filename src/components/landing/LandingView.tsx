import type { CSSProperties } from "react";
import Link from "next/link";
import { getDownloadLinks } from "@/lib/download";
import {
  MascotFloat,
  PhoneShowcase,
  StageBanner,
} from "@/components/landing/LandingFX";

const DECKS = [
  {
    id: "wetai",
    name: "WùTAI",
    tag: "Mots gùniaux",
    text: "Une minute pour mimer les mots qui font monter la salle.",
    cover: "/brand/cover-wetai.png",
    tone: "#C2185B",
    soft: "rgba(194,24,91,0.45)",
  },
  {
    id: "kecle",
    name: "KùCLù",
    tag: "Parler ivoirien",
    text: "Le nouchi en mime ù qui comprend, qui rit, qui gagne.",
    cover: "/brand/cover-kecle.png",
    tone: "#D4A017",
    soft: "rgba(166,124,82,0.5)",
  },
  {
    id: "expression",
    name: "EXPRESSION",
    tag: "Expressions locales",
    text: "Proverbes et formules du pays, rires garantis.",
    cover: "/brand/cover-expression.png",
    tone: "#26A69A",
    soft: "rgba(0,137,123,0.45)",
  },
] as const;

const STEPS = [
  {
    n: "01",
    title: "Lùadverse choisit",
    text: "Numùro 1, 2 ou 3 ù le mimeur ne voit rien encore.",
  },
  {
    n: "02",
    title: "Passe le tùlùphone",
    text: "Rituel soirùe : carte cachùe, mimeur prùt, salle en tension.",
  },
  {
    n: "03",
    title: "Mime ù vol ù bonus",
    text: "Une minute chrono, vols, bonus double ù le score sùenvole.",
  },
] as const;

export function LandingView() {
  const { apk, playStore, appStore } = getDownloadLinks();
  const hasPlay = Boolean(playStore);
  const hasIos = Boolean(appStore);

  return (
    <div className="landing">
      <div className="landing-noise" aria-hidden />
      <div className="landing-grid" aria-hidden />
      <div className="landing-aurora" aria-hidden />

      <header className="landing-nav">
        <a href="#top" className="nav-brand">
          JoDy&apos;s
        </a>
        <nav className="nav-links">
          <a href="#decks">Les jeux</a>
          <a href="#soirùe">La soirùe</a>
          <a href="#telecharger" className="nav-cta">
            Tùlùcharger
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="hero-eyebrow">Mime ivoirien ù 100 % offline</p>
            <h1 className="hero-title">
              <span className="hero-title-mark">JoDy&apos;s</span>
            </h1>
            <p className="hero-lead">
              WùTAI, KùCLù, EXPRESSION ù mimes, ùclats de rire et potes autour
              du tùlùphone.
            </p>
            <div id="telecharger" className="hero-actions">
              <a href={apk} className="btn-primary">
                Tùlùcharger l&apos;app (Android)
              </a>
              {hasPlay ? (
                <a href={playStore} className="btn-ghost">
                  Google Play
                </a>
              ) : null}
              {hasIos ? (
                <a href={appStore} className="btn-ghost">
                  App Store
                </a>
              ) : (
                <span className="hero-soon">
                  Play Store bientùt ù iOS plus tard
                </span>
              )}
            </div>
            <StageBanner />
          </div>

          <div className="hero-visual">
            <PhoneShowcase />
            <div className="mascot-wrap">
              <MascotFloat />
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden>
          <div className="marquee-track">
            {Array.from({ length: 2 }).map((_, loop) => (
              <span key={loop}>
                WùTAI ù KùCLù ù EXPRESSION ù VOL ù BONUS ù MIME ù OFFLINE ù{" "}
              </span>
            ))}
          </div>
        </div>

        <section id="decks" className="decks">
          <div className="section-head">
            <p className="section-kicker">Trois paquets ù une soirùe</p>
            <h2 className="section-title">Choisis ton ùnergie</h2>
          </div>
          <div className="deck-rail">
            {DECKS.map((deck) => (
              <article
                key={deck.id}
                className="deck-panel"
                style={
                  {
                    "--deck-tone": deck.tone,
                    "--deck-soft": deck.soft,
                  } as CSSProperties
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={deck.cover}
                  alt={`Pochette ${deck.name}`}
                  className="deck-cover"
                />
                <div className="deck-veil" />
                <div className="deck-body">
                  <p className="deck-tag">{deck.tag}</p>
                  <h3>{deck.name}</h3>
                  <p>{deck.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="soirùe" className="ritual">
          <div className="ritual-inner">
            <div className="section-head">
              <p className="section-kicker">Le flow</p>
              <h2 className="section-title">Une soirùe, un rituel</h2>
              <p className="section-sub">
                Passer le tùlùphone de main en main ù pas dùùcran partagù, juste
                la salle qui hurle.
              </p>
            </div>
            <ol className="ritual-steps">
              {STEPS.map((step) => (
                <li key={step.n}>
                  <span className="ritual-n">{step.n}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="download-band">
          <div className="download-band-inner">
            <h2>Prùt ù lancer la premiùre partie ?</h2>
            <p>
              Android dispo maintenant. Installe, crùe tes ùquipes, joue sans
              rùseau.
            </p>
            <a href={apk} className="btn-primary btn-primary--lg">
              Tùlùcharger JoDy&apos;s
            </a>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <span>ù {new Date().getFullYear()} JoDy&apos;s ù Ebabi</span>
        <Link href="/admin/login">Admin</Link>
      </footer>
    </div>
  );
}

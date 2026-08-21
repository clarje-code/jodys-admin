import type { CSSProperties } from "react";
import Link from "next/link";
import { getDownloadLinks } from "@/lib/download";
import { DeckOrbit } from "@/components/landing/DeckOrbit";
import {
  MascotFloat,
  PhoneShowcase,
  StageBanner,
} from "@/components/landing/LandingFX";

/** Accents via Unicode escapes (Windows-safe UTF-8 source). */
const t = {
  navSoiree: "La soir\u00e9e",
  navDl: "T\u00e9l\u00e9charger",
  eyebrow: "Mime ivoirien \u00b7 100 % offline",
  lead:
    "W\u00caTAI, K\u00c9CL\u00c9, EXPRESSION \u2014 mimes, \u00e9clats de rire et potes autour du t\u00e9l\u00e9phone.",
  ctaAndroid: "T\u00e9l\u00e9charger l'app (Android)",
  soon: "Play Store bient\u00f4t \u00b7 iOS plus tard",
  marquee:
    "W\u00caTAI \u00b7 K\u00c9CL\u00c9 \u00b7 EXPRESSION \u00b7 VOL \u00b7 BONUS \u00b7 MIME \u00b7 OFFLINE \u00b7 ",
  decksKicker: "Trois paquets \u00b7 une soir\u00e9e",
  decksTitle: "Choisis ton \u00e9nergie",
  ritualKicker: "Le flow",
  ritualTitle: "Une soir\u00e9e, un rituel",
  ritualSub:
    "Passer le t\u00e9l\u00e9phone de main en main \u2014 pas d'\u00e9cran partag\u00e9, juste la salle qui hurle.",
  dlTitle: "Pr\u00eat \u00e0 lancer la premi\u00e8re partie ?",
  dlBody:
    "Android dispo maintenant. Installe, cr\u00e9e tes \u00e9quipes, joue sans r\u00e9seau.",
  dlCta: "T\u00e9l\u00e9charger JoDy's",
  footerSep: " \u00b7 Ebabi",
};

const DECKS = [
  {
    id: "wetai",
    name: "W\u00caTAI",
    tag: "Mots g\u00e9niaux",
    text: "Une minute pour mimer les mots qui font monter la salle.",
    cover: "/brand/cover-wetai.png",
    tone: "#C2185B",
    soft: "rgba(194,24,91,0.45)",
  },
  {
    id: "kecle",
    name: "K\u00c9CL\u00c9",
    tag: "Parler ivoirien",
    text: "Le nouchi en mime \u2014 qui comprend, qui rit, qui gagne.",
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
    title: "L'adverse choisit",
    text: "Num\u00e9ro 1, 2 ou 3 \u2014 le mimeur ne voit rien encore.",
  },
  {
    n: "02",
    title: "Passe le t\u00e9l\u00e9phone",
    text: "Rituel soir\u00e9e : carte cach\u00e9e, mimeur pr\u00eat, salle en tension.",
  },
  {
    n: "03",
    title: "Mime \u00b7 vol \u00b7 bonus",
    text: "Une minute chrono, vols, bonus double \u2014 le score s'envole.",
  },
] as const;

export function LandingView() {
  const { apk, playStore, appStore } = getDownloadLinks();
  const hasPlay = Boolean(playStore);
  const hasIos = Boolean(appStore);
  const year = new Date().getFullYear();

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
          <a href="#soiree">{t.navSoiree}</a>
          <a href="#telecharger" className="nav-cta">
            {t.navDl}
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="hero-eyebrow">{t.eyebrow}</p>
            <h1 className="hero-title">
              <span className="hero-title-mark">JoDy&apos;s</span>
            </h1>
            <p className="hero-lead">{t.lead}</p>
            <div id="telecharger" className="hero-actions">
              <a href={apk} className="btn-primary">
                {t.ctaAndroid}
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
                <span className="hero-soon">{t.soon}</span>
              )}
            </div>
            <StageBanner />
          </div>

          <div className="hero-visual">
            <div className="hero-orbit-mobile">
              <DeckOrbit decks={DECKS} />
              <div className="mascot-wrap mascot-wrap--orbit">
                <MascotFloat />
              </div>
            </div>
            <div className="hero-phone-desktop">
              <PhoneShowcase />
              <div className="mascot-wrap">
                <MascotFloat />
              </div>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden>
          <div className="marquee-track">
            {Array.from({ length: 2 }).map((_, loop) => (
              <span key={loop}>{t.marquee}</span>
            ))}
          </div>
        </div>

        <section id="decks" className="decks">
          <div className="section-head">
            <p className="section-kicker">{t.decksKicker}</p>
            <h2 className="section-title">{t.decksTitle}</h2>
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

        <section id="soiree" className="ritual">
          <div className="ritual-inner">
            <div className="section-head">
              <p className="section-kicker">{t.ritualKicker}</p>
              <h2 className="section-title">{t.ritualTitle}</h2>
              <p className="section-sub">{t.ritualSub}</p>
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
            <h2>{t.dlTitle}</h2>
            <p>{t.dlBody}</p>
            <a href={apk} className="btn-primary btn-primary--lg">
              {t.dlCta}
            </a>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <span>
          {"\u00a9"} {year} JoDy&apos;s{t.footerSep}
        </span>
        <Link href="/admin/login">Admin</Link>
      </footer>
    </div>
  );
}

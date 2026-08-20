import Link from "next/link";
import { getDownloadLinks } from "@/lib/download";

export default function LandingPage() {
  const { apk, playStore, appStore } = getDownloadLinks();
  const hasPlay = Boolean(playStore);
  const hasIos = Boolean(appStore);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1A1208] text-[#FFF4E8]">
      <div
        aria-hidden
        className="bg-drift pointer-events-none absolute inset-0 opacity-90"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 15% 20%, rgba(194,24,91,0.35), transparent 55%),
            radial-gradient(ellipse 70% 50% at 90% 10%, rgba(212,160,23,0.22), transparent 50%),
            radial-gradient(ellipse 60% 45% at 70% 85%, rgba(0,137,123,0.28), transparent 55%),
            linear-gradient(165deg, #1A1208 0%, #2A1F14 45%, #1A1208 100%)
          `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-5 py-6">
        <span className="font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight">
          JoDy&apos;s
        </span>
        <a
          href="#telecharger"
          className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-[#FFF4E8]/80 transition hover:border-[#D4A017] hover:text-[#D4A017]"
        >
          Télécharger
        </a>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-5.5rem)] max-w-5xl flex-col justify-center px-5 pb-16 pt-6">
        <p className="animate-rise text-xs font-bold uppercase tracking-[0.28em] text-[#D4A017]">
          Mime ivoirien · offline
        </p>
        <h1 className="animate-rise-delay mt-4 max-w-3xl font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          JoDy&apos;s
        </h1>
        <p className="animate-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-[#C9B8A4] sm:text-xl">
          WÊTAI, KÉCLÉ, EXPRESSION — mimes, éclats de rire et potes autour du
          téléphone. Un jeu à passer de main en main.
        </p>

        <div
          id="telecharger"
          className="animate-rise-delay-2 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <a
            href={apk}
            className="cta-pulse inline-flex items-center justify-center rounded-2xl bg-[#C2185B] px-8 py-4 text-center text-base font-bold text-white transition hover:brightness-110"
          >
            Télécharger l&apos;app (Android)
          </a>
          {hasPlay ? (
            <a
              href={playStore}
              className="inline-flex items-center justify-center rounded-2xl border border-white/25 px-6 py-4 text-sm font-semibold hover:border-[#D4A017]"
            >
              Google Play
            </a>
          ) : null}
          {hasIos ? (
            <a
              href={appStore}
              className="inline-flex items-center justify-center rounded-2xl border border-white/25 px-6 py-4 text-sm font-semibold hover:border-[#D4A017]"
            >
              App Store
            </a>
          ) : (
            <span className="text-sm text-[#8A7A68]">
              Play Store bientôt · iOS plus tard
            </span>
          )}
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-3">
          <Feature
            tone="#C2185B"
            title="WÊTAI"
            text="Mots géniaux, une minute pour mimer."
          />
          <Feature
            tone="#A67C52"
            title="KÉCLÉ"
            text="Le parler ivoirien, en mime."
          />
          <Feature
            tone="#00897B"
            title="EXPRESSION"
            text="Expressions locales, rires garantis."
          />
        </ul>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-5 py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 text-xs text-[#8A7A68]">
          <span>© {new Date().getFullYear()} JoDy&apos;s · Ebabi</span>
          <Link
            href="/admin/login"
            className="hover:text-[#C9B8A4]"
          >
            Admin
          </Link>
        </div>
      </footer>
    </div>
  );
}

function Feature({
  title,
  text,
  tone,
}: {
  title: string;
  text: string;
  tone: string;
}) {
  return (
    <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      <div
        className="text-xs font-extrabold uppercase tracking-[0.2em]"
        style={{ color: tone }}
      >
        {title}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-[#C9B8A4]">{text}</p>
    </li>
  );
}

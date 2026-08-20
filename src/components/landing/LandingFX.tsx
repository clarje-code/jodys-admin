"use client";

import { useEffect, useState } from "react";

const BANNERS = ["VOL !", "BONUS DOUBLE", "TOUR SUIVANT", "1 MINUTE"] as const;
const COVERS = [
  { src: "/brand/cover-wetai.png", alt: "Pochette WÊTAI", tone: "#C2185B" },
  { src: "/brand/cover-kecle.png", alt: "Pochette KÉCLÉ", tone: "#A67C52" },
  { src: "/brand/cover-expression.png", alt: "Pochette EXPRESSION", tone: "#00897B" },
] as const;

export function StageBanner() {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setI((n) => (n + 1) % BANNERS.length);
        setVisible(true);
      }, 220);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={`stage-banner ${visible ? "is-on" : "is-off"}`}
      aria-live="polite"
    >
      {BANNERS[i]}
    </div>
  );
}

export function PhoneShowcase() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % COVERS.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  const cover = COVERS[i];

  return (
    <div className="phone-stage" aria-hidden>
      <div className="phone-glow" style={{ background: cover.tone }} />
      <div className="phone-frame">
        <div className="phone-notch" />
        {COVERS.map((c, idx) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={c.src}
            src={c.src}
            alt=""
            className={`phone-cover ${idx === i ? "is-active" : ""}`}
          />
        ))}
        <div className="phone-chrome">
          <span>JoDy&apos;s</span>
          <em style={{ color: cover.tone }}>{cover.alt.replace("Pochette ", "")}</em>
        </div>
      </div>
      <div className="phone-shadow" />
    </div>
  );
}

export function MascotFloat() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo.jpg"
      alt=""
      className="mascot-float"
      width={280}
      height={280}
    />
  );
}

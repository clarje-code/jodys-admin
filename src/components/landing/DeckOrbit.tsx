"use client";

import { useCallback, useEffect, useState } from "react";

export type OrbitDeck = {
  id: string;
  name: string;
  tag: string;
  cover: string;
  tone: string;
};

type Props = {
  decks: readonly OrbitDeck[];
};

export function DeckOrbit({ decks }: Props) {
  const [active, setActive] = useState(0);
  const len = decks.length;
  const current = decks[active] ?? decks[0];

  const go = useCallback(
    (index: number) => {
      if (len === 0) return;
      setActive(((index % len) + len) % len);
    },
    [len]
  );

  useEffect(() => {
    if (len < 2) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setActive((n) => (n + 1) % len);
    }, 3200);
    return () => window.clearInterval(id);
  }, [len]);

  if (!current) return null;

  return (
    <div className="deck-orbit" aria-roledescription="carousel">
      <div
        className="deck-orbit-glow"
        style={{ background: current.tone }}
        aria-hidden
      />
      <div className="deck-orbit-stage">
        {decks.map((deck, index) => {
          const isActive = index === active;
          return (
            <button
              key={deck.id}
              type="button"
              className={`deck-orbit-card ${isActive ? "is-active" : ""}`}
              onClick={() => go(index)}
              aria-label={deck.name}
              aria-current={isActive ? "true" : undefined}
              style={
                isActive
                  ? { borderColor: deck.tone, boxShadow: `0 16px 32px ${deck.tone}55` }
                  : undefined
              }
            >
              <span className="deck-orbit-notch" aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={deck.cover} alt="" draggable={false} />
            </button>
          );
        })}
      </div>
      <div className="deck-orbit-meta">
        <p className="deck-orbit-name" style={{ color: current.tone }}>
          {current.name}
        </p>
        <p className="deck-orbit-tag">{current.tag}</p>
      </div>
      <div className="deck-orbit-dots" role="tablist" aria-label="Jeux">
        {decks.map((deck, index) => (
          <button
            key={deck.id}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={`deck-orbit-dot ${index === active ? "is-on" : ""}`}
            style={
              index === active
                ? { background: deck.tone, borderColor: deck.tone }
                : undefined
            }
            onClick={() => go(index)}
            aria-label={deck.name}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type DeckFields = {
  id: string;
  name: string;
  tagline: string;
  primary: string;
  secondary: string;
  accent: string;
  ray: string;
  soft: string;
  mimeSeconds: number;
  stealSeconds: number;
  bonusStealSeconds: number;
  active: boolean;
};

export function DeckEditForm({ deck }: { deck: DeckFields }) {
  const router = useRouter();
  const [form, setForm] = useState(deck);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const save = async () => {
    setSaving(true);
    setMsg("");
    const res = await fetch(`/api/admin/decks/${deck.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (!res.ok) {
      setMsg("Erreur sauvegarde");
      return;
    }
    setMsg("Enregistré (pense à Publier)");
    router.refresh();
  };

  return (
    <div className="rounded-2xl border border-[#E4D5C3] bg-white p-5">
      <h2 className="text-lg font-black">Paramètres du deck</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {(
          [
            ["name", "Nom"],
            ["tagline", "Tagline"],
            ["primary", "Primary"],
            ["secondary", "Secondary"],
            ["accent", "Accent"],
            ["ray", "Ray"],
            ["soft", "Soft"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="text-sm font-semibold">
            {label}
            <input
              className="mt-1 w-full rounded-lg border border-[#E4D5C3] px-3 py-2 font-normal"
              value={String(form[key])}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </label>
        ))}
        {(
          [
            ["mimeSeconds", "Mime (s)"],
            ["stealSeconds", "Vol (s)"],
            ["bonusStealSeconds", "Bonus vol (s)"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="text-sm font-semibold">
            {label}
            <input
              type="number"
              className="mt-1 w-full rounded-lg border border-[#E4D5C3] px-3 py-2 font-normal"
              value={form[key]}
              onChange={(e) =>
                setForm({ ...form, [key]: Number(e.target.value) })
              }
            />
          </label>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-xl bg-[#1A1208] px-4 py-2 font-bold text-white disabled:opacity-50"
        >
          {saving ? "…" : "Enregistrer"}
        </button>
        {msg ? <span className="text-sm text-[#6B5B4D]">{msg}</span> : null}
      </div>
    </div>
  );
}

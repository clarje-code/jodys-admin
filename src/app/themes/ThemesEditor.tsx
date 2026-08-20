"use client";

import { useState } from "react";

type Theme = {
  id: string;
  label: string;
  defaultName: string;
  primary: string;
  secondary: string;
  picto: string;
  sortOrder: number;
};

export function ThemesEditor({ initial }: { initial: Theme[] }) {
  const [themes, setThemes] = useState(initial);
  const [msg, setMsg] = useState("");

  const save = async () => {
    const res = await fetch("/api/admin/themes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ themes }),
    });
    setMsg(res.ok ? "Enregistré" : "Erreur");
  };

  return (
    <div className="space-y-4">
      {themes.map((t, i) => (
        <div
          key={t.id}
          className="grid gap-2 rounded-xl border border-[#E4D5C3] p-3 sm:grid-cols-3"
        >
          <input
            className="rounded border border-[#E4D5C3] px-2 py-1"
            value={t.label}
            onChange={(e) => {
              const next = [...themes];
              next[i] = { ...next[i], label: e.target.value };
              setThemes(next);
            }}
          />
          <input
            className="rounded border border-[#E4D5C3] px-2 py-1"
            value={t.defaultName}
            onChange={(e) => {
              const next = [...themes];
              next[i] = { ...next[i], defaultName: e.target.value };
              setThemes(next);
            }}
          />
          <div className="flex gap-2">
            <input
              className="w-full rounded border border-[#E4D5C3] px-2 py-1"
              value={t.primary}
              onChange={(e) => {
                const next = [...themes];
                next[i] = { ...next[i], primary: e.target.value };
                setThemes(next);
              }}
            />
            <input
              className="w-full rounded border border-[#E4D5C3] px-2 py-1"
              value={t.secondary}
              onChange={(e) => {
                const next = [...themes];
                next[i] = { ...next[i], secondary: e.target.value };
                setThemes(next);
              }}
            />
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          className="rounded-xl bg-[#1A1208] px-4 py-2 font-bold text-white"
        >
          Enregistrer
        </button>
        {msg ? <span className="text-sm text-[#6B5B4D]">{msg}</span> : null}
      </div>
    </div>
  );
}

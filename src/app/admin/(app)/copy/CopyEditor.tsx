"use client";

import { useState } from "react";

export function CopyEditor({
  initial,
}: {
  initial: Array<{ key: string; value: string }>;
}) {
  const [rows, setRows] = useState(initial);
  const [msg, setMsg] = useState("");

  const save = async () => {
    const res = await fetch("/api/admin/copy", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entries: rows }),
    });
    setMsg(res.ok ? "Enregistré" : "Erreur");
  };

  return (
    <div className="space-y-3">
      {rows.map((r, i) => (
        <div key={r.key} className="grid gap-2 sm:grid-cols-[200px_1fr]">
          <input
            className="rounded-lg border border-[#E4D5C3] bg-[#FFF8F0] px-3 py-2 font-mono text-sm"
            value={r.key}
            onChange={(e) => {
              const next = [...rows];
              next[i] = { ...next[i], key: e.target.value };
              setRows(next);
            }}
          />
          <input
            className="rounded-lg border border-[#E4D5C3] px-3 py-2"
            value={r.value}
            onChange={(e) => {
              const next = [...rows];
              next[i] = { ...next[i], value: e.target.value };
              setRows(next);
            }}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => setRows([...rows, { key: "nouvelle_cle", value: "" }])}
        className="text-sm font-bold text-[#C2185B]"
      >
        + Ajouter une clé
      </button>
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

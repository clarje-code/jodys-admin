"use client";

import { useState } from "react";

export function PublishButton({ currentVersion }: { currentVersion: number }) {
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const publish = async () => {
    if (!confirm("Publier le catalogue pour l'app mobile ?")) return;
    setBusy(true);
    const res = await fetch("/api/admin/publish", { method: "POST" });
    setBusy(false);
    if (!res.ok) {
      setMsg("Erreur publication");
      return;
    }
    const data = (await res.json()) as { version: number };
    setMsg(`Publié v${data.version}`);
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        disabled={busy}
        onClick={publish}
        className="rounded-xl bg-[#C2185B] px-5 py-3 font-bold text-white disabled:opacity-50"
      >
        {busy ? "Publication…" : `Publier (actuel v${currentVersion})`}
      </button>
      {msg ? <span className="text-sm font-semibold">{msg}</span> : null}
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Slot = {
  index: number;
  label: string;
  definition: string | null;
  color: string;
  points: number;
};

type CardRow = {
  id: string;
  externalId: string;
  level: number;
  bonusLabel: string | null;
  bonusDefinition: string | null;
  active: boolean;
  slots: Slot[];
};

export function CardsManager({
  deckId,
  initialCards,
}: {
  deckId: string;
  initialCards: CardRow[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const addCard = async () => {
    setBusy(true);
    await fetch(`/api/admin/decks/${deckId}/cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level: 1,
        slots: [
          { label: "Mot 1", color: "black", points: 1 },
          { label: "Mot 2", color: "orange", points: 1 },
          { label: "Mot 3", color: "green", points: 3 },
        ],
      }),
    });
    setBusy(false);
    router.refresh();
  };

  const saveCard = async (card: CardRow) => {
    setBusy(true);
    await fetch(`/api/admin/cards/${card.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level: card.level,
        bonusLabel: card.bonusLabel,
        bonusDefinition: card.bonusDefinition,
        active: card.active,
        slots: card.slots.map((s) => ({
          index: s.index,
          label: s.label,
          definition: s.definition,
          color: s.color,
          points: s.points,
        })),
      }),
    });
    setBusy(false);
    router.refresh();
  };

  const removeCard = async (id: string) => {
    if (!confirm("Supprimer cette carte ?")) return;
    setBusy(true);
    await fetch(`/api/admin/cards/${id}`, { method: "DELETE" });
    setBusy(false);
    router.refresh();
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black">Cartes ({initialCards.length})</h2>
        <button
          type="button"
          disabled={busy}
          onClick={addCard}
          className="rounded-xl bg-[#C2185B] px-4 py-2 font-bold text-white"
        >
          + Ajouter une carte
        </button>
      </div>
      {initialCards.map((card) => (
        <CardEditor
          key={card.id}
          card={card}
          busy={busy}
          onSave={saveCard}
          onDelete={removeCard}
        />
      ))}
    </div>
  );
}

function CardEditor({
  card,
  busy,
  onSave,
  onDelete,
}: {
  card: CardRow;
  busy: boolean;
  onSave: (c: CardRow) => void;
  onDelete: (id: string) => void;
}) {
  const [draft, setDraft] = useState(card);

  return (
    <div className="rounded-2xl border border-[#E4D5C3] bg-white p-4">
      <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
        <span className="rounded bg-[#FFF8F0] px-2 py-1">{draft.externalId}</span>
        <label>
          Niveau{" "}
          <input
            type="number"
            min={1}
            max={3}
            className="ml-1 w-16 rounded border border-[#E4D5C3] px-2 py-1"
            value={draft.level}
            onChange={(e) =>
              setDraft({ ...draft, level: Number(e.target.value) })
            }
          />
        </label>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={draft.active}
            onChange={(e) => setDraft({ ...draft, active: e.target.checked })}
          />
          Active
        </label>
      </div>
      <div className="mt-3 grid gap-2 md:grid-cols-3">
        {draft.slots.map((s, i) => (
          <div key={i} className="rounded-lg border border-[#E4D5C3] p-2">
            <div className="text-xs font-bold uppercase text-[#6B5B4D]">
              Slot {i + 1}
            </div>
            <input
              className="mt-1 w-full rounded border border-[#E4D5C3] px-2 py-1 text-sm"
              value={s.label}
              onChange={(e) => {
                const slots = [...draft.slots];
                slots[i] = { ...slots[i], label: e.target.value };
                setDraft({ ...draft, slots });
              }}
            />
            <input
              className="mt-1 w-full rounded border border-[#E4D5C3] px-2 py-1 text-sm"
              placeholder="Définition"
              value={s.definition ?? ""}
              onChange={(e) => {
                const slots = [...draft.slots];
                slots[i] = {
                  ...slots[i],
                  definition: e.target.value || null,
                };
                setDraft({ ...draft, slots });
              }}
            />
            <div className="mt-1 flex gap-2">
              <select
                className="rounded border border-[#E4D5C3] px-2 py-1 text-sm"
                value={s.color}
                onChange={(e) => {
                  const slots = [...draft.slots];
                  slots[i] = { ...slots[i], color: e.target.value };
                  setDraft({ ...draft, slots });
                }}
              >
                <option value="black">black</option>
                <option value="orange">orange</option>
                <option value="green">green</option>
                <option value="red">red</option>
              </select>
              <input
                type="number"
                className="w-16 rounded border border-[#E4D5C3] px-2 py-1 text-sm"
                value={s.points}
                onChange={(e) => {
                  const slots = [...draft.slots];
                  slots[i] = { ...slots[i], points: Number(e.target.value) };
                  setDraft({ ...draft, slots });
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <input
          className="rounded border border-[#E4D5C3] px-2 py-1 text-sm"
          placeholder="Bonus label"
          value={draft.bonusLabel ?? ""}
          onChange={(e) =>
            setDraft({ ...draft, bonusLabel: e.target.value || null })
          }
        />
        <input
          className="rounded border border-[#E4D5C3] px-2 py-1 text-sm"
          placeholder="Bonus définition"
          value={draft.bonusDefinition ?? ""}
          onChange={(e) =>
            setDraft({ ...draft, bonusDefinition: e.target.value || null })
          }
        />
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => onSave(draft)}
          className="rounded-lg bg-[#1A1208] px-3 py-1.5 text-sm font-bold text-white"
        >
          Sauver
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => onDelete(card.id)}
          className="rounded-lg border border-red-300 px-3 py-1.5 text-sm font-bold text-red-700"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

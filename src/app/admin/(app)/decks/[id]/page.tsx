import Link from "next/link";
import { notFound } from "next/navigation";
import { CardsManager } from "@/components/CardsManager";
import { DeckEditForm } from "@/components/DeckEditForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DeckDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deck = await prisma.deck.findUnique({
    where: { id },
    include: {
      cards: {
        orderBy: { sortOrder: "asc" },
        include: { slots: { orderBy: { index: "asc" } } },
      },
    },
  });
  if (!deck) notFound();

  return (
    <>
      <Link
        href="/admin/decks"
        className="text-sm font-semibold text-[#C2185B]"
      >
        ← Decks
      </Link>
      <h1 className="mt-2 text-3xl font-black" style={{ color: deck.primary }}>
        {deck.name}
      </h1>
      <div className="mt-6">
        <DeckEditForm
          deck={{
            id: deck.id,
            name: deck.name,
            tagline: deck.tagline,
            primary: deck.primary,
            secondary: deck.secondary,
            accent: deck.accent,
            ray: deck.ray,
            soft: deck.soft,
            mimeSeconds: deck.mimeSeconds,
            stealSeconds: deck.stealSeconds,
            bonusStealSeconds: deck.bonusStealSeconds,
            active: deck.active,
          }}
        />
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-black">Cartes</h2>
        <div className="mt-4">
          <CardsManager deckId={deck.id} initialCards={deck.cards} />
        </div>
      </div>
    </>
  );
}

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { CardsManager } from "@/components/CardsManager";
import { DeckEditForm } from "@/components/DeckEditForm";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DeckDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireAdmin();
  if (!session) redirect("/login");

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
    <AdminShell>
      <Link href="/decks" className="text-sm font-semibold text-[#C2185B]">
        ? Decks
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
      <CardsManager
        deckId={deck.id}
        initialCards={deck.cards.map((c) => ({
          id: c.id,
          externalId: c.externalId,
          level: c.level,
          bonusLabel: c.bonusLabel,
          bonusDefinition: c.bonusDefinition,
          active: c.active,
          slots: c.slots.map((s) => ({
            index: s.index,
            label: s.label,
            definition: s.definition,
            color: s.color,
            points: s.points,
          })),
        }))}
      />
    </AdminShell>
  );
}

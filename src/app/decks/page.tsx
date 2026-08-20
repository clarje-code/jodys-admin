import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DecksPage() {
  const session = await requireAdmin();
  if (!session) redirect("/login");

  const decks = await prisma.deck.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { cards: true } } },
  });

  return (
    <AdminShell>
      <h1 className="text-3xl font-black">Decks</h1>
      <p className="mt-1 text-[#6B5B4D]">
        Couleurs, timers et cartes par jeu.
      </p>
      <div className="mt-6 grid gap-4">
        {decks.map((d) => (
          <Link
            key={d.id}
            href={`/decks/${d.id}`}
            className="flex items-center justify-between rounded-2xl border border-[#E4D5C3] bg-white p-5 hover:border-[#C2185B]"
          >
            <div>
              <div className="text-xl font-black" style={{ color: d.primary }}>
                {d.name}
              </div>
              <div className="text-sm text-[#6B5B4D]">{d.tagline}</div>
              <div className="mt-2 text-xs font-semibold text-[#6B5B4D]">
                Mime {d.mimeSeconds}s ù Vol {d.stealSeconds}s ù{" "}
                {d._count.cards} cartes
              </div>
            </div>
            <span className="font-bold text-[#C2185B]">ùditer ?</span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}

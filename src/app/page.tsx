import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await requireAdmin();
  if (!session) redirect("/login");

  const [decks, cards, latest] = await Promise.all([
    prisma.deck.count(),
    prisma.card.count({ where: { active: true } }),
    prisma.catalogPublish.findFirst({ orderBy: { version: "desc" } }),
  ]);

  return (
    <AdminShell>
      <h1 className="text-3xl font-black">Dashboard</h1>
      <p className="mt-1 text-[#6B5B4D]">
        Gestion du catalogue JoDy&apos;s —{" "}
        <span className="font-semibold text-[#C2185B]">
          jodys.ebabientreprise.com
        </span>
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Decks" value={String(decks)} />
        <Stat label="Cartes actives" value={String(cards)} />
        <Stat
          label="Version publiée"
          value={latest ? `v${latest.version}` : "aucune"}
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/decks"
          className="rounded-xl bg-[#C2185B] px-4 py-2.5 font-bold text-white"
        >
          Éditer les decks
        </Link>
        <Link
          href="/publish"
          className="rounded-xl border border-[#D9C7B0] bg-white px-4 py-2.5 font-bold"
        >
          Publier le catalogue
        </Link>
      </div>
    </AdminShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E4D5C3] bg-white p-5">
      <div className="text-xs font-bold uppercase tracking-wide text-[#6B5B4D]">
        {label}
      </div>
      <div className="mt-2 text-3xl font-black">{value}</div>
    </div>
  );
}

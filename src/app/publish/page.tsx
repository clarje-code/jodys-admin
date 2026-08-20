import { redirect } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PublishButton } from "./PublishButton";

export const dynamic = "force-dynamic";

export default async function PublishPage() {
  const session = await requireAdmin();
  if (!session) redirect("/login");

  const [latest, cards, decks] = await Promise.all([
    prisma.catalogPublish.findFirst({ orderBy: { version: "desc" } }),
    prisma.card.count({ where: { active: true } }),
    prisma.deck.count({ where: { active: true } }),
  ]);

  return (
    <AdminShell>
      <h1 className="text-3xl font-black">Publier</h1>
      <p className="mt-1 text-[#6B5B4D]">
        Cre un snapshot immuable consomm par l&apos;app Expo.
      </p>
      <div className="mt-6 rounded-2xl border border-[#E4D5C3] bg-white p-6">
        <ul className="space-y-1 text-sm font-semibold text-[#6B5B4D]">
          <li>Decks actifs : {decks}</li>
          <li>Cartes actives : {cards}</li>
          <li>
            Dernire version :{" "}
            {latest
              ? `v${latest.version} (${latest.publishedAt.toISOString()})`
              : "aucune"}
          </li>
        </ul>
        <div className="mt-6">
          <PublishButton currentVersion={latest?.version ?? 0} />
        </div>
        <p className="mt-4 text-xs text-[#6B5B4D]">
          Endpoint public :{" "}
          <code className="rounded bg-[#FFF8F0] px-1">GET /api/v1/catalog</code>
        </p>
      </div>
    </AdminShell>
  );
}

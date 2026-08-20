import { prisma } from "@/lib/prisma";
import { CopyEditor } from "./CopyEditor";

export const dynamic = "force-dynamic";

export default async function CopyPage() {
  const entries = await prisma.copyEntry.findMany({ orderBy: { key: "asc" } });
  return (
    <>
      <h1 className="text-3xl font-black">Textes UI</h1>
      <p className="mt-1 text-[#6B5B4D]">
        Clés / valeurs synchronisables vers l&apos;app (phase 2 catalogue).
      </p>
      <div className="mt-6 rounded-2xl border border-[#E4D5C3] bg-white p-5">
        <CopyEditor initial={entries} />
      </div>
    </>
  );
}

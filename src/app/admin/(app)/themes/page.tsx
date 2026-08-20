import { prisma } from "@/lib/prisma";
import { ThemesEditor } from "./ThemesEditor";

export const dynamic = "force-dynamic";

export default async function ThemesPage() {
  const themes = await prisma.teamTheme.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return (
    <>
      <h1 className="text-3xl font-black">Thèmes d&apos;équipes</h1>
      <p className="mt-1 text-[#6B5B4D]">Emblèmes et couleurs des équipes.</p>
      <div className="mt-6 rounded-2xl border border-[#E4D5C3] bg-white p-5">
        <ThemesEditor initial={themes} />
      </div>
    </>
  );
}

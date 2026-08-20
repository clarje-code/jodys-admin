import { redirect } from "next/navigation";
import { AdminShell } from "@/components/AdminShell";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ThemesEditor } from "./ThemesEditor";

export const dynamic = "force-dynamic";

export default async function ThemesPage() {
  const session = await requireAdmin();
  if (!session) redirect("/login");
  const themes = await prisma.teamTheme.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return (
    <AdminShell>
      <h1 className="text-3xl font-black">Thmes d&apos;quipes</h1>
      <p className="mt-1 text-[#6B5B4D]">Emblmes et couleurs des quipes.</p>
      <div className="mt-6 rounded-2xl border border-[#E4D5C3] bg-white p-5">
        <ThemesEditor initial={themes} />
      </div>
    </AdminShell>
  );
}

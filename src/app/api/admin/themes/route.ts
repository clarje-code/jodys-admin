import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  themes: z.array(
    z.object({
      id: z.string().min(1),
      label: z.string(),
      defaultName: z.string(),
      primary: z.string(),
      secondary: z.string(),
      picto: z.string(),
      sortOrder: z.number().int().optional(),
    })
  ),
});

export async function PUT(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = schema.parse(await req.json());
  for (const t of body.themes) {
    await prisma.teamTheme.upsert({
      where: { id: t.id },
      create: {
        id: t.id,
        label: t.label,
        defaultName: t.defaultName,
        primary: t.primary,
        secondary: t.secondary,
        picto: t.picto,
        sortOrder: t.sortOrder ?? 0,
      },
      update: {
        label: t.label,
        defaultName: t.defaultName,
        primary: t.primary,
        secondary: t.secondary,
        picto: t.picto,
        sortOrder: t.sortOrder,
      },
    });
  }
  return NextResponse.json({ ok: true });
}

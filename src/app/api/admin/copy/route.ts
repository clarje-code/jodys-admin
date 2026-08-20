import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  entries: z.array(
    z.object({
      key: z.string().min(1),
      value: z.string(),
    })
  ),
});

export async function PUT(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = schema.parse(await req.json());
  for (const e of body.entries) {
    await prisma.copyEntry.upsert({
      where: { key: e.key },
      create: e,
      update: { value: e.value },
    });
  }
  return NextResponse.json({ ok: true });
}

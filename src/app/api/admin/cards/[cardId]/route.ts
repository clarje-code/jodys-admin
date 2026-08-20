import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const patchSchema = z.object({
  level: z.number().int().min(1).max(3).optional(),
  bonusLabel: z.string().nullable().optional(),
  bonusDefinition: z.string().nullable().optional(),
  active: z.boolean().optional(),
  slots: z
    .array(
      z.object({
        index: z.number().int().min(0).max(2),
        label: z.string().min(1),
        definition: z.string().nullable().optional(),
        color: z.enum(["black", "orange", "green", "red"]),
        points: z.number().int(),
      })
    )
    .length(3)
    .optional(),
});

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ cardId: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { cardId } = await ctx.params;
  const body = patchSchema.parse(await req.json());

  if (body.slots) {
    for (const s of body.slots) {
      await prisma.cardSlot.update({
        where: { cardId_index: { cardId, index: s.index } },
        data: {
          label: s.label,
          definition: s.definition ?? null,
          color: s.color,
          points: s.points,
        },
      });
    }
  }

  const card = await prisma.card.update({
    where: { id: cardId },
    data: {
      level: body.level,
      bonusLabel: body.bonusLabel,
      bonusDefinition: body.bonusDefinition,
      active: body.active,
    },
    include: { slots: { orderBy: { index: "asc" } } },
  });

  return NextResponse.json(card);
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ cardId: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { cardId } = await ctx.params;
  await prisma.card.delete({ where: { id: cardId } });
  return NextResponse.json({ ok: true });
}

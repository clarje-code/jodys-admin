import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const slotSchema = z.object({
  label: z.string().min(1),
  definition: z.string().optional().nullable(),
  color: z.enum(["black", "orange", "green", "red"]),
  points: z.union([z.literal(1), z.literal(3), z.literal(5)]),
});

const cardSchema = z.object({
  externalId: z.string().min(1).optional(),
  level: z.number().int().min(1).max(3).default(1),
  bonusLabel: z.string().optional().nullable(),
  bonusDefinition: z.string().optional().nullable(),
  active: z.boolean().default(true),
  slots: z.tuple([slotSchema, slotSchema, slotSchema]),
});

export async function POST(
  req: Request,
  ctx: { params: Promise<{ deckId: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { deckId } = await ctx.params;
  const body = cardSchema.parse(await req.json());
  const count = await prisma.card.count({ where: { deckId } });
  const externalId =
    body.externalId ?? `${deckId}-${String(count + 1).padStart(3, "0")}`;

  const card = await prisma.card.create({
    data: {
      deckId,
      externalId,
      level: body.level,
      bonusLabel: body.bonusLabel ?? null,
      bonusDefinition: body.bonusDefinition ?? null,
      active: body.active,
      sortOrder: count + 1,
      slots: {
        create: body.slots.map((s, index) => ({
          index,
          label: s.label,
          definition: s.definition ?? null,
          color: s.color,
          points: s.points,
        })),
      },
    },
    include: { slots: true },
  });

  return NextResponse.json(card, { status: 201 });
}

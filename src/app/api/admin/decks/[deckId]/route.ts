import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(1).optional(),
  tagline: z.string().optional(),
  primary: z.string().optional(),
  secondary: z.string().optional(),
  accent: z.string().optional(),
  ray: z.string().optional(),
  soft: z.string().optional(),
  mimeSeconds: z.number().int().min(5).optional(),
  stealSeconds: z.number().int().min(5).optional(),
  bonusStealSeconds: z.number().int().min(5).optional(),
  active: z.boolean().optional(),
});

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ deckId: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { deckId } = await ctx.params;
  const body = schema.parse(await req.json());
  const deck = await prisma.deck.update({ where: { id: deckId }, data: body });
  return NextResponse.json(deck);
}

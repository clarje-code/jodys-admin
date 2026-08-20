import { PrismaClient, type Prisma } from "@prisma/client";

export type CatalogPayload = {
  version: number;
  publishedAt: string;
  decks: Array<{
    id: string;
    name: string;
    tagline: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      ray: string;
      soft: string;
    };
    timers: {
      mimeSeconds: number;
      stealSeconds: number;
      bonusStealSeconds: number;
    };
    cards: Array<{
      id: string;
      deck: string;
      level: number;
      slots: Array<{
        label: string;
        definition?: string;
        color: string;
        points: number;
      }>;
      bonus?: { label: string; definition?: string };
    }>;
  }>;
  copy: Record<string, string>;
  teamThemes: Array<{
    id: string;
    label: string;
    defaultName: string;
    primary: string;
    secondary: string;
    picto: string;
  }>;
};

export async function buildCatalogPayload(
  prisma: PrismaClient
): Promise<CatalogPayload> {
  const decks = await prisma.deck.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    include: {
      cards: {
        where: { active: true },
        orderBy: { sortOrder: "asc" },
        include: { slots: { orderBy: { index: "asc" } } },
      },
    },
  });
  const copyRows = await prisma.copyEntry.findMany();
  const themes = await prisma.teamTheme.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const copy: Record<string, string> = {};
  for (const row of copyRows) copy[row.key] = row.value;

  return {
    version: 0,
    publishedAt: new Date().toISOString(),
    decks: decks.map((d) => ({
      id: d.id,
      name: d.name,
      tagline: d.tagline,
      colors: {
        primary: d.primary,
        secondary: d.secondary,
        accent: d.accent,
        ray: d.ray,
        soft: d.soft,
      },
      timers: {
        mimeSeconds: d.mimeSeconds,
        stealSeconds: d.stealSeconds,
        bonusStealSeconds: d.bonusStealSeconds,
      },
      cards: d.cards.map((c) => ({
        id: c.externalId,
        deck: d.id,
        level: c.level,
        slots: c.slots.map((s) => ({
          label: s.label,
          definition: s.definition ?? undefined,
          color: s.color,
          points: s.points,
        })),
        bonus: c.bonusLabel
          ? {
              label: c.bonusLabel,
              definition: c.bonusDefinition ?? undefined,
            }
          : undefined,
      })),
    })),
    copy,
    teamThemes: themes.map((t) => ({
      id: t.id,
      label: t.label,
      defaultName: t.defaultName,
      primary: t.primary,
      secondary: t.secondary,
      picto: t.picto,
    })),
  };
}

export async function publishCatalog(
  prisma: PrismaClient,
  email: string | null
) {
  const latest = await prisma.catalogPublish.findFirst({
    orderBy: { version: "desc" },
  });
  const nextVersion = (latest?.version ?? 0) + 1;
  const payload = await buildCatalogPayload(prisma);
  payload.version = nextVersion;
  payload.publishedAt = new Date().toISOString();

  return prisma.catalogPublish.create({
    data: {
      version: nextVersion,
      payload: payload as unknown as Prisma.InputJsonValue,
      publishedByEmail: email,
    },
  });
}

export async function getLatestCatalog(prisma: PrismaClient) {
  return prisma.catalogPublish.findFirst({
    orderBy: { version: "desc" },
  });
}

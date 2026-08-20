import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

type SeedCard = {
  id: string;
  deck: string;
  level?: number;
  slots: Array<{
    label: string;
    definition?: string;
    color: string;
    points: number;
  }>;
  bonus?: { label: string; definition?: string };
};

const DECK_META = [
  {
    id: "wetai",
    name: "WùTAI",
    tagline: "1 minute pour mimer les mots gùniaux",
    primary: "#C2185B",
    secondary: "#F48FB1",
    accent: "#FFFFFF",
    ray: "#E91E63",
    soft: "#FCE4EC",
    mimeSeconds: 30,
    stealSeconds: 15,
    bonusStealSeconds: 10,
    sortOrder: 1,
  },
  {
    id: "kecle",
    name: "KùCLù",
    tagline: "1 minute pour mimer les mots ù l'ivoirienne",
    primary: "#5C3A1E",
    secondary: "#A67C52",
    accent: "#F5E6C8",
    ray: "#8B5E34",
    soft: "#F3E8DC",
    mimeSeconds: 30,
    stealSeconds: 15,
    bonusStealSeconds: 10,
    sortOrder: 2,
  },
  {
    id: "expression",
    name: "EXPRESSION",
    tagline: "1 minute pour mimer les expressions ù l'ivoirienne",
    primary: "#00695C",
    secondary: "#26A69A",
    accent: "#FFFFFF",
    ray: "#00897B",
    soft: "#E0F2F1",
    mimeSeconds: 60,
    stealSeconds: 30,
    bonusStealSeconds: 10,
    sortOrder: 3,
  },
] as const;

const TEAM_THEMES = [
  {
    id: "soleil",
    label: "Soleil",
    defaultName: "ùquipe Soleil",
    primary: "#E65100",
    secondary: "#FFB74D",
    picto: "sun",
    sortOrder: 1,
  },
  {
    id: "elephants",
    label: "ùlùphants",
    defaultName: "ùquipe ùlùphants",
    primary: "#5C3A1E",
    secondary: "#A67C52",
    picto: "elephant",
    sortOrder: 2,
  },
  {
    id: "cacao",
    label: "Cacao",
    defaultName: "ùquipe Cacao",
    primary: "#4E342E",
    secondary: "#8D6E63",
    picto: "food",
    sortOrder: 3,
  },
  {
    id: "lagune",
    label: "Lagune",
    defaultName: "ùquipe Lagune",
    primary: "#0277BD",
    secondary: "#4FC3F7",
    picto: "fish",
    sortOrder: 4,
  },
  {
    id: "goli",
    label: "Goli",
    defaultName: "ùquipe Goli",
    primary: "#6A1B9A",
    secondary: "#CE93D8",
    picto: "crown",
    sortOrder: 5,
  },
  {
    id: "attieke",
    label: "Attiùkù",
    defaultName: "ùquipe Attiùkù",
    primary: "#F9A825",
    secondary: "#FFF59D",
    picto: "pot",
    sortOrder: 6,
  },
];

const COPY_SEED: Record<string, string> = {
  startTimer: "Dùmarrer le timer",
  found: "Trouvù !",
  quit: "Quitter",
  launch: "Lancer la partie",
  ready: "Je suis prùt",
  bannerSteal: "VOL !",
  bannerBonus: "BONUS DOUBLE",
};

function loadDeckJson(name: string): SeedCard[] {
  const candidates = [
    path.join(__dirname, "..", "seed-data", `${name}.json`),
    path.join(__dirname, "..", "..", "jodys-app", "assets", "data", `${name}.json`),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, "utf8")) as SeedCard[];
    }
  }
  console.warn(`Missing seed JSON for ${name}`);
  return [];
}

async function main() {
  for (const d of DECK_META) {
    await prisma.deck.upsert({
      where: { id: d.id },
      create: { ...d },
      update: { ...d },
    });
  }

  for (const deckId of ["wetai", "kecle", "expression"] as const) {
    const cards = loadDeckJson(deckId);
    let order = 0;
    for (const c of cards) {
      order += 1;
      const card = await prisma.card.upsert({
        where: {
          deckId_externalId: { deckId, externalId: c.id },
        },
        create: {
          deckId,
          externalId: c.id,
          level: c.level ?? 1,
          bonusLabel: c.bonus?.label ?? null,
          bonusDefinition: c.bonus?.definition ?? null,
          sortOrder: order,
          active: true,
        },
        update: {
          level: c.level ?? 1,
          bonusLabel: c.bonus?.label ?? null,
          bonusDefinition: c.bonus?.definition ?? null,
          sortOrder: order,
          active: true,
        },
      });

      await prisma.cardSlot.deleteMany({ where: { cardId: card.id } });
      await prisma.cardSlot.createMany({
        data: c.slots.map((s, index) => ({
          cardId: card.id,
          index,
          label: s.label,
          definition: s.definition ?? null,
          color: s.color,
          points: s.points,
        })),
      });
    }
  }

  for (const t of TEAM_THEMES) {
    await prisma.teamTheme.upsert({
      where: { id: t.id },
      create: t,
      update: t,
    });
  }

  for (const [key, value] of Object.entries(COPY_SEED)) {
    await prisma.copyEntry.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
  }

  const existing = await prisma.catalogPublish.findFirst({
    orderBy: { version: "desc" },
  });
  if (!existing) {
    const { buildCatalogPayload } = await import("../src/lib/catalog");
    const payload = await buildCatalogPayload(prisma);
    await prisma.catalogPublish.create({
      data: {
        version: 1,
        payload,
        publishedByEmail: "seed@local",
      },
    });
  }

  console.log("Seed OK");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

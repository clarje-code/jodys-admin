-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "googleId" TEXT,
    "image" TEXT,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "primary" TEXT NOT NULL,
    "secondary" TEXT NOT NULL,
    "accent" TEXT NOT NULL,
    "ray" TEXT NOT NULL,
    "soft" TEXT NOT NULL,
    "mimeSeconds" INTEGER NOT NULL DEFAULT 30,
    "stealSeconds" INTEGER NOT NULL DEFAULT 15,
    "bonusStealSeconds" INTEGER NOT NULL DEFAULT 10,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "bonusLabel" TEXT,
    "bonusDefinition" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardSlot" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "definition" TEXT,
    "color" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "CardSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CopyEntry" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CopyEntry_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "TeamTheme" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "defaultName" TEXT NOT NULL,
    "primary" TEXT NOT NULL,
    "secondary" TEXT NOT NULL,
    "picto" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TeamTheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatalogPublish" (
    "id" SERIAL NOT NULL,
    "version" INTEGER NOT NULL,
    "payload" JSONB NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedByEmail" TEXT,

    CONSTRAINT "CatalogPublish_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_googleId_key" ON "AdminUser"("googleId");

-- CreateIndex
CREATE INDEX "Card_deckId_idx" ON "Card"("deckId");

-- CreateIndex
CREATE UNIQUE INDEX "Card_deckId_externalId_key" ON "Card"("deckId", "externalId");

-- CreateIndex
CREATE UNIQUE INDEX "CardSlot_cardId_index_key" ON "CardSlot"("cardId", "index");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogPublish_version_key" ON "CatalogPublish"("version");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardSlot" ADD CONSTRAINT "CardSlot_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

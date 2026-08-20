import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { publishCatalog } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await requireAdmin();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const pub = await publishCatalog(prisma, session.user.email);
  return NextResponse.json({ version: pub.version, publishedAt: pub.publishedAt });
}

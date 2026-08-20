import { NextResponse } from "next/server";
import { getLatestCatalog } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const latest = await getLatestCatalog(prisma);
  return NextResponse.json(
    { version: latest?.version ?? 0 },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=30",
      },
    }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
}

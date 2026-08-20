import { NextResponse } from "next/server";
import { getLatestCatalog } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const latest = await getLatestCatalog(prisma);
  if (!latest) {
    return NextResponse.json(
      { error: "No catalog published yet" },
      { status: 404 }
    );
  }
  return NextResponse.json(latest.payload, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=60",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

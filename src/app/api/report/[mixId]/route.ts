import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ mixId: string }> }
) {
  const { mixId } = await params;

  try {
    const report = await prisma.report.findFirst({
      where: { mixId },
      orderBy: { createdAt: "desc" },
    });

    if (!report) {
      return NextResponse.json({ message: "No report found" }, { status: 404 });
    }

    return NextResponse.json({ report });
  } catch (err) {
    console.error("Failed to fetch report", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { mixId, content } = await req.json();

    if (!mixId || !content) {
      return NextResponse.json(
        { error: "Missing mixId or content" },
        { status: 400 }
      );
    }

    const report = await prisma.report.create({
      data: {
        mixId,
        content,
      },
    });

    return NextResponse.json({ message: "Report saved", report });
  } catch (err) {
    console.error("Save report error:", err);
    return NextResponse.json(
      { error: "Failed to save report" },
      { status: 500 }
    );
  }
}

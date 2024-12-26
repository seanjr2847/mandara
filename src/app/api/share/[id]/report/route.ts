import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId, reason } = await request.json();
    const { id } = params;

    if (!userId || !reason) {
      return NextResponse.json(
        { error: "사용자 ID와 신고 사유가 필요합니다." },
        { status: 400 }
      );
    }

    const existingReport = await prisma.report.findFirst({
      where: {
        sharedMandalId: id,
        userId,
      },
    });

    if (existingReport) {
      return NextResponse.json(
        { error: "이미 신고한 만다라트입니다." },
        { status: 400 }
      );
    }

    const report = await prisma.report.create({
      data: {
        sharedMandalId: id,
        userId,
        reason,
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("신고 처리 실패:", error);
    return NextResponse.json(
      { error: "신고 처리에 실패했습니다." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const sharedMandal = await prisma.sharedMandal.findUnique({
      where: { id: params.id },
      include: { 
        mandal: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    if (!sharedMandal) {
      return NextResponse.json(
        { error: "공유된 만다라트를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 조회수 증가
    await prisma.sharedMandal.update({
      where: { id: params.id },
      data: {
        viewCount: { increment: 1 },
      },
    });

    return NextResponse.json({
      id: sharedMandal.id,
      mainGoal: sharedMandal.mandal.mainGoal,
      subGoals: sharedMandal.mandal.subGoals,
      subGoalDetails: sharedMandal.mandal.subGoalDetails,
      createdAt: sharedMandal.createdAt.toISOString(),
      theme: sharedMandal.theme,
      font: sharedMandal.font,
      likeCount: sharedMandal._count.likes,
      viewCount: sharedMandal.viewCount + 1, // 방금 증가한 조회수 반영
    });
  } catch (error) {
    console.error("Error fetching shared mandal:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

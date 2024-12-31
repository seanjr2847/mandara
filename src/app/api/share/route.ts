import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const { mainGoal, subGoals, subGoalDetails } = await req.json();

    if (!mainGoal || !subGoals || !subGoalDetails) {
      return NextResponse.json(
        { success: false, error: "필수 데이터가 누락되었습니다." },
        { status: 400 }
      );
    }

    const mandal = await prisma.mandal.create({
      data: {
        authorId: session.user.id,
        mainGoal,
        subGoals: JSON.stringify(subGoals),
        subGoalDetails: JSON.stringify(subGoalDetails),
      },
    });

    const sharedMandal = await prisma.sharedMandal.create({
      data: {
        mandalId: mandal.id,
        authorName: session.user.name || "익명",
        theme: "light",
        font: "default",
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      success: true,
      id: sharedMandal.id,
    });
  } catch (error) {
    console.error("Error sharing mandal:", error);
    return NextResponse.json(
      { success: false, error: "Failed to share mandal" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params?: { id?: string } } = {}
) {
  try {
    // 특정 만다라트 조회
    if (params?.id) {
      const mandal = await prisma.mandal.findUnique({
        where: { id: params.id },
        include: {
          SharedMandal: true,
        },
      });

      if (!mandal) {
        return NextResponse.json({ success: false, error: "Mandal not found" });
      }

      return NextResponse.json({
        success: true,
        mandal: {
          id: mandal.id,
          mainGoal: mandal.mainGoal,
          subGoals: mandal.subGoals,
          subGoalDetails: mandal.subGoalDetails,
          createdAt: mandal.createdAt.toISOString(),
          likeCount: mandal.SharedMandal?.[0]?.likeCount || 0,
          viewCount: mandal.SharedMandal?.[0]?.viewCount || 0,
        },
      });
    }

    // 만다라트 목록 조회
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor");
    const limit = 12;

    const items = await prisma.sharedMandal.findMany({
      take: limit,
      ...(cursor && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),
      include: {
        mandal: {
          select: {
            mainGoal: true,
          },
        },
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const nextCursor = items.length === limit ? items[items.length - 1].id : null;

    const processedItems = items.map((item) => ({
      id: item.id,
      mainGoal: item.mandal.mainGoal,
      authorName: item.authorName,
      viewCount: item.viewCount,
      likeCount: item.likes.length,
      theme: item.theme,
      createdAt: item.createdAt.toISOString(),
    }));

    return NextResponse.json({
      items: processedItems,
      nextCursor,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

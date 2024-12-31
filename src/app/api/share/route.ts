import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { mainGoal, subGoals, subGoalDetails } = await req.json();

    if (!mainGoal || !subGoals || !subGoalDetails) {
      return NextResponse.json(
        { success: false, error: "필수 데이터가 누락되었습니다." },
        { status: 400 }
      );
    }

    const mandal = await prisma.mandal.create({
      data: {
        mainGoal,
        subGoals: JSON.stringify(subGoals),
        subGoalDetails: JSON.stringify(subGoalDetails),
        author: session?.user?.name || "익명",
      },
    });

    const sharedMandal = await prisma.sharedMandal.create({
      data: {
        mandalId: mandal.id,
        authorName: session?.user?.name || "익명",
        theme: "light",
        font: "default",
        userId: session?.user?.id || null,
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

export async function GET(request: NextRequest) {
  try {
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

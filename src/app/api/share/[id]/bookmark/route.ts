import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await request.json();
    const { id } = params;

    if (!userId) {
      return NextResponse.json(
        { error: "사용자 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        sharedMandalId: id,
        userId,
      },
    });

    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: {
          id: existingBookmark.id,
        },
      });
      return NextResponse.json({ bookmarked: false });
    }

    await prisma.bookmark.create({
      data: {
        sharedMandalId: id,
        userId,
      },
    });

    return NextResponse.json({ bookmarked: true });
  } catch (error) {
    console.error("북마크 처리 실패:", error);
    return NextResponse.json(
      { error: "북마크 처리에 실패했습니다." },
      { status: 500 }
    );
  }
}

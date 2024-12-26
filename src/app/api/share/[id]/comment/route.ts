import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId, content } = await request.json();
    const { id } = params;

    if (!userId || !content) {
      return NextResponse.json(
        { error: "사용자 ID와 댓글 내용이 필요합니다." },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        sharedMandalId: id,
        userId,
        content,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("댓글 작성 실패:", error);
    return NextResponse.json(
      { error: "댓글 작성에 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const comments = await prisma.comment.findMany({
      where: {
        sharedMandalId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("댓글 조회 실패:", error);
    return NextResponse.json(
      { error: "댓글 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}

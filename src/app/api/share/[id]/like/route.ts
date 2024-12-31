import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "로그인이 필요합니다.", liked: false },
        { status: 401 }
      );
    }

    const mandalId = params.id;
    const userId = session.user.id;

    const existingLike = await prisma.like.findUnique({
      where: {
        mandalId_userId: {
          mandalId,
          userId,
        },
      },
    });

    return NextResponse.json({
      liked: !!existingLike,
    });
  } catch (error) {
    console.error("좋아요 상태 확인 중 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다.", liked: false },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const mandalId = params.id;
    const userId = session.user.id;

    // 이미 좋아요를 눌렀는지 확인
    const existingLike = await prisma.like.findUnique({
      where: {
        mandalId_userId: {
          mandalId,
          userId,
        },
      },
    });

    // 트랜잭션으로 좋아요 처리
    if (existingLike) {
      // 이미 좋아요를 눌렀다면 취소
      await prisma.$transaction([
        prisma.like.delete({
          where: {
            mandalId_userId: {
              mandalId,
              userId,
            },
          },
        }),
        prisma.sharedMandal.update({
          where: { id: mandalId },
          data: {
            likeCount: {
              decrement: 1,
            },
          },
        }),
      ]);

      return NextResponse.json({ liked: false });
    } else {
      // 좋아요 추가
      await prisma.$transaction([
        prisma.like.create({
          data: {
            sharedMandal: {
              connect: {
                id: mandalId,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
          },
        }),
        prisma.sharedMandal.update({
          where: { id: mandalId },
          data: {
            likeCount: {
              increment: 1,
            },
          },
        }),
      ]);

      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error("좋아요 처리 중 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

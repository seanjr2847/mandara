import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, description, subGoals } = await req.json();

    // 임시로 고정된 사용자 ID 사용 (나중에 인증 구현 시 실제 사용자 ID로 대체)
    const userId = "temp-user-id";

    const goal = await prisma.goal.create({
      data: {
        title,
        description,
        userId,
        subGoals: {
          create: subGoals.map((subGoal: string) => ({
            title: subGoal,
            description: "",
          })),
        },
      },
      include: {
        subGoals: true,
      },
    });

    return NextResponse.json(goal);
  } catch (error) {
    console.error("Error creating goal:", error);
    return NextResponse.json(
      { error: "목표 저장 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // 임시로 고정된 사용자 ID 사용
    const userId = "temp-user-id";

    const goals = await prisma.goal.findMany({
      where: {
        userId,
      },
      include: {
        subGoals: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    return NextResponse.json(
      { error: "목표 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

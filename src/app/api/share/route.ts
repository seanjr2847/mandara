import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { validateMandal } from "@/types/mandal";
import type { Mandal } from "@/types/mandal";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validation = validateMandal(data);
    
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // 데이터 정제
    const mandalData: Mandal = {
      mainGoal: data.mainGoal.trim(),
      subGoals: data.subGoals.map((goal: string) => goal.trim()),
      subGoalDetails: data.subGoalDetails.map((detail: { title?: string; tasks: string[] }) => ({
        title: detail.title?.trim() || "",
        tasks: detail.tasks.map((task: string) => task.trim())
      })),
      author: data.author?.trim(),
      createdAt: new Date()
    };

    const mandal = await prisma.mandal.create({
      data: {
        mainGoal: mandalData.mainGoal,
        subGoals: JSON.stringify(mandalData.subGoals),
        subGoalDetails: JSON.stringify(mandalData.subGoalDetails),
        author: mandalData.author || null,
        createdAt: mandalData.createdAt,
      },
    });

    return NextResponse.json({ id: mandal.id });
  } catch (error) {
    console.error("만다라트 저장 실패:", error);
    return NextResponse.json(
      { error: "만다라트 저장에 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID가 필요합니다." },
        { status: 400 }
      );
    }

    const mandal = await prisma.mandal.findUnique({
      where: { id },
    });

    if (!mandal) {
      return NextResponse.json(
        { error: "만다라트를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    try {
      // JSON 파싱 오류 처리
      const subGoals = JSON.parse(mandal.subGoals);
      const subGoalDetails = JSON.parse(mandal.subGoalDetails);

      const validation = validateMandal({
        mainGoal: mandal.mainGoal,
        subGoals,
        subGoalDetails
      });

      if (!validation.isValid) {
        return NextResponse.json(
          { error: "저장된 만다라트 데이터가 유효하지 않습니다." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        ...mandal,
        subGoals,
        subGoalDetails,
      });
    } catch (parseError) {
      console.error("만다라트 데이터 파싱 실패:", parseError);
      return NextResponse.json(
        { error: "저장된 만다라트 데이터가 손상되었습니다." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("만다라트 조회 실패:", error);
    return NextResponse.json(
      { error: "만다라트 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}

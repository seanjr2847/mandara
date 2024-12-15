import { NextResponse } from "next/server";
import { generateGoalRecommendations } from "@/lib/claude";

export async function POST(req: Request) {
  try {
    const { mainGoal, isSubGoal = false } = await req.json();

    if (!mainGoal?.trim()) {
      return NextResponse.json(
        { error: "목표가 입력되지 않았습니다." },
        { status: 400 }
      );
    }

    const recommendations = await generateGoalRecommendations(mainGoal, isSubGoal);

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("Error in recommendation:", error);
    return NextResponse.json(
      { error: "목표 추천 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

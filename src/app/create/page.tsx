"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/client";
import { useMandalStore } from "@/store/mandal";
import { useState } from "react";
import { CreateCoachMark } from "@/components/onboarding/create-coach-mark";

export default function CreatePage() {
  const router = useRouter();
  const { mainGoal, setMainGoal, setSubGoals, setSubGoalDetails } = useMandalStore();
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (!mainGoal.trim()) {
      alert("메인 목표를 입력해주세요");
      return;
    }
    router.push("/create/sub-goals");
  };

  const generateFullMandal = async () => {
    if (!mainGoal.trim()) {
      alert("메인 목표를 입력해주세요");
      return;
    }

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mainGoal,
          isSubGoal: false
        }),
      });

      const result = await response.json();
      if (!result.recommendations) {
        throw new Error("Failed to generate recommendations");
      }

      const subGoals = result.recommendations.slice(0, 8);
      const subGoalDetails = await Promise.all(
        subGoals.map(async (goal: string) => {
          const detailResponse = await fetch("/api/recommend", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mainGoal: goal,
              isSubGoal: true
            }),
          });
          const detailResult = await detailResponse.json();
          return {
            title: goal,
            tasks: detailResult.recommendations.slice(0, 8)
          };
        })
      );

      setSubGoals(subGoals);
      setSubGoalDetails(subGoalDetails);
      
      alert("만다라트가 생성되었습니다");
      
      router.push("/result");
    } catch (err) {
      console.error(err);
      alert("생성 실패");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-center">메인 목표 작성</h1>
          <p className="text-gray-600 text-center">
            달성하고자 하는 메인 목표를 입력해주세요.
          </p>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="메인 목표를 입력하세요"
              value={mainGoal}
              onChange={(e) => setMainGoal(e.target.value)}
              className="main-goal-input w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <div className="flex justify-between space-x-4">
            <Button
              variant="outline"
              onClick={generateFullMandal}
              className="ai-recommendation flex-1"
            >
              AI 추천받기
            </Button>

            <Button
              onClick={handleNext}
              className="next-button flex-1"
              disabled={!mainGoal.trim()}
            >
              다음 단계
            </Button>
          </div>
        </div>
      </div>
      <CreateCoachMark />
    </div>
  );
}

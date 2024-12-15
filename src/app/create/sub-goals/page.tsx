"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMandalStore } from "@/store/mandal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SubGoalsPage() {
  const router = useRouter();
  const { mainGoal, subGoals, setSubGoal } = useMandalStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!mainGoal.trim()) {
      router.push("/create");
    }
  }, [mainGoal, router]);

  const handleNext = () => {
    const emptyGoals = subGoals.filter(goal => !goal.trim()).length;
    if (emptyGoals > 0) {
      alert("모든 세부 목표를 입력해주세요.");
      return;
    }
    router.push("/create/detail");
  };

  const handleAIRecommendation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mainGoal }),
      });

      if (!response.ok) throw new Error("추천 받기에 실패했습니다.");

      const data = await response.json();
      data.recommendations.forEach((goal: string, index: number) => {
        setSubGoal(index, goal);
      });
    } catch (error) {
      console.error("Error getting recommendations:", error);
      alert("목표 추천 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">세부 목표 설정</h1>
          <p className="text-slate-400">
            &ldquo;{mainGoal}&rdquo;를 이루기 위한 8가지 세부 목표를 입력해주세요.
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleAIRecommendation}
            disabled={isLoading}
          >
            {isLoading ? "AI가 분석중..." : "AI 추천받기"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subGoals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <label className="block font-medium">
                세부 목표 {index + 1}
              </label>
              <Input
                value={goal}
                onChange={(e) => setSubGoal(index, e.target.value)}
                placeholder={`&ldquo;세부 목표&rdquo;를 입력해주세요`}
                className="text-lg py-6"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/create")}
          >
            이전으로
          </Button>
          <Button
            size="lg"
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={handleNext}
          >
            다음 단계로
          </Button>
        </div>
      </div>
    </div>
  );
}

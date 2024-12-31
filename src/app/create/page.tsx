"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMandalStore } from "@/store/mandal";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePage() {
  const router = useRouter();
  const { mainGoal, setMainGoal, setSubGoals, setSubGoalDetails } = useMandalStore();
  const [isGenerating, setIsGenerating] = useState(false);

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

    setIsGenerating(true);
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
    } finally {
      setIsGenerating(false);
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
            <Input
              type="text"
              placeholder="메인 목표를 입력하세요"
              value={mainGoal}
              onChange={(e) => setMainGoal(e.target.value)}
              className="text-lg py-6 text-center"
            />
          </div>

          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 rounded-full text-lg"
              onClick={handleNext}
            >
              직접 작성하기
            </Button>
            <Button 
              size="lg"
              variant="secondary"
              className="px-8 py-6 rounded-full text-lg"
              onClick={generateFullMandal}
              disabled={isGenerating}
            >
              {isGenerating ? "AI가 생성 중..." : "AI로 전체 생성하기"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

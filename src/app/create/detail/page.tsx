"use client";

import { Button } from "@/components/ui/button";
import { GoalInput } from "@/components/create/goal-input";
import { MandalPreview } from "@/components/create/mandal-preview";
import { useMandalStore } from "@/store/mandal";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DetailPage() {
  const router = useRouter();
  const {
    subGoals,
    subGoalDetails,
    currentSubGoalIndex,
    setSubGoalTasks,
    setCurrentSubGoalIndex,
    getCurrentSubGoal
  } = useMandalStore();
  
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentSubGoal = getCurrentSubGoal();

  const handleTaskChange = (index: number, value: string) => {
    if (!currentSubGoal) return;
    const newTasks = [...currentSubGoal.tasks];
    newTasks[index] = value;
    setSubGoalTasks(currentSubGoalIndex, newTasks);
  };

  const handleAIRecommendation = async () => {
    const currentGoal = subGoals[currentSubGoalIndex];
    if (!currentGoal?.trim()) {
      alert("세부 목표가 비어있습니다.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mainGoal: currentGoal,
          isSubGoal: true,
        }),
      });

      if (!response.ok) throw new Error("추천 받기에 실패했습니다.");

      const data = await response.json();
      setSubGoalTasks(currentSubGoalIndex, data.recommendations);
    } catch (error) {
      console.error("Error getting recommendations:", error);
      alert("목표 추천 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    const currentGoal = subGoals[currentSubGoalIndex];
    if (!currentGoal?.trim()) {
      alert("세부 목표를 입력해주세요.");
      return;
    }

    const currentTasks = currentSubGoal.tasks;
    const emptyTasks = currentTasks.filter(task => !task.trim()).length;
    if (emptyTasks > 0) {
      alert("모든 하위 목표를 입력해주세요.");
      return;
    }

    if (currentSubGoalIndex < 7) {
      setCurrentSubGoalIndex(currentSubGoalIndex + 1);
    } else {
      router.push("/result");
    }
  };

  const isAllSubGoalsCompleted = subGoals.every(
    (goal, index) => 
      goal.trim() && 
      subGoalDetails[index]?.tasks?.every((task) => task.trim())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 페이지 타이틀 */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">세부 목표 상세 설정</h1>
          <p className="text-slate-400">
            각 세부 목표에 대한 하위 목표를 설정해주세요
          </p>
        </div>

        {/* 세부 목표 선택 */}
        <div className="flex flex-wrap justify-center gap-2">
          {subGoals.map((goal, index) => {
            const isComplete = subGoalDetails[index].tasks.every((task) => task.trim());
            return (
              <Button
                key={index}
                variant={currentSubGoalIndex === index ? "default" : "outline"}
                className={cn(
                  "px-4 py-2 rounded-full",
                  isComplete && "border-green-500 text-green-500",
                  currentSubGoalIndex === index && "bg-red-500 hover:bg-red-600 text-white border-transparent"
                )}
                onClick={() => setCurrentSubGoalIndex(index)}
              >
                {index + 1}. {goal.slice(0, 10)}{goal.length > 10 ? "..." : ""}
                {isComplete && " "}
              </Button>
            )
          })}
        </div>

        {/* 현재 세부 목표 */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-200">
            {currentSubGoalIndex + 1}. {subGoals[currentSubGoalIndex]}
          </h2>
        </div>

        {/* AI 추천 및 미리보기 버튼 */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg"
            onClick={handleAIRecommendation}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>AI가 목표를 분석중...</span>
              </div>
            ) : (
              "AI 하위목표 추천받기"
            )}
          </Button>
          <Button
            variant="outline"
            className="px-8 py-6 rounded-full text-lg"
            onClick={() => setIsPreviewOpen(true)}
          >
            만다라트 미리보기
          </Button>
        </div>

        {/* 하위 목표 입력 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(currentSubGoal?.tasks || []).map((task, index) => (
            <GoalInput
              key={index}
              label={`하위 목표 ${index + 1}`}
              value={task}
              onChange={(value) => handleTaskChange(index, value)}
              placeholder={`하위 목표 ${index + 1}을 입력해주세요`}
            />
          ))}
        </div>

        {/* 이전/다음 버튼 */}
        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 rounded-full text-lg"
            onClick={() => router.push("/create/sub-goals")}
          >
            이전 단계로
          </Button>
          {isAllSubGoalsCompleted ? (
            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 rounded-full text-lg"
              onClick={() => router.push("/result")}
            >
              완료
            </Button>
          ) : (
            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 rounded-full text-lg"
              onClick={handleNext}
            >
              다음 단계로
            </Button>
          )}
        </div>
      </div>

      {/* 미리보기 다이얼로그 */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[800px] bg-slate-900 border-slate-700">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">하위 목표 미리보기</h2>
            <MandalPreview
              mainGoal={currentSubGoal.title}
              subGoals={currentSubGoal.tasks}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

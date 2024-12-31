"use client";

import { cn } from "@/lib/utils";
import { Cell } from "./cell";

interface FullMandalProps {
  mainGoal: string;
  subGoals: string[];
  subGoalDetails: { title: string; tasks: string[] }[];
  className?: string;
}

export function FullMandal({
  mainGoal = "",
  subGoals = Array(8).fill(""),
  subGoalDetails = Array(8).fill({ title: "", tasks: Array(8).fill("") }),
  className
}: FullMandalProps) {
  const handleCellClick = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  const renderSection = (sectionRow: number, sectionCol: number) => {
    const sectionIndex = sectionRow * 3 + sectionCol;
    const isCenter = sectionRow === 1 && sectionCol === 1;
    
    return (
      <div key={`section-${sectionRow}-${sectionCol}`} className="grid grid-cols-3 gap-0.5 bg-gray-700 p-0.5 rounded">
        {Array(9)
          .fill(null)
          .map((_, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            let text = "";

            if (isCenter) {
              // 중앙 섹션
              if (row === 1 && col === 1) {
                // 중앙 목표
                text = mainGoal;
              } else {
                // 8개의 서브 목표
                const subGoalIndex = (() => {
                  const positions = [
                    [0, 1], [1, 0], [1, 2], [2, 1], // 상하좌우
                    [0, 0], [0, 2], [2, 0], [2, 2]  // 대각선
                  ];
                  const idx = positions.findIndex(([r, c]) => r === row && c === col);
                  return idx !== -1 ? idx : -1;
                })();
                text = subGoalIndex !== -1 ? subGoals[subGoalIndex] : "";
              }
            } else {
              // 주변 섹션
              if (row === 1 && col === 1) {
                // 각 섹션의 중앙 (서브 목표)
                text = subGoals[sectionIndex] || "";
              } else {
                // 세부 목표
                const subDetail = subGoalDetails[sectionIndex];
                if (subDetail?.tasks) {
                  const taskIndex = (() => {
                    const positions = [
                      [0, 0], [0, 1], [0, 2],
                      [1, 0],         [1, 2],
                      [2, 0], [2, 1], [2, 2]
                    ];
                    const idx = positions.findIndex(([r, c]) => r === row && c === col);
                    return idx;
                  })();
                  text = taskIndex !== -1 ? (subDetail.tasks[taskIndex] || "") : "";
                }
              }
            }

            return (
              <Cell
                key={`cell-${row}-${col}`}
                text={text}
                className={cn(
                  "border border-gray-200 text-black",
                  isCenter && row === 1 && col === 1 && "bg-amber-100 font-bold text-base",
                  !isCenter && row === 1 && col === 1 && "bg-sky-100 font-semibold",
                  "bg-white hover:bg-gray-100 transition-colors"
                )}
                onClick={handleCellClick}
              />
            );
          })}
      </div>
    );
  };

  return (
    <div className={cn("grid grid-cols-3 gap-1 bg-gray-800 p-1 rounded-lg w-full max-w-6xl mx-auto", className)}>
      {Array(9)
        .fill(null)
        .map((_, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          return renderSection(row, col);
        })}
    </div>
  );
}

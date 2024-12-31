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
    
    // 중앙 섹션의 서브골 매핑
    const centerSubGoalMapping = [
      [7, 0, 1],
      [6, -1, 2],
      [5, 4, 3]
    ];

    // 세부 목표 매핑 (중앙을 제외한 8칸)
    const detailTaskMapping = [
      [0, 1, 2],
      [7, -1, 3],
      [6, 5, 4]
    ];
    
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
                text = mainGoal;
              } else {
                const mappedIndex = centerSubGoalMapping[row][col];
                if (mappedIndex !== -1) {
                  text = subGoals[mappedIndex] || "";
                }
              }
            } else {
              // 주변 섹션
              if (row === 1 && col === 1) {
                text = subGoals[sectionIndex] || "";
              } else {
                const subDetail = subGoalDetails[sectionIndex];
                if (subDetail?.tasks) {
                  const mappedIndex = detailTaskMapping[row][col];
                  if (mappedIndex !== -1) {
                    text = subDetail.tasks[mappedIndex] || "";
                  }
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

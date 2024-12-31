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
  console.log('FullMandal props:', {
    mainGoal,
    subGoals,
    subGoalDetails
  });

  const handleCellClick = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  const renderSection = (sectionRow: number, sectionCol: number) => {
    const sectionIndex = sectionRow * 3 + sectionCol;
    const isCenter = sectionRow === 1 && sectionCol === 1;
    
    console.log(`Rendering section [${sectionRow}, ${sectionCol}]:`, {
      sectionIndex,
      isCenter
    });

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
                // 8개의 서브 목표를 시계 방향으로 배치
                const positions = [
                  { row: 0, col: 1, index: 0 }, // 상
                  { row: 0, col: 2, index: 1 }, // 상우
                  { row: 1, col: 2, index: 2 }, // 우
                  { row: 2, col: 2, index: 3 }, // 하우
                  { row: 2, col: 1, index: 4 }, // 하
                  { row: 2, col: 0, index: 5 }, // 하좌
                  { row: 1, col: 0, index: 6 }, // 좌
                  { row: 0, col: 0, index: 7 }  // 상좌
                ];

                const position = positions.find(p => p.row === row && p.col === col);
                if (position) {
                  text = subGoals[position.index] || "";
                }
              }
            } else {
              // 주변 섹션
              if (row === 1 && col === 1) {
                text = subGoals[sectionIndex] || "";
              } else {
                const subDetail = subGoalDetails[sectionIndex];
                console.log(`Section [${sectionRow}, ${sectionCol}] Cell [${row}, ${col}]:`, {
                  sectionIndex,
                  subDetail,
                  tasks: subDetail?.tasks
                });

                if (subDetail?.tasks) {
                  // 8개의 세부 목표를 시계 방향으로 배치
                  const positions = [
                    { row: 0, col: 0, index: 0 },
                    { row: 0, col: 1, index: 1 },
                    { row: 0, col: 2, index: 2 },
                    { row: 1, col: 2, index: 3 },
                    { row: 2, col: 2, index: 4 },
                    { row: 2, col: 1, index: 5 },
                    { row: 2, col: 0, index: 6 },
                    { row: 1, col: 0, index: 7 }
                  ];

                  const position = positions.find(p => p.row === row && p.col === col);
                  if (position) {
                    text = subDetail.tasks[position.index] || "";
                    console.log('Found task:', {
                      position,
                      text,
                      allTasks: subDetail.tasks
                    });
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

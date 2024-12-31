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
  console.log('Initial Props:', {
    mainGoal,
    subGoalsLength: subGoals.length,
    subGoalDetailsLength: subGoalDetails.length,
    firstSubGoalTasks: subGoalDetails[0]?.tasks
  });

  const handleCellClick = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  // 섹션 인덱스를 계산하는 함수
  const getSectionIndex = (row: number, col: number) => {
    if (row === 1 && col === 1) return -1; // 중앙 섹션

    // 섹션 순서를 시계 방향으로 매핑
    const sectionMapping = [
      [0, 1, 2],    // 첫 번째 행
      [3, -1, 5],   // 두 번째 행
      [6, 7, 4]     // 세 번째 행
    ];

    return sectionMapping[row][col];
  };

  const renderSection = (sectionRow: number, sectionCol: number) => {
    const sectionIndex = getSectionIndex(sectionRow, sectionCol);
    const isCenter = sectionRow === 1 && sectionCol === 1;

    console.log(`Rendering Section [${sectionRow},${sectionCol}]:`, {
      sectionIndex,
      isCenter,
      hasSubGoalDetails: sectionIndex !== -1 ? !!subGoalDetails[sectionIndex] : null
    });
    
    return (
      <div key={`section-${sectionRow}-${sectionCol}`} 
        className={cn(
          "grid grid-cols-3 gap-0.5 p-0.5 rounded",
          isCenter ? "bg-gray-900" : "bg-gray-800"
        )}
      >
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
            } else if (sectionIndex >= 0 && sectionIndex < subGoalDetails.length) {
              // 주변 섹션
              if (row === 1 && col === 1) {
                text = subGoals[sectionIndex] || "";
              } else {
                const subDetail = subGoalDetails[sectionIndex];
                
                if (subDetail?.tasks) {
                  // 8개의 세부 목표를 시계 방향으로 배치
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
                    text = subDetail.tasks[position.index] || "";
                    console.log(`Cell data [${sectionRow},${sectionCol}][${row},${col}]:`, {
                      sectionIndex,
                      positionIndex: position.index,
                      text,
                      availableTasks: subDetail.tasks
                    });
                  }
                }
              }
            }

            const isMainGoal = isCenter && row === 1 && col === 1;
            const isSubGoal = !isCenter && row === 1 && col === 1;

            return (
              <Cell
                key={`cell-${row}-${col}`}
                text={text}
                className={cn(
                  "text-white transition-colors",
                  isMainGoal && "bg-amber-700 font-bold text-base border-2 border-amber-500 shadow-lg",
                  isSubGoal && "bg-sky-900 font-semibold border-2 border-sky-700",
                  !isMainGoal && !isSubGoal && "bg-gray-700 hover:bg-gray-600"
                )}
                onClick={handleCellClick}
              />
            );
          })}
      </div>
    );
  };

  return (
    <div className={cn(
      "grid grid-cols-3 gap-1 p-1 rounded-lg w-full max-w-6xl mx-auto bg-gray-950",
      className
    )}>
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

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

  const getDetailIndex = (row: number, col: number) => {
    if (row === 1 && col === 1) return -1;
    const r = Math.floor(row / 3);
    const c = Math.floor(col / 3);
    return r * 3 + c;
  };

  const renderSection = (sectionRow: number, sectionCol: number) => {
    const sectionIndex = sectionRow * 3 + sectionCol;
    const isCenter = sectionRow === 1 && sectionCol === 1;
    
    return (
      <div key={`section-${sectionRow}-${sectionCol}`} className="grid grid-cols-3 gap-0.5 bg-gray-200 p-0.5">
        {Array(9)
          .fill(null)
          .map((_, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            let text = "";

            if (isCenter) {
              if (row === 1 && col === 1) {
                text = mainGoal;
              } else {
                const subGoalIndex = getDetailIndex(row + sectionRow * 3, col + sectionCol * 3);
                text = subGoals[subGoalIndex] || "";
              }
            } else {
              if (row === 1 && col === 1) {
                text = subGoals[sectionIndex] || "";
              } else {
                const subDetail = subGoalDetails[sectionIndex];
                if (subDetail?.tasks) {
                  text = subDetail.tasks[row * 3 + col] || "";
                }
              }
            }

            return (
              <Cell
                key={`cell-${row}-${col}`}
                text={text}
                className={cn(
                  "aspect-square flex items-center justify-center p-2 text-center",
                  isCenter && row === 1 && col === 1 && "bg-yellow-50 font-bold text-lg",
                  !isCenter && row === 1 && col === 1 && "bg-blue-50 font-semibold",
                  "bg-white hover:bg-gray-50"
                )}
                onClick={handleCellClick}
              />
            );
          })}
      </div>
    );
  };

  return (
    <div className={cn("grid grid-cols-3 gap-1 bg-gray-300 p-1 rounded-lg w-full max-w-5xl mx-auto", className)}>
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

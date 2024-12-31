"use client";

import type { FC } from "react";
import { cn } from "@/lib/utils";
import { Cell } from "./cell";

interface FullMandalProps {
  mainGoal: string;
  subGoals: string[];
  subGoalDetails: { title: string; tasks: string[] }[];
  className?: string;
}

export const FullMandal: FC<FullMandalProps> = ({
  mainGoal = "",
  subGoals = Array(8).fill(""),
  subGoalDetails = Array(8).fill({ title: "", tasks: Array(8).fill("") }),
  className
}) => {
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

  return (
    <div className={cn("grid grid-cols-9 gap-1 bg-gray-300 p-1 rounded-lg", className)}>
      {Array(9)
        .fill(null)
        .map((_, row) =>
          Array(9)
            .fill(null)
            .map((_, col) => {
              const detailIndex = getDetailIndex(row, col);
              let text = "";

              if (row === 4 && col === 4) {
                text = mainGoal;
              } else if (row % 3 === 1 && col % 3 === 1 && !(row === 4 && col === 4)) {
                const subGoalIndex = getDetailIndex(row, col);
                text = subGoals[subGoalIndex] || "";
              } else if (detailIndex !== -1) {
                const subDetail = subGoalDetails[detailIndex];
                if (subDetail) {
                  const localRow = row % 3;
                  const localCol = col % 3;
                  const taskIndex = localRow * 3 + localCol;
                  if (subDetail.tasks && subDetail.tasks[taskIndex]) {
                    text = subDetail.tasks[taskIndex];
                  }
                }
              }

              return (
                <Cell
                  key={`${row}-${col}`}
                  text={text}
                  className={cn(
                    "bg-white rounded-md transition-all duration-200 hover:bg-gray-50",
                    row === 4 && col === 4 && "bg-yellow-50 font-bold text-lg min-h-[80px]",
                    (row % 3 === 1 && col % 3 === 1) && "bg-blue-50 font-semibold min-h-[70px]",
                    (row % 3 === 1 || col % 3 === 1) && "shadow-sm",
                    Math.floor(row / 3) === 1 && Math.floor(col / 3) === 1 && "scale-105"
                  )}
                  onClick={handleCellClick}
                />
              );
            })
        )}
    </div>
  );
};

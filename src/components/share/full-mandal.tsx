"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Cell } from "./cell";

interface FullMandalProps {
  mainGoal: string;
  subGoals: string[];
  subGoalDetails: { title: string; tasks: string[] }[];
}

export function FullMandal({
  mainGoal = "",
  subGoals = Array(8).fill(""),
  subGoalDetails = Array(8).fill({ title: "", tasks: Array(8).fill("") }),
}: FullMandalProps) {
  const handleCellClick = (text: string) => {
    if (text) {
      setModalText(text);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalText("");
  };

  const getDetailIndex = (row: number, col: number) => {
    if (row === 1 && col === 1) return -1;
    const r = Math.floor(row / 3);
    const c = Math.floor(col / 3);
    return r * 3 + c;
  };

  return (
    <div className="grid grid-cols-9 gap-0.5 bg-gray-200 p-0.5">
      {Array(9).fill(null).map((_, row) =>
        Array(9).fill(null).map((_, col) => {
          const detailIndex = getDetailIndex(row, col);
          let text = "";

          if (row === 4 && col === 4) {
            text = mainGoal;
          } else if ((row % 3 === 1 && col % 3 === 1) && !(row === 4 && col === 4)) {
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
                "bg-white min-h-[60px]",
                row === 4 && col === 4 && "bg-yellow-50 font-bold",
                (row % 3 === 1 && col % 3 === 1) && "bg-blue-50 font-semibold"
              )}
              onClick={handleCellClick}
            />
          );
        })
      )}
    </div>
  );
}

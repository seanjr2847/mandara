"use client";

import { cn } from "@/lib/utils";

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
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  const getDetailIndex = (row: number, col: number) => {
    if (row === 0 && col === 0) return 0;      // 왼쪽 위
    if (row === 0 && col === 1) return 1;      // 위
    if (row === 0 && col === 2) return 2;      // 오른쪽 위
    if (row === 1 && col === 0) return 3;      // 왼쪽
    if (row === 1 && col === 2) return 4;      // 오른쪽
    if (row === 2 && col === 0) return 5;      // 왼쪽 아래
    if (row === 2 && col === 1) return 6;      // 아래
    if (row === 2 && col === 2) return 7;      // 오른쪽 아래
    return -1;
  };

  const renderSubMandal = (mainIndex: number) => {
    if (mainIndex < 0 || mainIndex >= 8) {
      return (
        <div className="grid grid-cols-3 gap-1">
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <div key={`${mainIndex}-${row}-${col}`} className="aspect-square">
                {renderCell("")}
              </div>
            ))
          )}
        </div>
      );
    }

    const subGoal = subGoals[mainIndex];
    const details = subGoalDetails[mainIndex]?.tasks || Array(8).fill("");

    return (
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => {
            const isCenter = row === 1 && col === 1;
            const detailIndex = getDetailIndex(row, col);

            return (
              <div key={`${mainIndex}-${row}-${col}`} className="aspect-square">
                {renderCell(
                  isCenter ? subGoal : (detailIndex >= 0 ? details[detailIndex] : ""),
                  isCenter
                )}
              </div>
            );
          })
        )}
      </div>
    );
  };

  const renderCell = (text: string | null | undefined, isCenter: boolean = false) => {
    const cleanedText = typeof text === 'string' ? text.trim() : '';

    return (
      <div
        className={cn(
          "w-full h-full flex items-center justify-center text-center relative group p-1 sm:p-2",
          isCenter
            ? "bg-slate-900 text-white font-bold border-2 border-slate-700 hover:bg-slate-800"
            : "bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700"
        )}
        onClick={() => handleCellClick(cleanedText)}
      >
        <span
          className={cn(
            "text-[14px] sm:text-[14px] md:text-[14px] break-keep flex items-center justify-center leading-[1.2] whitespace-pre-line",
            "line-clamp-2 sm:line-clamp-3 md:line-clamp-4",
            isCenter && "font-bold",
            "group-hover:line-clamp-none group-hover:absolute group-hover:inset-0 group-hover:z-50 group-hover:bg-inherit group-hover:flex group-hover:items-center group-hover:justify-center"
          )}
          title={cleanedText}
        >
          {cleanedText}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-2 sm:p-4 bg-slate-950">
      <div className="grid grid-cols-3 gap-2 w-full h-full">
        {renderSubMandal(0)}
        {renderSubMandal(1)}
        {renderSubMandal(2)}
        {renderSubMandal(3)}
        <div className="grid grid-cols-3 gap-1 p-2 bg-slate-800/50 rounded-lg shadow-lg ring-2 ring-slate-600">
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => {
              const isCenter = row === 1 && col === 1;
              const index = getDetailIndex(row, col);
              return (
                <div
                  key={`main-${row}-${col}`}
                  className="aspect-square"
                >
                  {renderCell(isCenter ? mainGoal : (index >= 0 ? subGoals[index] : ""), isCenter)}
                </div>
              );
            })
          )}
        </div>
        {renderSubMandal(4)}
        {renderSubMandal(5)}
        {renderSubMandal(6)}
        {renderSubMandal(7)}
      </div>
    </div>
  );
}

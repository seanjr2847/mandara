import { cn } from "@/lib/utils";
import { useState } from "react";
import { Cell } from "./cell";

interface FullMandalProps {
  mainGoal: string;
  subGoals: string[];
  subGoalDetails: { title: string; tasks: string[] }[];
  theme: any;
  font: any;
}

export default function FullMandal({ mainGoal, subGoals, subGoalDetails, theme, font }: FullMandalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

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
    const r = Math.floor(row / 3);
    const c = Math.floor(col / 3);
    if (r === 1 && c === 1) return -1;
    return r * 3 + c;
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto p-4 scale-[0.95] sm:scale-100 lg:scale-105">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{mainGoal}</h1>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-9 gap-0.5 bg-gray-200 p-0.5 w-full max-w-[calc(100vh-50px)]">
          {Array(9).fill(null).map((_, row) =>
            Array(9).fill(null).map((_, col) => {
              const detailIndex = getDetailIndex(row, col);
              let text = "";

              if (row === 4 && col === 4) {
                text = mainGoal;
              } else if ((row % 3 === 1 && col % 3 === 1) && !(row === 4 && col === 4)) {
                const subGoalIndex = getDetailIndex(Math.floor(row / 3) * 3 + 1, Math.floor(col / 3) * 3 + 1);
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

              const isCenter = row % 3 === 1 && col % 3 === 1;
              const isMainCell = row === 4 && col === 4;
              const displayText = text.length > 25 ? text.slice(0, 25) + '...' : text;

              return (
                <div
                  key={`${row}-${col}`}
                  className={cn(
                    "w-full h-full flex items-center justify-center p-1 sm:p-2 text-center border overflow-hidden relative group",
                    isMainCell
                      ? theme.centerClassName
                      : isCenter
                      ? theme.centerClassName
                      : theme.className,
                    font.className,
                    theme.label === "라이트" ? "text-black" : "text-white",
                    "cursor-pointer min-h-[60px]"
                  )}
                  onClick={() => handleCellClick(text)}
                >
                  <div 
                    className={cn(
                      "w-full h-full flex items-center justify-center text-center",
                      isCenter && isMainCell ? "text-[14px]" : "text-[12px]",
                      isCenter && "font-bold",
                      isMainCell && "sm:text-base font-bold",
                      "whitespace-normal break-words overflow-hidden"
                    )}
                    title={text}
                  >
                    {displayText}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-lg w-full mx-4">
            <div className="text-lg mb-4">{modalText}</div>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

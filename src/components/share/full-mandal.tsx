"use client";

import { cn } from "@/lib/utils";
import { Theme, Font } from "@/lib/share-customization";
import { useState, useEffect } from "react";

interface FullMandalProps {
  theme: Theme;
  font: Font;
  showAuthor: boolean;
  showDate: boolean;
  mainGoal: string;
  subGoals: string[];
  subGoalDetails: { title: string; tasks: string[] }[];
}

export function FullMandal({
  theme,
  font,
  showAuthor,
  showDate,
  mainGoal = "",
  subGoals = Array(8).fill(""),
  subGoalDetails = Array(8).fill({ title: "", tasks: Array(8).fill("") }),
}: FullMandalProps) {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCellClick = (text: string | null | undefined) => {
    // 'd' 접두사 제거
    const cleanedText = typeof text === 'string' ? text.replace(/^d\s*/, '').trim() : text;
    
    console.log('Cell clicked:', cleanedText, typeof cleanedText);
    
    if (cleanedText && cleanedText.trim().length > 0) {
      setSelectedText(cleanedText);
    }
  };

  const getDetailIndex = (row: number, col: number) => {
    if (row === 1 && col === 1) return -1;

    if (row === 0 && col === 0) return 0;
    if (row === 0 && col === 1) return 1;
    if (row === 0 && col === 2) return 2;
    if (row === 1 && col === 2) return 3;
    if (row === 2 && col === 2) return 4;
    if (row === 2 && col === 1) return 5;
    if (row === 2 && col === 0) return 6;
    if (row === 1 && col === 0) return 7;
    return -1;
  };

  const renderCell = (text: string | string[], isCenter: boolean = false, isMainCell: boolean = false) => {
    // 텍스트가 배열인 경우 첫 번째 요소 선택
    const processedText = Array.isArray(text) ? text[0] : text;

    // 'd' 접두사 제거
    const cleanedText = typeof processedText === 'string' ? 
      processedText.replace(/^d\s*/, '').trim() : 
      processedText;

    // 중복된 텍스트 제거 (안전한 방식으로 변경)
    const uniqueText = cleanedText ? 
      Array.from(new Set(
        (typeof cleanedText === 'string' ? cleanedText : String(cleanedText))
          .toString()
          .trim()
          .split(/\s+/)
      )).join(' ') 
      : '';

    // 텍스트 자르기 함수
    const truncateText = (inputText: string, maxLength: number = 25) => {
      const text = inputText || '';
      console.log('Truncate input:', text, 'Max length:', maxLength);

      if (text.length <= maxLength) return text;

      // 단어 단위로 자르기
      const words = text.split(' ');
      let truncated = '';
      
      for (const word of words) {
        if ((truncated + ' ' + word).length <= maxLength) {
          truncated += (truncated ? ' ' : '') + word;
        } else {
          break;
        }
      }

      const result = truncated + '...';
      console.log('Truncated result:', result);
      return result;
    };

    const displayText = truncateText(cleanedText || processedText || uniqueText);

    return (
      <div
        className={cn(
          "w-full h-full flex items-center justify-center p-1 sm:p-2 text-center border overflow-hidden relative group",
          isMainCell
            ? theme.centerClassName
            : isCenter
            ? theme.centerClassName
            : theme.className,
          font.className,
          theme.label === "라이트" ? "text-black" : "text-white",
          "cursor-pointer"
        )}
        onClick={(e) => {
          e.stopPropagation();
          handleCellClick(cleanedText);
        }}
      >
        <div 
          className={cn(
            "w-full h-full flex items-center justify-center text-center",
            "text-[12px] sm:text-[12px] md:text-[12px] lg:text-[12px]", 
            isCenter && "font-bold",
            isMainCell && "sm:text-base font-bold",
            "whitespace-normal break-words overflow-hidden"
          )}
          title={cleanedText}
        >
          {displayText}
        </div>
      </div>
    );
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

    const subGoal = subGoals?.[mainIndex] || "";
    const details = subGoalDetails?.[mainIndex]?.tasks;

    return (
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => {
            const isCenter = row === 1 && col === 1;
            const detailIndex = getDetailIndex(row, col);

            return (
              <div key={`${mainIndex}-${row}-${col}`} className="aspect-square">
                {renderCell(
                  isCenter ? subGoal : (detailIndex >= 0 ? details?.[detailIndex] : ""),
                  isCenter
                )}
              </div>
            );
          })
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto p-4 scale-[0.95] sm:scale-100 lg:scale-105"> 
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{mainGoal}</h1>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-1 sm:gap-2 w-full max-w-[calc(100vh-50px)]"> 
          {renderSubMandal(0)}
          {renderSubMandal(1)}
          {renderSubMandal(2)}
          {renderSubMandal(3)}
          <div className="grid grid-cols-3 gap-1">
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => {
                const isCenter = row === 1 && col === 1;
                const index = getDetailIndex(row, col);
                return (
                  <div
                    key={`main-${row}-${col}`}
                    className="aspect-square"
                  >
                    {renderCell(isCenter ? mainGoal : (index >= 0 ? subGoals[index] : ""), isCenter, true)}
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

      {selectedText && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]" 
          onClick={() => setSelectedText(null)}
        >
          <div 
            className="bg-white p-6 rounded-lg max-w-md w-full text-center relative" 
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-black text-lg font-semibold break-words whitespace-normal">{selectedText}</p>
            <button 
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={() => setSelectedText(null)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {(showAuthor || showDate) && (
        <div className="mt-6 text-sm text-gray-600 text-right space-y-1">
          {showAuthor && <div>작성자: 사용자</div>}
          {showDate && (
            <div>
              작성일: {new Date().toLocaleDateString("ko-KR")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

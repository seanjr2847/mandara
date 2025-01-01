"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface CellProps {
  text: string;
  className?: string;
  onClick?: (text: string) => void;
}

export function Cell({ text, className, onClick }: CellProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick && text) {
      onClick(text);
    }
  };

  return (
    <div
      className={cn(
        "group relative flex items-center justify-center h-[120px] p-3 text-center cursor-pointer rounded-sm",
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className={cn(
        "text-sm w-full break-keep transition-all duration-200",
        !isHovered && "line-clamp-3"
      )}>
        {text}
      </p>
      {isHovered && text.length > 0 && (
        <div className="absolute z-10 bg-gray-800 border border-gray-600 shadow-xl rounded-md p-3 min-w-[200px] max-w-[300px] text-sm text-white">
          {text}
        </div>
      )}
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface CellProps {
  text: string;
  className?: string;
  onClick?: (text: string) => void;
}

export function Cell({ text, className, onClick }: CellProps) {
  const handleClick = () => {
    if (onClick && text) {
      onClick(text);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center p-2 text-center border border-gray-200 cursor-pointer hover:bg-gray-50",
        className
      )}
      onClick={handleClick}
    >
      <span className="text-sm">{text}</span>
    </div>
  );
}

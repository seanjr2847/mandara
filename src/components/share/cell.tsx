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
        "w-full pb-[100%] relative",
        className
      )}
      onClick={handleClick}
    >
      <div className="absolute inset-0 flex items-center justify-center p-2">
        <p className="text-sm line-clamp-3 text-center break-keep">{text}</p>
      </div>
    </div>
  );
}

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
        "flex items-center justify-center min-h-[120px] p-3 text-center cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <p className="text-sm w-full break-keep">{text}</p>
    </div>
  );
}

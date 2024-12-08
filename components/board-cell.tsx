"use client";

import { cn } from "@/lib/utils";

interface BoardCellProps {
  value: string | null;
  onClick: () => void;
  isWinningCell?: boolean;
}

export function BoardCell({ value, onClick, isWinningCell }: BoardCellProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "sm:size-24 size-16 border-2 border-primary text-4xl font-bold transition-colors",
        "hover:bg-primary/5 focus:outline-none",
        isWinningCell && "bg-primary/20",
        !value && "cursor-pointer"
      )}
      disabled={!!value}
    >
      {value}
    </button>
  );
}

'use client';

import { cn } from '@/lib/utils';

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
        'h-24 w-24 border-2 border-primary text-4xl font-bold transition-colors',
        'hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        isWinningCell && 'bg-primary/20',
        !value && 'cursor-pointer'
      )}
      disabled={!!value}
    >
      {value}
    </button>
  );
}
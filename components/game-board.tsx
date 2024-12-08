'use client';

import { BoardState } from '@/lib/types';
import { BoardCell } from './board-cell';

interface GameBoardProps {
  board: BoardState;
  winningCombo: number[] | null;
  onCellClick: (index: number) => void;
}

export function GameBoard({ board, winningCombo, onCellClick }: GameBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 bg-background p-4 rounded-lg shadow-lg">
      {board.map((cell, index) => (
        <BoardCell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          isWinningCell={winningCombo?.includes(index)}
        />
      ))}
    </div>
  );
}
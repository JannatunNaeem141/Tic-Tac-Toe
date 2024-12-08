'use client';

import type { GameStatus, Player } from '@/lib/types';

interface GameStatusProps {
  status: GameStatus;
  winner: Player | null;
  currentPlayer: Player;
}

export function GameStatus({ status, winner, currentPlayer }: GameStatusProps) {
  return (
    <div className="sm:text-2xl text-lg font-bold text-center mb-5">
      {status === 'won' && (
        <p className="text-primary">Player {winner} wins!</p>
      )}
      {status === 'draw' && (
        <p className="text-primary">Game ended in a draw!</p>
      )}
      {status === 'playing' && (
        <p>Player {currentPlayer}&apos;s turn</p>
      )}
    </div>
  );
}
'use client';

import { Player, GameStatus } from '@/lib/types';

interface GameStatusProps {
  status: GameStatus;
  winner: Player | null;
  currentPlayer: Player;
}

export function GameStatus({ status, winner, currentPlayer }: GameStatusProps) {
  return (
    <div className="text-2xl font-bold text-center mb-8">
      {status === 'won' && (
        <p className="text-primary">Player {winner} wins!</p>
      )}
      {status === 'draw' && (
        <p className="text-primary">Game ended in a draw!</p>
      )}
      {status === 'playing' && (
        <p>Player {currentPlayer}'s turn</p>
      )}
    </div>
  );
}
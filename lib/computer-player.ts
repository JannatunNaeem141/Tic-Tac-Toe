import { checkWinner } from './game-logic';
import { BoardState, Difficulty, Player } from './types';

// Find winning move for a player
const findWinningMove = (board: BoardState, player: Player): number | null => {
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const testBoard = [...board];
      testBoard[i] = player;
      if (checkWinner(testBoard) === player) {
        return i;
      }
    }
  }
  return null;
};

// Get available moves
const getAvailableMoves = (board: BoardState): number[] => {
  return board.reduce<number[]>((moves, cell, index) => {
    if (!cell) moves.push(index);
    return moves;
  }, []);
};

// Get random move
const getRandomMove = (availableMoves: number[]): number => {
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
};

// Get strategic move (tries to take center or corners first)
const getStrategicMove = (availableMoves: number[]): number => {
  const strategicPositions = [4, 0, 2, 6, 8, 1, 3, 5, 7];
  return strategicPositions.find(pos => availableMoves.includes(pos)) ?? availableMoves[0];
};

export const getComputerMove = (
  board: BoardState,
  computerPlayer: Player,
  difficulty: Difficulty
): number => {
  const humanPlayer = computerPlayer === 'X' ? 'O' : 'X';
  const availableMoves = getAvailableMoves(board);

  // Try to win
  const winningMove = findWinningMove(board, computerPlayer);
  if (winningMove !== null) return winningMove;

  // Block opponent's winning move
  const blockingMove = findWinningMove(board, humanPlayer);
  if (blockingMove !== null) return blockingMove;

  // Different strategies based on difficulty
  switch (difficulty) {
    case 'easy':
      return getRandomMove(availableMoves);
    case 'medium':
      return Math.random() > 0.5 ? 
        getStrategicMove(availableMoves) : 
        getRandomMove(availableMoves);
    case 'hard':
      return getStrategicMove(availableMoves);
    default:
      return getRandomMove(availableMoves);
  }
};
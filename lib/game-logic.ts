import { GameStatus } from "./types";
import { Player } from "./types";
import { BoardState } from "./types";

export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

export const checkWinner = (board: BoardState): Player | null => {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export const checkGameStatus = (board: BoardState): GameStatus => {
  const winner = checkWinner(board);
  if (winner) return "won";
  if (board.every((cell) => cell !== null)) return "draw";
  return "playing";
};

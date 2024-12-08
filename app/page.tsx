'use client';

import { useState, useCallback, useEffect } from 'react';
import { GameBoard } from '@/components/game-board';
import { GameStatus } from '@/components/game-status';
import { GameModeSelector } from '@/components/game-mode-selector';
import { Button } from '@/components/ui/button';
import { Player, BoardState, GameMode, Difficulty } from '@/lib/types';
import { checkWinner, checkGameStatus, WINNING_COMBINATIONS } from '@/lib/game-logic';
import { getComputerMove } from '@/lib/computer-player';
import { RefreshCw } from 'lucide-react';

export default function Home() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winningCombo, setWinningCombo] = useState<number[] | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('multi');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  const status = checkGameStatus(board);
  const winner = checkWinner(board);

  const checkForWinner = (newBoard: BoardState) => {
    const winner = checkWinner(newBoard);
    if (winner) {
      for (const combo of WINNING_COMBINATIONS) {
        if (
          newBoard[combo[0]] === winner &&
          newBoard[combo[1]] === winner &&
          newBoard[combo[2]] === winner
        ) {
          setWinningCombo(combo);
          break;
        }
      }
    }
  };

  const handleCellClick = useCallback((index: number) => {
    if (board[index] || status !== 'playing') return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    checkForWinner(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }, [board, currentPlayer, status]);

  useEffect(() => {
    if (
      gameMode === 'single' &&
      currentPlayer === 'O' &&
      status === 'playing'
    ) {
      // Add a small delay to make the computer's move feel more natural
      const timeoutId = setTimeout(() => {
        const computerMove = getComputerMove(board, 'O', difficulty);
        const newBoard = [...board];
        newBoard[computerMove] = 'O';
        setBoard(newBoard);
        checkForWinner(newBoard);
        setCurrentPlayer('X');
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [currentPlayer, board, gameMode, status, difficulty]);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinningCombo(null);
  }, []);

  const handleModeChange = (mode: GameMode) => {
    setGameMode(mode);
    resetGame();
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    resetGame();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Tic Tac Toe</h1>

      <GameModeSelector
        onSelectMode={handleModeChange}
        onSelectDifficulty={handleDifficultyChange}
        selectedMode={gameMode}
        selectedDifficulty={difficulty}
      />
      
      <GameStatus
        status={status}
        winner={winner}
        currentPlayer={currentPlayer}
      />

      <GameBoard
        board={board}
        winningCombo={winningCombo}
        onCellClick={handleCellClick}
      />

      <Button
        onClick={resetGame}
        className="mt-8 flex items-center gap-2"
        variant="outline"
      >
        <RefreshCw className="h-4 w-4" />
        New Game
      </Button>
    </div>
  );
}
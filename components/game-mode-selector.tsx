"use client";

import { GameMode, Difficulty } from "@/lib/types";
import { Users, User, Brain } from "lucide-react";
import { Button } from "./ui/button";

interface GameModeSelectorProps {
  onSelectMode: (mode: GameMode) => void;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  selectedMode: GameMode;
  selectedDifficulty: Difficulty;
}

export function GameModeSelector({
  onSelectMode,
  onSelectDifficulty,
  selectedMode,
  selectedDifficulty,
}: GameModeSelectorProps) {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex sm:gap-4 gap-2">
        <Button
          variant={selectedMode === "single" ? "default" : "outline"}
          onClick={() => onSelectMode("single")}
          className="flex items-center gap-2"
        >
          <User className="h-4 w-4" />
          vs Computer
        </Button>
        <Button
          variant={selectedMode === "multi" ? "default" : "outline"}
          onClick={() => onSelectMode("multi")}
          className="flex items-center gap-2"
        >
          <Users className="h-4 w-4" />
          vs Player
        </Button>
      </div>

      {selectedMode === "single" && (
        <div className="flex sm:gap-2 gap-1">
          <Button
            variant={selectedDifficulty === "easy" ? "default" : "outline"}
            onClick={() => onSelectDifficulty("easy")}
            size="sm"
            className="flex items-center sm:gap-2 gap-1 !sm:text-sm !text-xs"
          >
            <Brain className="h-4 w-4" />
            Easy
          </Button>
          <Button
            variant={selectedDifficulty === "medium" ? "default" : "outline"}
            onClick={() => onSelectDifficulty("medium")}
            size="sm"
            className="flex items-center sm:gap-2 gap-1 !sm:text-sm !text-xs"
          >
            <Brain className="h-4 w-4" />
            Medium
          </Button>
          <Button
            variant={selectedDifficulty === "hard" ? "default" : "outline"}
            onClick={() => onSelectDifficulty("hard")}
            size="sm"
            className="flex items-center sm:gap-2 gap-1 !sm:text-sm !text-xs"
          >
            <Brain className="h-4 w-4" />
            Hard
          </Button>
        </div>
      )}
    </div>
  );
}

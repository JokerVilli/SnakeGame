import { useRef } from "react";
import { GameBoardProps } from "./types";

export const GameBoard = ({ GRID_SIZE_X, GRID_SIZE_Y, children }: GameBoardProps) => {
  const gameBoardRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={gameBoardRef}
      className="game-board"
      style={{
        height: "90vh",
        aspectRatio: GRID_SIZE_X / GRID_SIZE_Y,
        gridTemplateColumns: `repeat(${GRID_SIZE_X}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_SIZE_Y}, 1fr)`,
      }}
    >
      {children}
    </div>
  );
};

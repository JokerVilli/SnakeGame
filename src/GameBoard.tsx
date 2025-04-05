import { useRef } from "react";
import { GameBoardProps } from "./types";
import { GAMEBOARD_HEIGHT } from "./constants";
import React from "react";

const GameBoard = ({ GRID_SIZE_X, GRID_SIZE_Y, children }: GameBoardProps) => {
  const gameBoardRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={gameBoardRef}
      className="game-board"
      style={{
        height: GAMEBOARD_HEIGHT,
        aspectRatio: GRID_SIZE_X / GRID_SIZE_Y,
        gridTemplateColumns: `repeat(${GRID_SIZE_X}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_SIZE_Y}, 1fr)`,
      }}
    >
      {children}
    </div>
  );
};

export default React.memo(GameBoard); 

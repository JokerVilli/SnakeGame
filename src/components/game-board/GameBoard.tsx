import { useContext, useRef } from "react";
import { gameContextProps } from "../../types";
import { GAMEBOARD_HEIGHT } from "../../constants";
import React from "react";
import { Cell } from "../cell/Cell";
import { getCellClasses } from "../../utils";
import { GameContext } from "../snake-game/SnakeGame";

const GameBoard = () => {
  const gameContext = useContext(GameContext);
  const { GRID_SIZE_X, GRID_SIZE_Y, snake, food, prevHeadDirection, noFood, bodyFood } = gameContext as gameContextProps;
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
      {Array.from({ length: GRID_SIZE_Y * GRID_SIZE_X }).map((_, i) => {
        const x = i % GRID_SIZE_X;
        const y = Math.floor(i / GRID_SIZE_X);
        return (
          <Cell
            key={i}
            className={getCellClasses({
              x,
              y,
              snake,
              food,
              prevHeadDirection,
              noFood,
              bodyFood,
            })}
          />
        );
      })}
    </div>
  );
};

export default React.memo(GameBoard);

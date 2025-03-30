import { useState, useCallback, useEffect } from "react";
import { Position } from "../types";

export const useFood = (
  GRID_SIZE_X: number,
  GRID_SIZE_Y: number,
  snake: Position[]
) => {
  const [food, setFood] = useState<Position>({ x: -1, y: -1 });

  const generateFood = useCallback(() => {
    const newFood = () => ({
      x: Math.floor(Math.random() * GRID_SIZE_X),
      y: Math.floor(Math.random() * GRID_SIZE_Y),
    });

    let foodPosition = newFood();
    while (
      snake.some(
        (segment) =>
          segment.x === foodPosition.x && segment.y === foodPosition.y
      )
    ) {
      foodPosition = newFood();
    }
    setFood(foodPosition);
  }, [GRID_SIZE_X, GRID_SIZE_Y, snake]);

  useEffect(() => {
    generateFood();
  }, []);
 
  return { food, generateFood };
};

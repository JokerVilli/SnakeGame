import { useState, useEffect } from "react";
import { Direction } from "../types";
import { INITIAL_DIRECTION } from "../constants";

export const useControls = (isPaused: boolean, gameOver: boolean) => {
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [prevHeadDirection, setPrevHeadDirection] = useState(direction);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPaused && !gameOver) {
        // Обработка стрелок
        switch (e.key) {
          case "ArrowUp":
            if (direction !== "DOWN") setDirection("UP");
            break;
          case "ArrowDown":
            if (direction !== "UP") setDirection("DOWN");
            break;
          case "ArrowLeft":
            if (direction !== "RIGHT") setDirection("LEFT");
            break;
          case "ArrowRight":
            if (direction !== "LEFT") setDirection("RIGHT");
            break;
        }
        setPrevHeadDirection(direction);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameOver, isPaused]);

  return { direction, prevHeadDirection, setPrevHeadDirection };
};

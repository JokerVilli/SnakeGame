import React, { useState, useEffect, useCallback } from "react";
import "./SnakeGame.css";
import "./experience/styles.css";
import ProgressBar from "./ProgressBar";
import { CloneBox, Position } from "./types";
import {
  COEF,
  EXPERIENCE_MAP,
  INITIAL_SNAKE,
  TIMER,
} from "./constants";
import { getCellClasses } from "./utils";
import { ExperienceModal } from "./ExperienceModal";
import { GameBoard } from "./GameBoard";
import { Cell } from "./Cell";
import { useCloneModal } from "./hooks/useCloneModal";
import { useFood } from "./hooks/useFood";
import { useControls } from "./hooks/useControls";

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [gameOver, setGameOver] = useState(false);

  const { innerWidth: width, innerHeight: height } = window;

  const GRID_SIZE_Y = Math.round(height * COEF);
  const GRID_SIZE_X = Math.round((GRID_SIZE_Y / height) * width);

  const { food, generateFood } = useFood(GRID_SIZE_X, GRID_SIZE_Y, snake);
  const {
    experienceLevel,
    clone,
    isPaused,
    timer,
    closeModal,
    setClone,
    setIsPaused,
    setTimer,
  } = useCloneModal(gameOver, generateFood);
  const { direction, prevHeadDirection, setPrevHeadDirection } = useControls(isPaused, gameOver);

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = newSnake[0];

      const newHead = { ...head };
      switch (direction) {
        case "UP":
          newHead.y -= 1;
          break;
        case "DOWN":
          newHead.y += 1;
          break;
        case "LEFT":
          newHead.x -= 1;
          break;
        case "RIGHT":
          newHead.x += 1;
          break;
      }
      if (direction !== prevHeadDirection) setPrevHeadDirection(direction);

      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE_X ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE_Y ||
        newSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        )
      ) {
        setGameOver(true);
        setTimer(TIMER);
        return prevSnake;
      }

      newSnake.unshift(newHead);
      if (newHead.x === food.x && newHead.y === food.y) {
        if (EXPERIENCE_MAP.length > experienceLevel) {
          setIsPaused(true);
          const newClone: CloneBox = {
            isExpanding: false,
            startX: document
              .querySelectorAll(".food")[0]
              .getBoundingClientRect().left,
            startY: document
              .querySelectorAll(".food")[0]
              .getBoundingClientRect().top,
          };
          setClone(newClone);
        } else {
          generateFood();
          if (timer > 70) setTimer(timer - 5);
        }
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameOver, direction, prevHeadDirection, setPrevHeadDirection, GRID_SIZE_X, GRID_SIZE_Y, food.x, food.y, setTimer, experienceLevel, setIsPaused, setClone, generateFood, timer]);

  useEffect(() => {
    if (gameOver || isPaused) return;
    const interval = setInterval(moveSnake, timer);
    return () => clearInterval(interval);
  }, [moveSnake, gameOver, isPaused, timer]);

  return (
    <div className="game-container">
      <div className="game-text">
        {gameOver ? "game over" : "just snake it"}
      </div>
      <div className="game-board-container">
        <div></div>
        <GameBoard GRID_SIZE_X={GRID_SIZE_X} GRID_SIZE_Y={GRID_SIZE_Y}>
          {Array.from({ length: GRID_SIZE_Y * GRID_SIZE_X }).map((_, i) => {
            const x = i % GRID_SIZE_X;
            const y = Math.floor(i / GRID_SIZE_X);
            return (
              <Cell
                key={i}
                className={getCellClasses(x, y, snake, food, prevHeadDirection)}
              />
            );
          })}
        </GameBoard>
        <div className="progress-bar-container">
          <ProgressBar activeStep={experienceLevel - 1} />
        </div>
      </div>
      {clone && (
        <ExperienceModal
          clone={clone}
          setClone={setClone}
          isPaused={isPaused}
          experienceLevel={experienceLevel}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default SnakeGame;

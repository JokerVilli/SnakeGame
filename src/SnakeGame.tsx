import React, { useState, useEffect, useCallback } from "react";
import "./SnakeGame.css";
import "./experience/styles.css";
import ProgressBar from "./ProgressBar";
import { CloneBox, Direction, Position } from "./types";
import {
  COEF,
  EXPERIENCE_MAP,
  INITIAL_DIRECTION,
  INITIAL_SNAKE,
  TIMER,
} from "./constants";
import { getCellClasses } from "./utils";
import { ExperienceModal } from "./ExperienceModal";
import { GameBoard } from "./GameBoard";
import { Cell } from "./Cell";
import { useFood } from "./hooks/useFood";

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [prevHeadDirection, setPrevHeadDirection] = useState(direction);
  const [isPaused, setIsPaused] = useState(false);
  const [clone, setClone] = useState<CloneBox | null>(null);
  const [experienceLevel, setExperienceLevel] = useState(0);
  const [timer, setTimer] = useState(TIMER);

  const { innerWidth: width, innerHeight: height } = window;

  const GRID_SIZE_Y = Math.round(height * COEF);
  const GRID_SIZE_X = Math.round((GRID_SIZE_Y / height) * width);

  const { food, generateFood} = useFood(GRID_SIZE_X, GRID_SIZE_Y, snake);

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
  }, [
    gameOver,
    direction,
    prevHeadDirection,
    GRID_SIZE_X,
    GRID_SIZE_Y,
    food.x,
    food.y,
    experienceLevel,
    timer,
    generateFood,
  ]);

  const closeModal = useCallback(() => {
    if (clone?.isExpanding) {
      setTimeout(() => {
        setClone({ ...clone, isExpanding: false });
        generateFood();
        if (isPaused) setIsPaused(false);
        setExperienceLevel(experienceLevel + 1);
        if (timer > 70) setTimer(timer - 5);
      }, 10);
    }
  }, [clone, generateFood, isPaused, experienceLevel, timer]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (!gameOver) {
          if (clone) closeModal();
          setIsPaused((prev) => !prev);
        }
        return;
      }
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
  }, [direction, gameOver, isPaused, clone, closeModal]);

  useEffect(() => {
    if (!clone) return;
    if (!clone.isExpanding && isPaused) {
      setTimeout(() => {
        setClone({ ...clone, isExpanding: true });
      }, 10);
    }
  }, [clone, isPaused]);

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
            return <Cell key={i} className={getCellClasses(x, y, snake, food, prevHeadDirection)} />
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

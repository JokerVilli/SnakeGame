import React, { useState, useEffect, useCallback } from "react";
import "./SnakeGame.css";
import "./experience/styles.css";
import ProgressBar from "./ProgressBar";
import { Position } from "./types";
import { COEF, EXPERIENCE_MAP, INITIAL_SNAKE, TIMER } from "./constants";
import { getCellClasses } from "./utils";
import { ExperienceModal } from "./ExperienceModal";
import { Cell } from "./Cell";
import { useCloneModal } from "./hooks/useCloneModal";
import { useFood } from "./hooks/useFood";
import { useControls } from "./hooks/useControls";
import Statistic from "./Statistic";
import GameBoard from "./GameBoard";

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [gameOver, setGameOver] = useState(false);
  const [greenCount, setGreenCount] = useState(0);
  const [orangeCount, setOrangeCount] = useState(0);
  const [crimsonCount, setCrimsonCount] = useState(0);

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
    setTimer,
    createClone,
  } = useCloneModal(gameOver, generateFood);
  const { direction, prevHeadDirection, setPrevHeadDirection } = useControls(
    isPaused,
    gameOver
  );

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
        if (
          EXPERIENCE_MAP.length > experienceLevel &&
          snake.length % 3 !== 0 &&
          snake.length % 2 === 0
        ) {
          createClone({
            cloneObject: document.querySelectorAll(
              ".food-board"
            )[0] as HTMLDivElement,
            experienceIndex: experienceLevel,
            fromSidebar: false,
          });
          setCrimsonCount(crimsonCount + 1);
        } else {
          if (snake.length % 3 === 0) {
            setGreenCount(greenCount + 1)
          } else {
            setOrangeCount(orangeCount + 1)
          }
          generateFood();
          if (timer > 70) setTimer(timer - 5);
        }
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameOver, direction, prevHeadDirection, setPrevHeadDirection, GRID_SIZE_X, GRID_SIZE_Y, food.x, food.y, setTimer, experienceLevel, snake.length, createClone, crimsonCount, greenCount, orangeCount, generateFood, timer]);

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
        <div className="progress-bar-container">
          <Statistic greenCount={greenCount} orangeCount={orangeCount} crimsonCount={crimsonCount} GRID_SIZE_Y={GRID_SIZE_Y} />
        </div>
        <GameBoard GRID_SIZE_X={GRID_SIZE_X} GRID_SIZE_Y={GRID_SIZE_Y}>
          {Array.from({ length: GRID_SIZE_Y * GRID_SIZE_X }).map((_, i) => {
            const x = i % GRID_SIZE_X;
            const y = Math.floor(i / GRID_SIZE_X);
            return (
              <Cell
                key={i}
                className={getCellClasses(
                  x,
                  y,
                  snake,
                  food,
                  prevHeadDirection,
                  EXPERIENCE_MAP.length,
                  EXPERIENCE_MAP.length <= experienceLevel
                )}
              />
            );
          })}
        </GameBoard>
        <div className="progress-bar-container">
          <ProgressBar
            experienceLevel={experienceLevel}
            clone={clone}
            createClone={createClone}
          />
        </div>
      </div>
      {clone && (
        <ExperienceModal
          clone={clone}
          setClone={setClone}
          isPaused={isPaused}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default SnakeGame;

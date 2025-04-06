import React, { useState, useEffect, useCallback } from "react";
import "./SnakeGame.css";
import "./experience/styles.css";
import ProgressBar from "../progress-bar/ProgressBar";
import { gameContextProps, Position } from "../../types";
import { COEF, EXPERIENCE_MAP, INITIAL_SNAKE, TIMER } from "../../constants";
import { ExperienceModal } from "../experience-modal/ExperienceModal";
import { useCloneModal } from "../../hooks/useCloneModal";
import { useFood } from "../../hooks/useFood";
import { useControls } from "../../hooks/useControls";
import Statistic from "../statistic/Statistic";
import GameBoard from "../game-board/GameBoard";
import Header from "../header/Header";
import { playSound } from "../../utils";
import waterGulpSound from './assets/sounds/water_gulp.wav';
import swipeSound from './assets/sounds/swipe.wav';
import gameOverSound from './assets/sounds/game_over.wav';

export const GameContext = React.createContext<gameContextProps | null>(null);

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [gameOver, setGameOver] = useState(false);
  const [greenCount, setGreenCount] = useState(0);
  const [orangeCount, setOrangeCount] = useState(0);
  const [crimsonCount, setCrimsonCount] = useState(0);
  const [bodyFood, setBodyFood] = useState(["crimson"]);

  const { innerWidth: width, innerHeight: height } = window;

  const GRID_SIZE_Y = Math.round(height * COEF);
  const GRID_SIZE_X = Math.round((GRID_SIZE_Y / height) * width);

  const { food, generateFood } = useFood(GRID_SIZE_X, GRID_SIZE_Y, snake);
  const {
    experienceLevel,
    clone,
    isPaused,
    timer,
    youWin,
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
        playSound(gameOverSound);
        setTimer(TIMER);
        return prevSnake;
      }

      newSnake.unshift(newHead);
      if (newHead.x === food.x && newHead.y === food.y) {
        playSound(waterGulpSound);
        if (
          EXPERIENCE_MAP.length > experienceLevel &&
          snake.length % 3 !== 0 &&
          snake.length % 2 === 0
        ) {
          createClone({
            cloneObject: document.querySelectorAll(
              ".board"
            )[0] as HTMLDivElement,
            experienceIndex: experienceLevel,
            fromSidebar: false,
          });
          setCrimsonCount(crimsonCount + 1);
          setBodyFood([...bodyFood, "crimson"]);
        } else {
          if (snake.length % 3 === 0) {
            setGreenCount(greenCount + 1);
            setBodyFood([...bodyFood, "green"]);
          } else {
            setOrangeCount(orangeCount + 1);
            setBodyFood([...bodyFood, "orange"]);
          }
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
    setPrevHeadDirection,
    GRID_SIZE_X,
    GRID_SIZE_Y,
    food.x,
    food.y,
    setTimer,
    experienceLevel,
    snake.length,
    createClone,
    crimsonCount,
    bodyFood,
    generateFood,
    timer,
    greenCount,
    orangeCount,
  ]);

  useEffect(() => {
    if (gameOver || isPaused) return;
    const interval = setInterval(moveSnake, timer);
    return () => clearInterval(interval);
  }, [moveSnake, gameOver, isPaused, timer]);

  const gameContext = {
    GRID_SIZE_X,
    GRID_SIZE_Y,
    greenCount,
    orangeCount,
    crimsonCount,
    snake,
    food,
    prevHeadDirection,
    noFood: EXPERIENCE_MAP.length <= experienceLevel,
    bodyFood,
    experienceLevel,
    clone,
    isPaused,
    gameOver,
    youWin,
    createClone,
    setClone,
    closeModal
  }

  return (
    <GameContext.Provider value={gameContext}>
      <div className="game-container">
        <Header />
        <div className="game-board-container">
          <div className="progress-bar-container">
            <Statistic
            />
          </div>
          <GameBoard />
          <div className="progress-bar-container">
            <ProgressBar />
          </div>
        </div>
        {clone && (
          <ExperienceModal />
        )}
      </div>
    </GameContext.Provider>
  );
};

export default SnakeGame;

import { useState, useCallback, useEffect } from "react";
import { CloneBox } from "../types";
import { TIMER } from "../constants";

export const useCloneModal = (
  gameOver: boolean,
  generateFood: () => void,
) => {
  const [experienceLevel, setExperienceLevel] = useState(0);
  const [clone, setClone] = useState<CloneBox | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(TIMER);

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
      if (!clone) return;
      if (!clone.isExpanding && isPaused) {
        setTimeout(() => {
          setClone({ ...clone, isExpanding: true });
        }, 10);
      }
    }, [clone, isPaused]);

  useEffect(() => {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.code === "Space") {
          if (!gameOver) {
            if (clone) closeModal();
            setIsPaused((prev) => !prev);
          }
          return;
        }
      };
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }, [gameOver, clone, closeModal, setIsPaused]);

  return { experienceLevel, clone, isPaused, timer, closeModal, setClone, setIsPaused, setTimer };
};

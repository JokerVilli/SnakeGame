import { useState, useCallback, useEffect } from "react";
import { CloneBox, createCloneParams } from "../types";
import { EXPERIENCE_MAP, TIMER } from "../constants";
import youWinSound from '../assets/sounds/you_win.wav';
import { playSound } from "../utils";

export const useCloneModal = (gameOver: boolean, generateFood: () => void) => {
  const [experienceLevel, setExperienceLevel] = useState(0);
  const [clone, setClone] = useState<CloneBox | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(TIMER);
  const [youWin, setYouWin] = useState(false);

  const closeModal = useCallback(() => {
    if (!clone) return;
    if (clone.isExpanding) {
      setTimeout(() => {
        setClone({ ...clone, isExpanding: false });
        if (isPaused) setIsPaused(false);
        if (!clone.fromSidebar) { 
          generateFood();
          setExperienceLevel(experienceLevel + 1);
          if (timer > 70) setTimer(timer - 5);
        }
      }, 10);
    }
  }, [clone, generateFood, isPaused, experienceLevel, timer]);

  const createClone = useCallback(({ cloneObject, experienceIndex, fromSidebar }: createCloneParams) => {
    setIsPaused(true);
    const newClone: CloneBox = {
      isExpanding: false,
      startX: cloneObject.getBoundingClientRect().left,
      startY: cloneObject.getBoundingClientRect().top,
      fromSidebar,
      experienceIndex,
    };
    setClone(newClone);
  }, []);

  useEffect(() => {
    if (!clone) return;
    if (!clone.isExpanding && isPaused) {
      setTimeout(() => {
        setClone({ ...clone, isExpanding: true });
      }, 10);
    }
  }, [clone, isPaused]);


  useEffect(() => {
    if (EXPERIENCE_MAP.length <= experienceLevel) {
      setYouWin(true);
      playSound(youWinSound);
    };
  }, [experienceLevel]);

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

  return {
    experienceLevel,
    clone,
    isPaused,
    timer,
    youWin,
    closeModal,
    setClone,
    setIsPaused,
    setTimer,
    createClone
  };
};

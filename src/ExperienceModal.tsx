import { useContext, useRef, useState } from "react";
import { EXPERIENCE_MAP } from "./constants";
import { gameContextProps } from "./types";
import { GameContext } from "./SnakeGame";

export const ExperienceModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  const gameContext = useContext(GameContext);
  const {
    clone,
    setClone,
    closeModal,
    isPaused
  } = gameContext as gameContextProps;

  if (!clone) return;

  const handleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>
  ) => {
    if (event.propertyName === "opacity" && !isPaused) {
      setClone(null);
      setIsAnimated(false);
    }
    if (event.propertyName === "opacity" && isPaused) {
      setIsAnimated(true);
    }
  };

  return (
    <div
      ref={modalRef}
      className={`box clone ${clone?.isExpanding ? "expanding" : ""}`}
      onTransitionEnd={(e) => handleTransitionEnd(e)}
      style={{
        left: clone?.startX,
        top: clone?.startY,
      }}
    >
      {isAnimated && EXPERIENCE_MAP[clone?.experienceIndex]}
      <div className="close-button" onClick={closeModal}>
        +
      </div>
    </div>
  );
};

import { useRef, useState } from "react";
import { EXPERIENCE_MAP } from "./constants";
import { ExperienceModalProps } from "./types";

export const ExperienceModal = ({
  clone,
  setClone,
  closeModal,
  isPaused,
  experienceLevel,
}: ExperienceModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

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
      {isAnimated && EXPERIENCE_MAP[experienceLevel]}
      <div className="close-button" onClick={closeModal}>
        +
      </div>
    </div>
  );
};

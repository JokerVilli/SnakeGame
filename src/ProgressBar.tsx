import { EXPERIENCE_MAP } from "./constants";
import "./ProgressBar.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ProgressBarProps } from "./types";

const ProgressBar = ({ experienceLevel, clone, createClone }: ProgressBarProps) => {
  const totalSteps = EXPERIENCE_MAP.length;
  const divRef = useRef<HTMLDivElement>(null);
  const [transitionEnd, setTransitionEnd] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (experienceLevel >= totalSteps) return;
  }, [experienceLevel, totalSteps]);

  useLayoutEffect(() => {
    setTransitionEnd(false);
  }, [experienceLevel]);

  useLayoutEffect(() => {
    if (!clone) setClickedIndex(null);
  }, [clone]);

  const handleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>
  ) => {
    if (event.propertyName === "opacity" && divRef.current) {
      setTransitionEnd(true);
    }
  };

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const index = Number(e.currentTarget.getAttribute("x-key"));
    setClickedIndex(index);
    createClone({
      cloneObject: e.currentTarget,
      experienceIndex: index,
      fromSidebar: true,
    })
  }

  const renderSteps = () => {
    const steps = [];

    for (let i = 1; i <= totalSteps; i++) {
      steps.push(
        <div
          ref={divRef}
          key={`circle-${i}`}
          x-key={i - 1}
          className={`circle ${i <= experienceLevel ? "active" : ""} ${clone && clickedIndex == i-1 ? "expanded" : ""}`}
          onTransitionEnd={(e) => handleTransitionEnd(e)}
          onClick={handleClick}
          style={{
            transitionDelay: i === experienceLevel && !transitionEnd ? "1s" : "0s",
          }}
        />
      );

      if (i < totalSteps) {
        steps.push(
          <div key={`line-${i}`} className="line">
            <div className={`fill ${i < experienceLevel ? "active" : ""}`} />
          </div>
        );
      }
    }

    return steps;
  };

  return (
    <div className="progress-bar">
      <div className="progress-bar-text">Start</div>
      {renderSteps()}
      <div className="progress-bar-text">Finish</div>
    </div>
  );
};

export default ProgressBar;

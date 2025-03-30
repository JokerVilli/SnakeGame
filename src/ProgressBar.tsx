import { EXPERIENCE_MAP } from "./constants";
import "./ProgressBar.css";
import { useEffect } from 'react';

const ProgressBar = ({ activeStep }: { activeStep: number}) => {
  const totalSteps = EXPERIENCE_MAP.length;

  useEffect(() => {
      if (activeStep >= totalSteps) return;
  }, [activeStep]);

  const renderSteps = () => {
    const steps = [];
    
    for (let i = 1; i <= totalSteps; i++) {
      steps.push(
        <div 
          key={`circle-${i}`}
          className={`circle ${i <= activeStep ? 'active' : ''}`}
          style={{ transitionDelay: i === activeStep ? '1s' : '0s' }}
        />
      );

      if (i < totalSteps) {
        steps.push(
          <div key={`line-${i}`} className="line">
            <div 
              className={`fill ${i < activeStep ? 'active' : ''}`}
              
            />
          </div>
        );
      }
    }
    
    return steps;
  };

  return (
    <div className="progress-bar">
      {renderSteps()}
    </div>
  );
};

// Стили можно оставить те же, добавив их в CSS-модуль или styled-components
export default ProgressBar;
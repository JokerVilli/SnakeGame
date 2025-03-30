import "./ProgressBar.css";
import { useState, useEffect } from 'react';

const ProgressBar = ({ activeStep }: { activeStep: number}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const totalSteps = 7;

  useEffect(() => {
      if (activeStep >= totalSteps - 1 || isAnimating) return;
      
      setIsAnimating(true);
      
      setIsAnimating(false);

  }, [activeStep, isAnimating]);

  const renderSteps = () => {
    const steps = [];
    
    for (let i = 0; i < totalSteps; i++) {
      steps.push(
        <div 
          key={`circle-${i}`}
          className={`circle ${i <= activeStep ? 'active' : ''}`}
          style={{ transitionDelay: i === activeStep ? '1s' : '0s' }}
        />
      );

      if (i < totalSteps - 1) {
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
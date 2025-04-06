import { useState, useEffect, useContext } from 'react';
import { animatedCirclesProps, gameContextProps } from './types';
import "./AnimatedCircles.css";
import { Cell } from './Cell';
import { GameContext } from './SnakeGame';

const AnimatedCircles = ({ isReversed = false }: animatedCirclesProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const gameContext = useContext(GameContext);
  const { GRID_SIZE_Y } = gameContext as gameContextProps;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % 3);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='circles-container' style={{ transform: `scaleX(${isReversed ? -1 : 1})`
    }}>
      {[1,2,3].map((circle, index) => (
          <Cell className='food crimson' key={index}
            style={{
              opacity: activeIndex === index ? .75 : 0,
              transition: 'opacity 1s ease-in-out',
              height: `calc(90vh/${GRID_SIZE_Y})`,
              transform: `scale(${(5-index)*0.25})`
            }} />
      ))}
    </div>
  );
};

export default AnimatedCircles;
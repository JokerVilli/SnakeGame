import React, { useState, useEffect, useCallback, useRef } from 'react';
import './SnakeGame.css';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };
interface CloneBox {
  isExpanding: boolean;
  startX: number;
  startY: number;
}

// const GRID_SIZE = 30;
const TIMER = 150;
const INITIAL_SNAKE = [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }];
const INITIAL_DIRECTION: Direction = 'RIGHT';

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>({ x: 10, y: 10 });
  const [gameOver, setGameOver] = useState(false);
  const [prevHeadDirection, setPrevHeadDirection] = useState(direction);
  const [isPaused, setIsPaused] = useState(false);
  const [clone, setClone] = useState<CloneBox | null>(null);

  const gameBoardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null)

  const coef = 0.026;

  const { innerWidth: width, innerHeight: height } = window;

  
  const GRID_SIZE_Y = Math.round(height*coef);
  const GRID_SIZE_X = Math.round((GRID_SIZE_Y/height)*width);


  const generateFood = useCallback(() => {
    const newFood = () => ({
      x: Math.floor(Math.random() * GRID_SIZE_X),
      y: Math.floor(Math.random() * GRID_SIZE_Y),
    });

    let foodPosition = newFood();
    while (snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y)) {
      foodPosition = newFood();
    }
    setFood(foodPosition);
  }, [GRID_SIZE_X, GRID_SIZE_Y, snake]);

  const getDirectionChange = (current: Position, next: Position): Direction | null => {
    const dx = next.x - current.x;
    const dy = next.y - current.y;
    
    if (dx === 1) return 'LEFT';
    if (dx === -1) return 'RIGHT';
    if (dy === 1) return 'DOWN';
    if (dy === -1) return 'UP';
    return null;
  };
  
  const getCornerClass = (prevDir: Direction, currentDir: Direction) => {
    const directions = [prevDir, currentDir].sort().join('-');
    switch(directions) {
      case 'DOWN-RIGHT': return 'corner-right-down';
      case 'DOWN-LEFT': return 'corner-left-down';
      case 'UP-RIGHT': return 'corner-right-up';
      case 'UP-LEFT': return 'corner-left-up';
      case 'RIGHT-DOWN': return 'corner-right-down'; // Для обратного порядка
      case 'RIGHT-UP': return 'corner-right-up';
      case 'LEFT-UP': return 'corner-left-up';
      case 'LEFT-DOWN': return 'corner-left-down';
      default: return '';
    }
  };

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = newSnake[0];

      const newHead = { ...head };
      switch (direction) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }
      if (direction !== prevHeadDirection) setPrevHeadDirection(direction);

      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE_X ||
        newHead.y < 0 || newHead.y >= GRID_SIZE_Y 
        ||
        newSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setGameOver(true);
        return prevSnake;
      }

      newSnake.unshift(newHead);
      if (newHead.x === food.x && newHead.y === food.y) {
        setIsPaused(true);
        const newClone: CloneBox = {
          isExpanding: false,
          startX: document.querySelectorAll('.food')[0].getBoundingClientRect().left,
          startY: document.querySelectorAll('.food')[0].getBoundingClientRect().top
        };        
        console.log(newClone)
        setClone(newClone);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameOver, direction, prevHeadDirection, GRID_SIZE_X, GRID_SIZE_Y, food.x, food.y]);

  const closeModal = useCallback(() => {
    if (clone?.isExpanding) {
      setTimeout(() => {
        setClone({ ...clone, isExpanding: false });
        generateFood();
        if (isPaused) setIsPaused(false);
      }, 10);
    }
    
  }, [clone, generateFood, isPaused])

  const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName === 'opacity' && !isPaused) {
      setClone(null);
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        if (!gameOver) {
          if (clone) closeModal();
          setIsPaused(prev => !prev);
        }
        return;
      } 
      if (!isPaused && !gameOver) {
        // Обработка стрелок
        switch (e.key) {
          case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
          case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
          case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
          case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
        }
        setPrevHeadDirection(direction);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameOver, isPaused, clone, closeModal]);

  useEffect(() => {
    if (!clone) return;
    if (!clone.isExpanding && isPaused) {
      setTimeout(() => {
        setClone({ ...clone, isExpanding: true });
      }, 10);
    }
  }, [clone, isPaused]);

  useEffect(() => {
    if (gameOver || isPaused) return;
    const interval = setInterval(moveSnake, TIMER);
    return () => clearInterval(interval);
  }, [moveSnake, gameOver, isPaused]);

  useEffect(() => {
    generateFood();
  }, []);

  const getCellClasses = (x: number, y: number) => {
    const isHead = snake[0].x === x && snake[0].y === y;
    const isBody = snake.slice(1, -1).some(segment => segment.x === x && segment.y === y);
    const isTail = snake[snake.length - 1].x === x && snake[snake.length - 1].y === y;
    const isFood = food.x === x && food.y === y;

    let classes = 'cell';
    if (isHead) classes += ` head head-${prevHeadDirection.toLowerCase()}`;
    if (isBody) classes += ' snake-body';
    if (isTail) {
      const prevSegment = snake[snake.length - 2];
      let tailDirection: Direction;
      if (prevSegment.x === x) {
        tailDirection = prevSegment.y < y ? 'UP' : 'DOWN';
      } else {
        tailDirection = prevSegment.x < x ? 'LEFT' : 'RIGHT';
      }
      classes += ` tail tail-${tailDirection.toLowerCase()}`;
    }
    if (isFood) classes += ' food';

    const isCorner = snake.slice(1, -1).some((segment, index) => {
      if (segment.x !== x || segment.y !== y) return false;
      const prevSegment = snake[index];
      const nextSegment = snake[index + 2];
      if (!prevSegment || !nextSegment) return false;
      
      const incoming = getDirectionChange(segment, prevSegment);
      const outgoing = getDirectionChange(segment, nextSegment);
      
      return incoming && outgoing && incoming !== outgoing;
    });
  
    if (isCorner) {
      const segmentIndex = snake.findIndex(s => s.x === x && s.y === y);
      const prevDir = getDirectionChange(snake[segmentIndex], snake[segmentIndex - 1]);
      const nextDir = getDirectionChange(snake[segmentIndex], snake[segmentIndex + 1]);
      
      if (prevDir && nextDir) {
        classes += ` ${getCornerClass(prevDir, nextDir)}`;
      }
    }

    return classes;
  };

  return (
    <div className="game-container">
    <div className="game-text">{gameOver ? 'game over': 'just snake it'}</div>
      <div
        ref={gameBoardRef}
        className="game-board"
        style={{
          height: '90vh',
          aspectRatio: GRID_SIZE_X/GRID_SIZE_Y,
          gridTemplateColumns: `repeat(${GRID_SIZE_X}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE_Y}, 1fr)`,
        }}
      >
        {Array.from({ length: GRID_SIZE_Y * GRID_SIZE_X }).map((_, i) => {
          const x = i % GRID_SIZE_X;
          const y = Math.floor(i / GRID_SIZE_X);
          return <div key={i} className={getCellClasses(x, y)}><div className="inner"></div></div>;
        })}
      </div>
      {/* {gameOver && <div className="game-over">Game Over!</div>} */}
      {/* {isPaused && !gameOver && <div className="paused">Paused</div>} */}
      {clone &&  (
        <div
          ref={modalRef}
          className={`box clone ${clone.isExpanding ? 'expanding' : ''}`}
          onTransitionEnd={(e) => handleTransitionEnd(e)}
          style={{
            left: clone.startX,
            top: clone.startY
          }}
        ><div className="close-button" onClick={closeModal}>+</div></div>
      )}
    </div>
  );
};

export default SnakeGame;
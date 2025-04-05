import { Direction, Position } from "./types";

export const getDirectionChange = (
    current: Position,
    next: Position
  ): Direction | null => {
    const dx = next.x - current.x;
    const dy = next.y - current.y;

    if (dx === 1) return "LEFT";
    if (dx === -1) return "RIGHT";
    if (dy === 1) return "DOWN";
    if (dy === -1) return "UP";
    return null;
  };

  export const getCornerClass = (prevDir: Direction, currentDir: Direction) => {
    const directions = [prevDir, currentDir].sort().join("-");
    switch (directions) {
      case "DOWN-RIGHT":
        return "corner-right-down";
      case "DOWN-LEFT":
        return "corner-left-down";
      case "UP-RIGHT":
        return "corner-right-up";
      case "UP-LEFT":
        return "corner-left-up";
      case "RIGHT-DOWN":
        return "corner-right-down"; // Для обратного порядка
      case "RIGHT-UP":
        return "corner-right-up";
      case "LEFT-UP":
        return "corner-left-up";
      case "LEFT-DOWN":
        return "corner-left-down";
      default:
        return "";
    }
  };

  export const getCellClasses = (x: number, y: number, snake: Position[], food: Position, prevHeadDirection: Direction, maxExperienceLevel: number, noFood: boolean) => {
    const isHead = snake[0].x === x && snake[0].y === y;
    const isBody = snake
      .slice(1, -1)
      .some((segment) => segment.x === x && segment.y === y);
    const { index: bodyCellIndex, crimsonFoodIndexesArr } = (() => {
      if (isBody) {
        const crimsonFoodIndexesArr: number[] = []; // это массив индексов вхождений малиновой еды в общее тело змеи
        const bodyCell = snake.slice(1, -1).find((segment) => segment.x === x && segment.y === y);
        const index = snake.findIndex(s => s.x === bodyCell?.x && s.y === bodyCell?.y);
        Array.from(Array(index)).map((e,i)=>i+1).forEach((el) => {
            if ((el + 1)%3 !== 0 && (el + 1)%2 === 0) {
            crimsonFoodIndexesArr.push(el)
          }
        })
      
        return { index, crimsonFoodIndexesArr}
      } return { index: 0, crimsonFoodIndexesArr: [] }
    })();
    const isTail =
      snake[snake.length - 1].x === x && snake[snake.length - 1].y === y;
    const isFood = food.x === x && food.y === y;

    let classes = "cell";
    if (isHead) classes += ` head head-${prevHeadDirection.toLowerCase()}`;
    // if (isBody) classes += " snake-body";
    // окрашиваем тело змеи в цвета съеденной еды
    if (isBody) classes += (bodyCellIndex + 1)%3 === 0 ? " snake-body food-green" : (bodyCellIndex + 1)%2 === 0 && (crimsonFoodIndexesArr.indexOf(bodyCellIndex) <= maxExperienceLevel) ? " snake-body food" : " snake-body food-orange";
    if (isTail) {
      const prevSegment = snake[snake.length - 2];
      let tailDirection: Direction;
      if (prevSegment.x === x) {
        tailDirection = prevSegment.y < y ? "UP" : "DOWN";
      } else {
        tailDirection = prevSegment.x < x ? "LEFT" : "RIGHT";
      }
      classes += ` tail tail-${tailDirection.toLowerCase()}`;
    }
    
    if (isFood) classes += snake.length%3 === 0 ? " food food-green food-board" : snake.length%2 === 0 && !(noFood) ? " food food-board" : " food food-orange food-board";

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
      const segmentIndex = snake.findIndex((s) => s.x === x && s.y === y);
      const prevDir = getDirectionChange(
        snake[segmentIndex],
        snake[segmentIndex - 1]
      );
      const nextDir = getDirectionChange(
        snake[segmentIndex],
        snake[segmentIndex + 1]
      );

      if (prevDir && nextDir) {
        classes += ` ${getCornerClass(prevDir, nextDir)}`;
      }
    }

    return classes;
  };
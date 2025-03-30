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

  export const getCellClasses = (x: number, y: number, snake: Position[], food: Position, prevHeadDirection: Direction, noFood: boolean) => {
    const isHead = snake[0].x === x && snake[0].y === y;
    const isBody = snake
      .slice(1, -1)
      .some((segment) => segment.x === x && segment.y === y);
    const isTail =
      snake[snake.length - 1].x === x && snake[snake.length - 1].y === y;
    const isFood = food.x === x && food.y === y;

    let classes = "cell";
    if (isHead) classes += ` head head-${prevHeadDirection.toLowerCase()}`;
    if (isBody) classes += " snake-body";
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
    
    if (isFood) classes += snake.length%3 === 0 ? " food food-green" : snake.length%2 === 0 && !noFood ? " food" : " food food-orange";

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
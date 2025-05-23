import { useContext } from "react";
import { GameContext } from "../snake-game/SnakeGame";
import { gameContextProps } from "../../types";
import "./Header.css";
import AnimatedCircles from "../animated-circles/AnimatedCircles";

const Header = () => {
  const gameContext = useContext(GameContext);
  const { gameOver, youWin, isPaused } = gameContext as gameContextProps;
  return (
    <div className="header">
      <div className="actions-text">{gameOver ? "F5 - restart" : "F11 - full screen"}</div>
      <div className="game-text-board">
        <AnimatedCircles isReversed />
        <div className="game-text">{gameOver ? "game over" : youWin ? "you win" : "just snake it"}</div>
        <AnimatedCircles />
      </div>
      <div className="actions-text">
        {isPaused ? "Space - continue" : "Space - pause"}
      </div>
    </div>
  );
};

export default Header;

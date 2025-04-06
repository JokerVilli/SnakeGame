import { useContext } from "react";
import { GameContext } from "./SnakeGame";
import { gameContextProps } from "./types";
import "./Header.css";
import AnimatedCircles from "./AnimatedCircles";

const Header = () => {
  const gameContext = useContext(GameContext);
  const { gameOver, youWin, isPaused } = gameContext as gameContextProps;
  return (
    <div className="header">
      <div className="actions-text">F5 - restart</div>
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

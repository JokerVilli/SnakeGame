import { useContext } from "react";
import { Cell } from "./Cell";
import "./Statistic.css";
import { GameContext } from "./SnakeGame";
import { gameContextProps } from "./types";

const Statistic = () => {
  const gameContext = useContext(GameContext);
  const { GRID_SIZE_Y, greenCount, orangeCount, crimsonCount } = gameContext as gameContextProps;
  const style = { height: `calc(90vh/${GRID_SIZE_Y})`};
  const record = localStorage.getItem('snakeRecord') as unknown as number ?? 0;
  if (greenCount+orangeCount+crimsonCount > (record as number)*1)localStorage.setItem('snakeRecord', greenCount+orangeCount+crimsonCount+'');
  return (
    <div className="statistic">
      <div className="statistic-text">Statistic</div>
      <Cell className="food green" style={style} />
      <div className="statistic-text">{greenCount}</div>
      <Cell className="food orange" style={style} />
      <div className="statistic-text">{orangeCount}</div>
      <Cell className="food crimson" style={style} />
      <div className="statistic-text">{crimsonCount}</div>
      <div className="statistic-text">Total</div>
      <div className="statistic-text">{greenCount+orangeCount+crimsonCount}</div>
      <div className="statistic-text">Record</div>
      <div className="statistic-text">{record}</div>
    </div>
  );
};

export default Statistic;

import { Cell } from "./Cell";
import "./Statistic.css";
import { StatisticProps } from "./types";

const Statistic = ({ greenCount, orangeCount, crimsonCount, GRID_SIZE_Y }: StatisticProps) => {
  const style = { height: `calc(90vh/${GRID_SIZE_Y})`, aspectRatio: 1/1};
  const record = localStorage.getItem('snakeRecord') as unknown as number ?? 0;
  if (greenCount+orangeCount+crimsonCount > (record as number)*1)localStorage.setItem('snakeRecord', greenCount+orangeCount+crimsonCount+'');
  return (
    <div className="statistic">
      <div className="statistic-text">Statistic</div>
      <Cell className="food food-green" style={style} />
      <div className="statistic-text">{greenCount}</div>
      <Cell className="food food-orange" style={style} />
      <div className="statistic-text">{orangeCount}</div>
      <Cell className="food" style={style} />
      <div className="statistic-text">{crimsonCount}</div>
      <div className="statistic-text">Total</div>
      <div className="statistic-text">{greenCount+orangeCount+crimsonCount}</div>
      <div className="statistic-text">Record</div>
      <div className="statistic-text">{record}</div>
    </div>
  );
};

export default Statistic;

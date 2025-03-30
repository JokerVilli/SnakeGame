import { useState, useEffect } from "react";
import './Grid.css';

const CELL_SIZE = 40; // 40px

const GridCell = () => {
  const [glowSide, setGlowSide] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const sides = ["top", "right", "bottom", "left"];
      const randomSide = sides[Math.floor(Math.random() * 4)];
      setGlowSide(randomSide);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getBoxShadow = () => {
    const color = "crimson";
    const blur = "0px";

    switch (glowSide) {
      case "top":
        return `0 -1px ${blur} ${color}`;
      case "right":
        return `1px 0 ${blur} ${color}`;
      case "bottom":
        return `0 1px ${blur} ${color}`;
      case "left":
        return `-1px 0 ${blur} ${color}`;
      default:
        return "";
    }
  };

  return (
    <div
      style={{
        width: CELL_SIZE,
        height: CELL_SIZE,
        transition: "box-shadow 1s ease",
        boxShadow: getBoxShadow(),
      }}
    />
  );
};

const Grid = () => {
  const [dimensions, setDimensions] = useState({
    columns: 0,
    rows: 0,
  });

  useEffect(() => {
    const updateGrid = () => {
      const columns = Math.floor(window.innerWidth / CELL_SIZE);
      const rows = Math.floor(window.innerHeight / CELL_SIZE);
      setDimensions({ columns, rows });
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${dimensions.columns}, ${CELL_SIZE}px)`,
          position: "fixed",
          border: "1px solid transparent",
          top: 0,
          left: 0,
          gap: "1px",
          overflow: "hidden",
          backgroundColor: "indigo",
        }}
      >
        {Array.from({ length: dimensions.columns * dimensions.rows }).map(
          (_, i) => (
            <GridCell key={i} />
          )
        )}
      </div>
      <div className="slogan-plate">
        <div className="slogan">SIMPLE</div>
        <div className="slogan">MINDS</div>
      </div>
    </>
  );
};

export default Grid;

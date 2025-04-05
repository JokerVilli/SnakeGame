import { Education } from "./experience/Education";
import { Education2 } from "./experience/Education2";
import { Education3 } from "./experience/Education3";
import { Education4 } from "./experience/Education4";
import { Education5 } from "./experience/Education5";
import { Education6 } from "./experience/Education6";
import { Direction } from "./types";

export const TIMER = 150;
export const COEF = 0.026;
export const INITIAL_SNAKE = [
  { x: 2, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 0 },
];
export const INITIAL_DIRECTION: Direction = "RIGHT";

export const GAMEBOARD_HEIGHT = "90vh";

export const EXPERIENCE_MAP = [<Education/>, <Education2/>, <Education3/>, <Education4/>, <Education5/>, <Education6/>]
export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type Position = { x: number; y: number };
export interface CloneBox {
  isExpanding: boolean;
  fromSidebar: boolean;
  experienceIndex: number;
  startX: number;
  startY: number;
}
export interface CellProps extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
}
export interface createCloneParams {
  cloneObject: HTMLDivElement;
  experienceIndex: number;
  fromSidebar: boolean;
}

export interface getCellClassesProps {
  x: number;
  y: number;
  snake: Position[];
  food: Position;
  prevHeadDirection: Direction;
  noFood: boolean;
  bodyFood: string[];
}

export interface animatedCirclesProps {
  isReversed?: boolean;
}

export interface gameContextProps {
  GRID_SIZE_X: number;
  GRID_SIZE_Y: number;
  greenCount: number;
  orangeCount: number;
  crimsonCount: number;
  snake: Position[];
  food: Position;
  prevHeadDirection: Direction;
  noFood: boolean;
  bodyFood: string[];
  experienceLevel: number;
  clone: CloneBox | null;
  isPaused: boolean;
  gameOver: boolean;
  youWin: boolean;
  createClone: (params: createCloneParams) => void;
  setClone: (clone: CloneBox | null) => void;
  closeModal: () => void;
}

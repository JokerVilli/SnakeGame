import { ReactNode } from "react";

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type Position = { x: number; y: number };
export interface CloneBox {
  isExpanding: boolean;
  fromSidebar: boolean;
  experienceIndex: number;
  startX: number;
  startY: number;
}
export interface ExperienceModalProps {
  clone: CloneBox | null;
  isPaused: boolean;
  setClone: (clone: CloneBox | null) => void;
  closeModal: () => void;
}
export interface GameBoardProps {
  GRID_SIZE_X: number;
  GRID_SIZE_Y: number;
  children: ReactNode;
}
export interface CellProps extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
}
export interface createCloneParams {
  cloneObject: HTMLDivElement;
  experienceIndex: number;
  fromSidebar: boolean;
}
export interface ProgressBarProps {
  experienceLevel: number;
  clone: CloneBox | null;
  createClone: (params: createCloneParams) => void;
}

export interface StatisticProps {
  greenCount: number;
  orangeCount: number;
  crimsonCount: number;
  GRID_SIZE_Y: number;
}

import { ReactNode } from "react";

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type Position = { x: number; y: number };
export interface CloneBox {
  isExpanding: boolean;
  startX: number;
  startY: number;
}
export interface ExperienceModalProps {
  clone: CloneBox | null;
  isPaused: boolean;
  experienceLevel: number;
  setClone: (clone: CloneBox | null) => void;
  closeModal: () => void;
}
export interface GameBoardProps {
    GRID_SIZE_X: number;
    GRID_SIZE_Y: number;
    children: ReactNode;
}
export interface CellProps {
    className: string;
}
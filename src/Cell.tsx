import { CellProps } from "./types";

export const Cell = ({ className }: CellProps) => (
  <div className={className}>
    <div className="inner"></div>
  </div>
);

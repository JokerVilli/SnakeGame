import { CellProps } from "./types";

export const Cell = ({ className, ...rest }: CellProps) => (
  <div className={className} {...rest}>
    <div className="inner"></div>
  </div>
);

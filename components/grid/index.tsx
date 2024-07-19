import { cn } from "@repo/ui/cn";
import grid from "./grid.module.css";
interface GridProps {
  rows: number;
  columns: number;
  className?: string
  children: React.ReactElement<CellProps>[];
}

function Grid({ rows, columns, children, className = "" }: GridProps) {
  return (
    // @ts-ignore
    <div className={cn(grid["grid"], className)} style={{ '--rows': rows, '--columns': columns }}>
      <div className={grid["grid-guides"]}>
        {Array.from({ length: rows * columns }, (_, index) => {
          // Calculate the x and y position of the cell
          const x = (index % columns) + 1;
          const y = Math.floor(index / columns) + 1;
          return (
            <div
              key={`${x}-${y}#${index}`}
              className={grid["grid-guide"]}
              // @ts-ignore
              style={{ '--x': x, '--y': y }}
            />
          );
        })}
      </div>
      {/* Cells will render here */}
      {children}
    </div>
  );
};
interface CellProps {
  row: number;
  column: number;
  children: React.ReactNode;
  className?: string
}

function Cell({ row, column, children, className = "" }: CellProps) {
  return (
    <div
      className={cn(grid["grid-cell"], className)}
      style={{ gridRow: row, gridColumn: column }}
    >
      {children}
    </div>
  );
};

export { Cell, Grid, type CellProps, type GridProps };

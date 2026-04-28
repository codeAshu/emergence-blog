"use client";

import { useEffect, useRef, useCallback } from "react";
import { useThemeColorsRef } from "./useThemeColors";

interface GameOfLifeProps {
  width?: number;
  height?: number;
  cellSize?: number;
}

export default function GameOfLife({
  width = 600,
  height = 300,
  cellSize = 4,
}: GameOfLifeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<boolean[][]>([]);
  const animationRef = useRef<number>(0);
  const themeRef = useThemeColorsRef();

  const cols = Math.floor(width / cellSize);
  const rows = Math.floor(height / cellSize);

  const createGrid = useCallback(() => {
    const grid: boolean[][] = [];
    for (let i = 0; i < cols; i++) {
      grid[i] = [];
      for (let j = 0; j < rows; j++) {
        grid[i][j] = false;
      }
    }
    return grid;
  }, [cols, rows]);

  const addGosperGliderGun = useCallback(
    (grid: boolean[][], startX: number, startY: number) => {
      const pattern = [
        [0, 4], [0, 5], [1, 4], [1, 5],
        [10, 4], [10, 5], [10, 6], [11, 3], [11, 7], [12, 2], [12, 8],
        [13, 2], [13, 8], [14, 5], [15, 3], [15, 7], [16, 4], [16, 5], [16, 6],
        [17, 5],
        [20, 2], [20, 3], [20, 4], [21, 2], [21, 3], [21, 4],
        [22, 1], [22, 5], [24, 0], [24, 1], [24, 5], [24, 6],
        [34, 2], [34, 3], [35, 2], [35, 3],
      ];

      pattern.forEach(([x, y]) => {
        const newX = startX + x;
        const newY = startY + y;
        if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
          grid[newX][newY] = true;
        }
      });

      return grid;
    },
    [cols, rows]
  );

  const countNeighbors = useCallback(
    (grid: boolean[][], x: number, y: number) => {
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const newX = x + i;
          const newY = y + j;
          if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
            count += grid[newX][newY] ? 1 : 0;
          }
        }
      }
      return count;
    },
    [cols, rows]
  );

  const nextGeneration = useCallback(
    (grid: boolean[][]) => {
      const newGrid = createGrid();
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const neighbors = countNeighbors(grid, i, j);
          if (grid[i][j]) {
            newGrid[i][j] = neighbors === 2 || neighbors === 3;
          } else {
            newGrid[i][j] = neighbors === 3;
          }
        }
      }
      return newGrid;
    },
    [cols, countNeighbors, createGrid, rows]
  );

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, grid: boolean[][]) => {
      const t = themeRef.current;

      // Trail fade matched to page background
      ctx.fillStyle = t.fadeOverlay;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (grid[i][j]) {
            const x = i * cellSize;
            const y = j * cellSize;

            const gradient = ctx.createRadialGradient(
              x + cellSize / 2, y + cellSize / 2, 0,
              x + cellSize / 2, y + cellSize / 2, cellSize * 2,
            );
            gradient.addColorStop(0, t.ink(0.45));
            gradient.addColorStop(0.5, t.ink(0.15));
            gradient.addColorStop(1, t.ink(0));
            ctx.fillStyle = gradient;
            ctx.fillRect(x - cellSize, y - cellSize, cellSize * 3, cellSize * 3);

            ctx.fillStyle = t.ink(0.95);
            ctx.fillRect(x, y, cellSize - 1, cellSize - 1);
          }
        }
      }
    },
    [cellSize, cols, height, rows, themeRef, width],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let grid = createGrid();
    grid = addGosperGliderGun(grid, 5, 10);
    grid = addGosperGliderGun(grid, 5, 50);
    gridRef.current = grid;

    ctx.fillStyle = themeRef.current.background;
    ctx.fillRect(0, 0, width, height);

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      if (frameCount % 3 === 0) {
        gridRef.current = nextGeneration(gridRef.current);
        draw(ctx, gridRef.current);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [addGosperGliderGun, createGrid, draw, height, nextGeneration, themeRef, width]);

  return (
    <div className="animation-container w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-auto"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}

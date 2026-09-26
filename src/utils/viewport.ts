import type { Point } from '@/types';

/**
 * Clamp a point so a box of the given size always stays fully
 * inside the viewport, with an optional safety margin (e.g. to avoid
 * hiding under notches/home-indicators or hugging the very edge).
 */
export function clampToViewport(
  point: Point,
  boxWidth: number,
  boxHeight: number,
  margin = 16
): Point {
  const maxX = window.innerWidth - boxWidth - margin;
  const maxY = window.innerHeight - boxHeight - margin;
  return {
    x: Math.min(Math.max(point.x, margin), Math.max(margin, maxX)),
    y: Math.min(Math.max(point.y, margin), Math.max(margin, maxY)),
  };
}

/** Euclidean distance between two points. */
export function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/**
 * Rectangles overlap check, used to keep the runaway button from
 * landing on top of the "Oui" button or the question text.
 */
export function rectsOverlap(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number }
): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

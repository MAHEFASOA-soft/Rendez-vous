import { useCallback, useRef, useState } from 'react';
import { clampToViewport, distance, rectsOverlap } from '@/utils/viewport';
import { pickEscapeMessage } from '@/utils/messages';
import type { Point } from '@/types';

interface UseRunawayButtonOptions {
  /** Ref to the button itself, used to read its live size/position. */
  buttonRef: React.RefObject<HTMLButtonElement>;
  /** Ref to the "Oui" button, kept as a no-go zone so it's never blocked. */
  safeZoneRef: React.RefObject<HTMLElement>;
  /** When false (reduced motion / not yet revealed), dodging is disabled. */
  enabled: boolean;
}

const PROXIMITY_THRESHOLD = 130; // px — how close the cursor must get to trigger a dodge
const DODGE_COOLDOWN = 420; // ms — prevents jittery re-triggering
const MAX_LEVEL = 3;

export function useRunawayButton({ buttonRef, safeZoneRef, enabled }: UseRunawayButtonOptions) {
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [level, setLevel] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const homePosition = useRef<Point | null>(null);
  const lastDodge = useRef(0);
  const lastMessage = useRef<string | undefined>(undefined);

  const dodge = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const now = performance.now();
    if (now - lastDodge.current < DODGE_COOLDOWN) return;
    lastDodge.current = now;

    const rect = btn.getBoundingClientRect();

    // Remember the button's original, static layout position once —
    // every future move is expressed as an x/y offset from that spot,
    // which is what lets us use position: fixed cleanly.
    if (!homePosition.current) {
      homePosition.current = { x: rect.left - offset.x, y: rect.top - offset.y };
    }
    const home = homePosition.current;

    const safeRect = safeZoneRef.current?.getBoundingClientRect();
    const travel = 90 + level * 70; // dodges get bolder as the level rises

    let candidate: Point | null = null;
    for (let attempt = 0; attempt < 12; attempt++) {
      const angle = Math.random() * Math.PI * 2;
      const raw: Point = {
        x: home.x + Math.cos(angle) * travel * (0.6 + Math.random() * 0.8),
        y: home.y + Math.sin(angle) * travel * (0.6 + Math.random() * 0.8),
      };
      const clamped = clampToViewport(raw, rect.width, rect.height, 20);
      const candidateRect = { x: clamped.x, y: clamped.y, width: rect.width, height: rect.height };

      if (safeRect && rectsOverlap(candidateRect, { ...safeRect, x: safeRect.left, y: safeRect.top })) {
        continue; // never land on top of "Oui"
      }
      candidate = clamped;
      break;
    }

    if (!candidate) {
      // Fallback: just clamp a small jump from home if every attempt collided.
      candidate = clampToViewport(
        { x: home.x + travel, y: home.y },
        rect.width,
        rect.height,
        20
      );
    }

    setOffset({ x: candidate.x - home.x, y: candidate.y - home.y });
    setLevel((l) => Math.min(l + 1, MAX_LEVEL));

    const next = pickEscapeMessage(lastMessage.current);
    lastMessage.current = next;
    setMessage(next);
  }, [buttonRef, safeZoneRef, level, offset]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled || e.pointerType !== 'mouse') return;
      const btn = buttonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const center: Point = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      if (distance({ x: e.clientX, y: e.clientY }, center) < PROXIMITY_THRESHOLD) {
        dodge();
      }
    },
    [enabled, buttonRef, dodge]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!enabled) return;
      // Dodge before the tap registers, so a finger never quite lands on it.
      e.preventDefault();
      dodge();
    },
    [enabled, dodge]
  );

  return {
    offset,
    level,
    message,
    hasDodged: homePosition.current !== null,
    home: homePosition.current,
    handlePointerMove,
    handleTouchStart,
  };
}

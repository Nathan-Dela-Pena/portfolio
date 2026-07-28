import { useCallback, useEffect, useRef, useState } from "react";

export const ENTER_MS = 400;
export const EXIT_MS = 440;

export const wantsReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Which note is off the board, and whether it is on its way back. The note
 * stays mounted through `closing` so it has something to animate with.
 */
export default function useLiftedNote() {
  const [openId, setOpenId] = useState(null);
  const [closing, setClosing] = useState(false);
  const timer = useRef(null);

  const lift = useCallback((id) => {
    clearTimeout(timer.current);
    setClosing(false);
    setOpenId(id);
  }, []);

  const putBack = useCallback(() => {
    clearTimeout(timer.current);
    setClosing(true);
    timer.current = setTimeout(
      () => {
        setOpenId(null);
        setClosing(false);
      },
      wantsReducedMotion() ? 0 : EXIT_MS
    );
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return { openId, closing, lift, putBack };
}

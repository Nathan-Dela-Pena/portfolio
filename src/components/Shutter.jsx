import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The window blind the board hangs behind. It raises the way a real venetian
 * blind does — the bottom rail travels up and the slats above stay put — so
 * the board is uncovered from the bottom edge first.
 *
 * Progress is one number, 0 (down) to 1 (raised), driven by a drag, a swipe,
 * a wheel, or a key. Below the release threshold it falls back down.
 */

/* A drag has to cover this share of the viewport height to raise the blind. */
const THRESHOLD = 0.26;
/* Full travel for a drag: a short pull raises it, a full-height one isn't
   needed. Divides the drag distance to give progress. */
const PULL = 0.45;

export default function Shutter({ onOpen }) {
  const [progress, setProgress] = useState(0);
  const [raised, setRaised] = useState(false);
  const [gone, setGone] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);
  const dragged = useRef(false);

  const raise = useCallback(() => {
    setRaised(true);
    setProgress(1);
    onOpen?.();
  }, [onOpen]);

  /* Kept mounted through the raise so the transition can play, then removed
     so it never sits over the board catching events. */
  useEffect(() => {
    if (!raised) return undefined;
    const timer = setTimeout(() => setGone(true), 1100);
    return () => clearTimeout(timer);
  }, [raised]);

  useEffect(() => {
    if (raised) return undefined;
    const onWheel = (event) => {
      if (event.deltaY > 4) raise();
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [raised, raise]);

  /* Listened for on the window rather than the blind itself, so a keyboard
     visitor doesn't have to tab into it first. */
  useEffect(() => {
    if (raised) return undefined;
    const onKey = (event) => {
      if (["ArrowUp", "Enter", " ", "Escape", "PageUp"].includes(event.key)) {
        event.preventDefault();
        raise();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [raised, raise]);

  const onPointerDown = (event) => {
    if (raised) return;
    dragStart.current = event.clientY;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (dragStart.current === null) return;
    const pulled = (dragStart.current - event.clientY) / (window.innerHeight * PULL);
    setProgress(Math.min(Math.max(pulled, 0), 1));
  };

  const onPointerUp = (event) => {
    if (dragStart.current === null) return;
    const pulled = (dragStart.current - event.clientY) / (window.innerHeight * PULL);
    dragStart.current = null;
    setDragging(false);
    dragged.current = Math.abs(pulled) > 0.02;
    if (pulled >= THRESHOLD) raise();
    else setProgress(0);
  };

  /* A tap raises it too, but a drag that fell short must not — the pointer
     sequence ends in a click either way. */
  const onClick = () => {
    if (dragged.current) dragged.current = false;
    else raise();
  };

  if (gone) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Raise the blind to see the board"
      className={`shutter ${raised ? "shutter-up" : ""} ${dragging ? "shutter-dragging" : ""}`}
      style={{ "--p": progress }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={raised ? undefined : onClick}
    >
      <div className="shutter-slats">
        <div className="shutter-greeting">
          <p className="shutter-line">Welcome to my portfolio</p>
          <p className="shutter-line shutter-line-b">Please swipe up to view</p>
          <span aria-hidden="true" className="shutter-chevron" />
        </div>
        <div className="shutter-rail" />
      </div>
    </div>
  );
}

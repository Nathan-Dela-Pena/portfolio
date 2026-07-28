import { useEffect, useLayoutEffect, useRef } from "react";
import Pin from "./primitives/Pin.jsx";
import { shellClass } from "../board/notes.js";
import { ENTER_MS, EXIT_MS, wantsReducedMotion } from "../hooks/useLiftedNote.js";
import Tape from "./primitives/Tape.jsx";

/**
 * Maps the lifted card onto the note still pinned to the board: same top-left,
 * same width, same tilt. Scaling by width alone keeps the paper's side edges
 * tracking exactly, which is the edge the eye actually follows.
 */
const flightPath = (from, to, rot) =>
  `translate(${from.left - to.left}px, ${from.top - to.top}px)` +
  ` scale(${from.width / to.width}) rotate(${rot}deg)`;

/**
 * A note taken off the board. Dismissed by tapping the board behind it or
 * pressing Escape — the paper is the only thing on screen, so it needs no
 * chrome of its own.
 */
export default function LiftedNote({ note, closing, onClose }) {
  const boxRef = useRef(null);
  const restingRect = useRef(null);
  const Body = note.Body;

  // Open: start sitting on the board, then rise and straighten.
  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;

    // Measured from a cleared transform so a re-run (React StrictMode calls
    // effects twice in development) reads the settled position, not a
    // half-animated one.
    box.style.transition = "none";
    box.style.transform = "none";
    restingRect.current = box.getBoundingClientRect();

    const home = document.querySelector(`[data-note="${note.id}"]`);
    if (!home || wantsReducedMotion()) return undefined;

    box.style.opacity = "0.4";
    box.style.transform = flightPath(home.getBoundingClientRect(), restingRect.current, note.rot);

    const frame = requestAnimationFrame(() => {
      box.style.transition = `transform ${ENTER_MS}ms cubic-bezier(.22,.68,.28,1), opacity ${
        ENTER_MS / 2
      }ms ease-out`;
      box.style.opacity = "1";
      box.style.transform = "none";
    });
    return () => cancelAnimationFrame(frame);
  }, [note.id, note.rot]);

  // Close: the same flight in reverse. Opacity holds until the last moment so
  // the paper stays solid for the whole journey instead of dissolving mid-air.
  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!closing || !box) return;
    if (wantsReducedMotion()) {
      box.style.opacity = "0";
      return;
    }
    const home = document.querySelector(`[data-note="${note.id}"]`);
    box.style.transition = `transform ${EXIT_MS}ms cubic-bezier(.4,.02,.3,1), opacity 150ms ease-in ${
      EXIT_MS - 150
    }ms`;
    box.style.opacity = "0";
    box.style.transform =
      home && restingRect.current
        ? flightPath(home.getBoundingClientRect(), restingRect.current, note.rot)
        : "translateY(14px) scale(.96)";
  }, [closing, note.id, note.rot]);

  // With no visible dismiss control, the paper has to take focus and then hand
  // it back to the note it came from.
  useEffect(() => {
    const { id } = note;
    boxRef.current?.focus({ preventScroll: true });
    return () => document.querySelector(`[data-note="${id}"] button`)?.focus();
  }, [note]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Put the note back on the board"
        className={`scrim absolute inset-0 bg-black/50 backdrop-blur-sm ${closing ? "scrim-out" : ""}`}
        onClick={onClose}
      />
      <div
        ref={boxRef}
        role="dialog"
        aria-modal="true"
        aria-label={note.title}
        tabIndex={-1}
        className={`lift-box relative w-full max-w-xl ${closing ? "lift-box-out" : ""}`}
      >
        <article className={`note note-flat ${shellClass(note, true)}`} style={{ "--rot": "0deg" }}>
          {note.tape && <Tape />}
          {note.kind !== "photo" && <Pin tone={note.stock} />}  
          <Body data={note.data} />
        </article>
      </div>
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";

import Header from "./components/Header.jsx";
import Board from "./components/Board.jsx";
import LiftedNote from "./components/LiftedNote.jsx";
import Shutter from "./components/Shutter.jsx";

import useCamera from "./hooks/useCamera.js";
import useLiftedNote from "./hooks/useLiftedNote.js";
import { TARGETS } from "./board/geometry.js";
import { noteById } from "./board/notes.js";

/**
 * Three levels of attention:
 *   0. Overview — the whole framed board fits the screen.
 *   1. Section  — the camera pans and scales to one cluster.
 *   2. Note     — a note lifts off the board, readable at any screen size.
 */
export default function App() {
  const viewportRef = useRef(null);
  const [view, setView] = useState("overview");
  const [touched, setTouched] = useState(false);
  /* The board starts behind the blind; nothing else listens until it's up. */
  const [covered, setCovered] = useState(true);

  const camera = useCamera(viewportRef, TARGETS[view] || TARGETS.overview);
  const { openId, closing, lift, putBack } = useLiftedNote();

  const handleLift = useCallback(
    (id) => {
      lift(id);
      setTouched(true);
    },
    [lift]
  );

  const zoomTo = useCallback(
    (id) => {
      putBack();
      setView(id);
      setTouched(true);
    },
    [putBack]
  );

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== "Escape" || covered) return;
      if (openId) putBack();
      else setView("overview");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId, putBack, covered]);

  const lifted = openId ? noteById(openId) : null;

  return (
    <div className="board-room flex h-full flex-col overflow-hidden">
      <Header view={view} onZoom={zoomTo} />

      <div ref={viewportRef} className="relative flex-1 overflow-hidden">
        <Board camera={camera} onLift={handleLift} />

        {!touched && !covered && (
          <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-sm bg-black/60 px-3 py-1.5 text-center font-mono text-xs uppercase tracking-widest text-white">
            Pick a section above, or tap a note to read it
          </p>
        )}
      </div>

      {lifted && <LiftedNote note={lifted} closing={closing} onClose={putBack} />}

      <Shutter onOpen={() => setCovered(false)} />
    </div>
  );
}

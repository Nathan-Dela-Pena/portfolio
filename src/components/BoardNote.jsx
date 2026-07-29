import Pin from "./primitives/Pin.jsx";
import Tape from "./primitives/Tape.jsx";
import { openLabel, shellClass } from "../board/notes.js";

/** A single item pinned to the cork. The transparent overlay button is what
    makes the whole sheet a zoom target while keeping the markup valid. */
export default function BoardNote({ note, onLift }) {
  const Body = note.Body;

  return (
    <div style={{ width: note.w, paddingTop: 18 }}>
      <article
        data-note={note.id}
        className={`note ${shellClass(note, false)}`}
        style={{ "--rot": `${note.rot}deg`, "--crop": note.crop }}
      >
      {note.tape && <Tape />}
      {!note.tape && note.kind !== "photo" && <Pin tone={note.stock} />}
        <Body data={note.data} />
        <button type="button" className="board-hit absolute inset-0" onClick={() => onLift(note.id)}>
          <span className="sr-only">
            {openLabel(note)}: {note.title}
          </span>
        </button>
      </article>
    </div>
  );
}

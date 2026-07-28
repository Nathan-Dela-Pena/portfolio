import BoardNote from "./BoardNote.jsx";
import { notesIn } from "../board/notes.js";

/** One section's worth of notes, laid out inside its rectangle on the board. */
export default function Cluster({ section, onLift }) {
  const { x, y, w, h } = section.rect;

  return (
    <div
      className="absolute flex flex-wrap content-start"
      style={{ left: x, top: y, width: w, height: h, gap: 30 }}
    >
      {notesIn(section.id).map((note) => (
        <BoardNote key={note.id} note={note} onLift={onLift} />
      ))}
    </div>
  );
}

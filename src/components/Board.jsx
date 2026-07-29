import Cluster from "./Cluster.jsx";
import { BOARD, FRAME, KEEPSAKES, OVERVIEW, SECTIONS } from "../board/geometry.js";

/** The framed board itself, positioned entirely by the camera transform. */
export default function Board({ camera, onLift }) {
  return (
    <div
      className="board-stage absolute left-0 top-0"
      style={{ transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})` }}
    >
      <div className="board-frame" style={{ width: OVERVIEW.w, height: OVERVIEW.h, padding: FRAME }}>
        <div className="board-cork relative" style={{ width: BOARD.w, height: BOARD.h }}>
          {[...SECTIONS, ...KEEPSAKES].map((section) => (
            <Cluster key={section.id} section={section} onLift={onLift} />
          ))}
        </div>
      </div>
    </div>
  );
}

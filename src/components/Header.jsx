import { PROFILE } from "../data/profile.js";
import { SECTIONS } from "../board/geometry.js";

export default function Header({ view, onZoom }) {
  return (
    <header className="relative z-40 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-black/10 bg-white/40 px-4 py-3 backdrop-blur-sm sm:px-6">
      <button type="button" onClick={() => onZoom("overview")} className="font-hand text-2xl font-bold leading-none">
        {PROFILE.name}
      </button>

      <nav aria-label="Board sections" className="flex flex-1 flex-wrap items-center justify-end gap-x-4 gap-y-1">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => onZoom(section.id)}
            aria-current={view === section.id ? "true" : undefined}
            className={`nav-link font-mono text-xs font-bold uppercase tracking-widest ${
              view === section.id ? "nav-link-on" : ""
            }`}
            style={{ "--hl": `var(--${section.accent})` }}
          >
            <span>{section.label}</span>
          </button>
        ))}

        <button
          type="button"
          onClick={() => onZoom("overview")}
          disabled={view === "overview"}
          className="rounded-sm border border-black/25 px-2 py-1 font-mono text-xs font-bold uppercase tracking-widest disabled:opacity-30"
        >
          Whole board
        </button>
      </nav>
    </header>
  );
}

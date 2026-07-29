/**
 * Everything here is in board coordinates — a fixed-size world the camera
 * scales into the viewport. Positions never change with screen size; only the
 * camera does. That is what keeps the layout identical on every device.
 */

export const BOARD = { w: 2620, h: 1800 };
export const FRAME = 46;

/** Each section's accent is the stock its notes are pinned on, so the header
    highlight tells you which colour to look for on the board. */
export const SECTIONS = [
  { id: "who", label: "Who", accent: "lilac", rect: { x: 60, y: 60, w: 760, h: 800 } },
  { id: "work", label: "Work", accent: "canary", rect: { x: 880, y: 60, w: 1180, h: 780 } },
  { id: "stack", label: "Stack", accent: "mint", rect: { x: 2120, y: 60, w: 440, h: 900 } },
  { id: "builds", label: "Projects", accent: "sky", rect: { x: 60, y: 920, w: 1180, h: 820 } },
  { id: "leadership", label: "Leadership", accent: "blush", rect: { x: 1300, y: 920, w: 740, h: 720 } },
  { id: "contact", label: "Contact", accent: "peach", rect: { x: 2120, y: 1160, w: 440, h: 580 } },
];

/** Keepsakes — a poster and a ticket stub tacked into the two pockets of bare
    cork the sections leave behind. They're deliberately not in SECTIONS: they
    fill the board out visually but don't earn a place in the nav, and the
    camera never targets them. */
export const KEEPSAKES = [
  { id: "keepsake-poster", rect: { x: 1375, y: 1280, w: 300, h: 480 } },
  { id: "keepsake-show", rect: { x: 1700, y: 1290, w: 340, h: 490 } },
  { id: "keepsake-ticket", rect: { x: 2120, y: 1500, w: 440, h: 260 } },
];

export const OVERVIEW ={ x: 0, y: 0, w: BOARD.w + FRAME * 2, h: BOARD.h + FRAME * 2 };

/** Cluster rects are cork-relative; the camera works in frame-inclusive space.
    Built once so every camera target keeps a stable identity across renders —
    a fresh object each render would retrigger the layout effect in a loop. */
const toOuter = (r) => ({ x: r.x + FRAME, y: r.y + FRAME, w: r.w, h: r.h });

export const TARGETS = SECTIONS.reduce((acc, section) => ({ ...acc, [section.id]: toOuter(section.rect) }), {
  overview: OVERVIEW,
});

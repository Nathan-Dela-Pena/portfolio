import { PROFILE } from "../data/profile.js";
import { MEDIA } from "../data/media.js";
import { EXPERIENCE } from "../data/experience.js";
import { PROJECTS } from "../data/projects.js";
import { LEADERSHIP } from "../data/leadership.js";
import { STACK } from "../data/stack.js";

import IntroBody from "../components/bodies/IntroBody.jsx";
import StatsBody from "../components/bodies/StatsBody.jsx";
import PhotoBody from "../components/bodies/PhotoBody.jsx";
import JobBody from "../components/bodies/JobBody.jsx";
import ProjectBody from "../components/bodies/ProjectBody.jsx";
import RoleBody from "../components/bodies/RoleBody.jsx";
import StackBody from "../components/bodies/StackBody.jsx";
import ContactBody from "../components/bodies/ContactBody.jsx";
import ScrapBody from "../components/bodies/ScrapBody.jsx";

/**
 * The registry: what binds a piece of data to the component that renders it
 * and the cluster it is pinned in. The board and the lifted view both read
 * from here, so a note's content exists in exactly one place.
 *
 *   id      unique; also the DOM handle the lift animation flies home to
 *   section which cluster it belongs to
 *   stock   paper colour (see styles/paper.css)
 *   kind    "photo" for a polaroid; omitted for ordinary paper
 *   w       width in board coordinates
 *   rot     resting tilt in degrees
 */
export const NOTES = [
  { id: "intro", section: "who", stock: "paper", w: 700, rot: -1.3, title: PROFILE.name, Body: IntroBody },
  {
    id: "stats",
    section: "who",
    stock: "lilac",
    w: 330,
    rot: 2.6,
    tape: true,
    title: "By the numbers",
    Body: StatsBody,
  },
  {
    id: "photo-team",
    section: "who",
    kind: "photo",
    w: 330,
    rot: 2.2,
    tape: true,
    title: "Senior Design, 1st place",
    data: {
      image: MEDIA.seniorDesign,
      caption: "Senior Design '26 — 1st place",
      alt: "The Fomo team holding framed first-place awards at the Senior Design competition",
    },
    Body: PhotoBody,
  },

  ...EXPERIENCE.map((data, i) => ({
    id: data.id,
    section: "work",
    stock: "canary",
    w: 550,
    rot: [-1.6, 1.4, 1.1, -2][i],
    tape: i === 1,
    title: data.role,
    data,
    Body: JobBody,
  })),

  ...PROJECTS.map((data, i) => ({
    id: data.id,
    section: "builds",
    stock: "sky",
    w: 366,
    rot: [1.8, -1.5, 1.2][i],
    tape: i === 0,
    title: data.name,
    data,
    Body: ProjectBody,
  })),

  ...LEADERSHIP.map((data, i) => ({
    id: data.id,
    section: "leadership",
    stock: "blush",
    w: 350,
    rot: [-1.7, 1.6][i],
    title: data.role,
    data,
    Body: RoleBody,
  })),

  ...STACK.map((data, i) => ({
    id: data.id,
    section: "stack",
    stock: "mint",
    w: 204,
    rot: [-2, 1.7, 1.5, -1.6][i],
    title: data.group,
    data,
    Body: StackBody,
  })),

  {
    id: "contact",
    section: "contact",
    stock: "peach",
    w: 440,
    rot: -1.9,
    tape: true,
    title: "Contact",
    Body: ContactBody,
  },

  {
    id: "poster-gnt",
    section: "keepsake-poster",
    kind: "scrap",
    // Cropped to a stub's proportions. The source is a 2:3 poster, so this
    // trims the side margins only — the centred tour lockup survives.
    crop: 0.5,
    w: 225,
    rot: -2.4,
    title: "Grand National Tour",
    data: {
      image: MEDIA.tourPoster,
      alt: "Kendrick Lamar and SZA Grand National Tour poster",
    },
    Body: ScrapBody,
  },
  {
    id: "photo-chromakopia",
    section: "keepsake-show",
    kind: "photo",
    w: 300,
    rot: -1.8,
    tape: true,
    title: "Chromakopia tour",
    data: {
      image: MEDIA.chromakopia,
      caption: "Chromakopia tour",
      alt: "The Chromakopia stage set lit green above the crowd before the show",
    },
    Body: PhotoBody,
  },
  {
    id: "ticket-rome",
    section: "keepsake-ticket",
    kind: "scrap",
    cutout: true,
    w: 420,
    rot: 2.6,
    tape: true,
    title: "Colosseum ticket, Rome",
    data: {
      image: MEDIA.colosseumTicket,
      alt: "Ticket stub for the Colosseum and Roman Forum, Rome, dated 26 April 2016",
    },
    Body: ScrapBody,
  },
];

export const notesIn = (sectionId) => NOTES.filter((note) => note.section === sectionId);
export const noteById = (id) => NOTES.find((note) => note.id === id);

/** A polaroid and a keepsake both carry their own edge, so neither takes a
    paper stock or inner padding. */
export const shellClass = (note, lifted) => {
  if (note.kind === "photo") return "polaroid";
  if (note.kind === "scrap") {
    return ["scrap", note.cutout && "scrap-cutout", note.crop && "scrap-crop"].filter(Boolean).join(" ");
  }
  return `stock-${note.stock} ${lifted ? "px-6 pb-8 pt-10 sm:px-8" : "px-5 pb-6 pt-9"}`;
};

/** Photos and keepsakes are looked at; everything else is read. */
export const openLabel = (note) => (note.kind === "photo" || note.kind === "scrap" ? "Look closer" : "Read note");

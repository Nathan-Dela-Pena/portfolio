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
];

export const notesIn = (sectionId) => NOTES.filter((note) => note.section === sectionId);
export const noteById = (id) => NOTES.find((note) => note.id === id);

/** A polaroid needs no paper stock and no inner padding of its own. */
export const shellClass = (note, lifted) =>
  note.kind === "photo"
    ? "polaroid"
    : `stock-${note.stock} ${lifted ? "px-6 pb-8 pt-10 sm:px-8" : "px-5 pb-6 pt-9"}`;

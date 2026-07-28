import Meta from "../primitives/Meta.jsx";
import { PROFILE } from "../../data/profile.js";

export default function IntroBody() {
  return (
    <div className="relative pl-7">
      {/* the red margin rule down an index card */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-1 top-0 w-px"
        style={{ background: "rgba(196,94,84,.5)" }}
      />
      <Meta>{PROFILE.location}</Meta>
      <h1 className="font-hand text-6xl font-bold leading-none">{PROFILE.name}</h1>
      <p className="mt-3 font-mono text-sm font-bold uppercase tracking-widest opacity-75">{PROFILE.role}</p>
      <p className="mt-5 text-base leading-relaxed">{PROFILE.thesis}</p>
    </div>
  );
}

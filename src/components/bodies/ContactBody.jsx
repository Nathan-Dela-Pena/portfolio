import { PROFILE } from "../../data/profile.js";

const CHANNELS = [
  ["Email", PROFILE.email, `mailto:${PROFILE.email}`],
  ["GitHub", PROFILE.github, `https://${PROFILE.github}`],
  ["LinkedIn", PROFILE.linkedin, `https://${PROFILE.linkedin}`],
  ["Resume", "Download PDF", PROFILE.resume],
];

export default function ContactBody() {
  return (
    <>
      <h2 className="font-hand text-4xl font-bold leading-none">Take a note.</h2>
      <p className="mb-4 mt-3 text-sm leading-relaxed">
        Happy to go into more detail regarding any of my projects or experiences!
      </p>
      <ul className="space-y-2 font-mono text-sm">
        {CHANNELS.map(([label, value, href]) => (
          <li key={label}>
            <span className="mr-2 text-xs uppercase tracking-widest opacity-60">{label}</span>
            <a className="underline decoration-dotted underline-offset-4" href={href}>
              {value}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

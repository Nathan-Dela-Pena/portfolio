import Meta from "../primitives/Meta.jsx";
import Bullets from "../primitives/Bullets.jsx";

export default function ProjectBody({ data }) {
  return (
    <>
      {data.image && (
        <figure
          className="print mx-auto mb-5"
          style={{ "--print-rot": data.printRotation, "--print-w": data.printWidth }}
        >
          <img src={data.image} alt={data.imageAlt} />
        </figure>
      )}

      <Meta>{data.dates}</Meta>
      <h3 className="font-hand text-4xl font-bold leading-none">{data.name}</h3>
      {data.award && (
        <p className="mt-1 font-hand text-2xl font-semibold" style={{ color: "#A83C28" }}>
          ★ {data.award}
        </p>
      )}

      <div className="mt-3">
        <Bullets items={data.bullets} />
      </div>

      <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-black/10 pt-3">
        {data.tech.map((tool) => (
          <li
            key={tool}
            className="rounded-sm border border-black/20 px-1.5 py-0.5 font-mono text-xs opacity-75"
          >
            {tool}
          </li>
        ))}
      </ul>

      {data.href && (
        <a
          href={data.href}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 rounded-sm border border-black/30 bg-white/60 px-3 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-colors hover:bg-white"
        >
          {data.linkLabel}
          <span aria-hidden="true">↗</span>
        </a>
      )}
    </>
  );
}

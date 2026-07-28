import Meta from "../primitives/Meta.jsx";
import Bullets from "../primitives/Bullets.jsx";

export default function RoleBody({ data }) {
  return (
    <>
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <Meta>{data.dates}</Meta>
        {data.current && (
          <span className="rounded-sm bg-black/75 px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-white">
            now
          </span>
        )}
      </div>
      <h3 className="font-hand text-3xl font-bold leading-tight">{data.role}</h3>
      <p className="mb-3 mt-1 font-mono text-xs uppercase tracking-wider opacity-70">{data.org}</p>
      <Bullets items={data.bullets} />
    </>
  );
}

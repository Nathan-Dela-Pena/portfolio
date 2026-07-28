import { STATS } from "../../data/profile.js";

export default function StatsBody() {
  return (
    <>
      <h2 className="mb-3 font-hand text-3xl font-bold">By the numbers</h2>
      <dl className="space-y-2 text-sm">
        {STATS.map(([label, value]) => (
          <div
            key={label}
            className="flex items-baseline justify-between gap-3 border-b border-black/10 pb-2"
          >
            <dt>{label}</dt>
            <dd className="font-hand text-3xl font-bold">{value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

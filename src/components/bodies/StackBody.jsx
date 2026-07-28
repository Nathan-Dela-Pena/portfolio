export default function StackBody({ data }) {
  return (
    <>
      <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest opacity-70">{data.group}</h3>
      <ul className="space-y-1 font-hand text-2xl font-semibold leading-snug">
        {data.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

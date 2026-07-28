export default function Bullets({ items }) {
  return (
    <ul className="space-y-2 text-sm leading-relaxed">
      {items.map((line) => (
        <li key={line} className="flex gap-2">
          <span aria-hidden="true" className="opacity-40">
            —
          </span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

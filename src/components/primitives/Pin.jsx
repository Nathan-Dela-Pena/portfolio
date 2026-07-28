const PIN_TONES = {
  canary: "#C8503C",
  blush: "#3F6FA8",
  sky: "#C8483A",
  mint: "#B4562F",
  peach: "#3F6FA8",
  lilac: "#3F8A5C",
  paper: "#C8503C",
};

export default function Pin({ tone }) {
  return <span aria-hidden="true" className="pin" style={{ "--pin": PIN_TONES[tone] || PIN_TONES.canary }} />;
}

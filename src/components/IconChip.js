export default function IconChip({ icon, bg, size = 28, radius = 8, fontSize = 14, border }) {
  return (
    <span className="icon-chip" style={{ width: size, height: size, borderRadius: radius, background: bg, fontSize, border }}>
      {icon}
    </span>
  );
}

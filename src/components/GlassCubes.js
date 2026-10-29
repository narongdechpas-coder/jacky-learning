// ภาพสำรองแบบลูกบาศก์แก้ว (ใช้ระหว่างที่ยังไม่มีภาพ 3D จริง)
const S = 0.866; // cos 30° สำหรับมุมมอง isometric

function Cube({ x, y, s, o = 1 }) {
  const top = `${x},${y - s} ${x + S * s},${y - s / 2} ${x},${y} ${x - S * s},${y - s / 2}`;
  const left = `${x - S * s},${y - s / 2} ${x},${y} ${x},${y + s} ${x - S * s},${y + s / 2}`;
  const right = `${x},${y} ${x + S * s},${y - s / 2} ${x + S * s},${y + s / 2} ${x},${y + s}`;
  return (
    <g opacity={o} stroke="#fff" strokeOpacity=".75" strokeWidth="1.5" strokeLinejoin="round">
      <polygon points={top} fill="url(#gc-top)" />
      <polygon points={left} fill="url(#gc-left)" />
      <polygon points={right} fill="url(#gc-right)" />
    </g>
  );
}

export default function GlassCubes({ className }) {
  return (
    <svg className={className} viewBox="0 0 480 320" role="img" aria-label="ภาพประกอบลูกบาศก์แก้ว">
      <defs>
        <radialGradient id="gc-glow" cx="50%" cy="55%" r="50%">
          <stop offset="0" stopColor="#c6e7ff" stopOpacity=".9" />
          <stop offset="1" stopColor="#c6e7ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gc-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c6e7ff" />
        </linearGradient>
        <linearGradient id="gc-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b8cff" />
          <stop offset="1" stopColor="#2f6bff" />
        </linearGradient>
        <linearGradient id="gc-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a9b4ff" />
          <stop offset="1" stopColor="#7c8dff" />
        </linearGradient>
      </defs>
      <ellipse cx="250" cy="175" rx="210" ry="140" fill="url(#gc-glow)" />
      <Cube x={130} y={210} s={46} o={0.85} />
      <Cube x={360} y={225} s={38} o={0.8} />
      <Cube x={250} y={150} s={84} />
      <Cube x={385} y={95} s={26} o={0.7} />
      <Cube x={110} y={95} s={20} o={0.6} />
      <circle cx="320" cy="60" r="7" fill="#7c8dff" opacity=".5" />
      <circle cx="175" cy="280" r="5" fill="#2f6bff" opacity=".35" />
      <circle cx="430" cy="160" r="4" fill="#2f6bff" opacity=".4" />
    </svg>
  );
}

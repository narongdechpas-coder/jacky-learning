import Link from 'next/link';

// แถบบอกตำแหน่ง Phase ในคอร์ส (กดไป Phase อื่นได้)
export default function PhaseRail({ slug, phases, current }) {
  return (
    <nav className="phase-rail" aria-label="Phase ในคอร์สนี้">
      {phases.map((p) => {
        const on = String(p.id) === String(current);
        return (
          <Link key={p.id} href={`/courses/${slug}/phase/${p.id}/`} className={`phase-rail__dot${on ? ' is-on' : ''}`}
            style={on ? { background: p.color, borderColor: p.color } : { color: p.color }}
            title={`Phase ${p.id}: ${p.title}`} aria-current={on ? 'page' : undefined}>
            {p.id}
          </Link>
        );
      })}
    </nav>
  );
}

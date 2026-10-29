import Link from 'next/link';

// เส้นทางนำทาง: items = [{ href, label }] ตัวสุดท้ายไม่มี href
export default function Crumbs({ items }) {
  return (
    <p className="doc-crumb">
      {items.map((it, i) => (
        <span key={i}>
          {i > 0 && <span className="sep">›</span>}
          {it.href ? <Link href={it.href}>{it.label}</Link> : <span style={i === items.length - 1 ? { color: 'var(--c-deep-navy)' } : undefined}>{it.label}</span>}
        </span>
      ))}
    </p>
  );
}

'use client';
// เมนูด้านซ้ายของหน้าบทเรียน (เดสก์ท็อป = ติดข้าง, มือถือ = ปุ่ม ☰ เลื่อนออกมา)
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Sidebar({ course }) {
  const pathname = usePathname() || '';
  const [collapsed, setCollapsed] = useState({});
  const [open, setOpen] = useState(false);
  const base = `/courses/${course.slug}`;

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isPhaseActive = (pid) => pathname.startsWith(`${base}/phase/${pid}/`);
  const isWeekActive = (pid, wid) => pathname.replace(/\/$/, '') === `${base}/phase/${pid}/week/${wid}`;

  const nav = (
    <nav style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div className="docs-sidebar-head">
        <Link href={`${base}/`} onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--c-deep-navy)', letterSpacing: '-0.01em' }}>{course.shortTitle}</span>
        </Link>
        <Link href="/courses/" onClick={() => setOpen(false)} style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--c-navy-60)', marginTop: 3 }}>
          ← คอร์สทั้งหมด
        </Link>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.625rem 0 4rem 0' }}>
        {course.phases.map((p) => {
          const active = isPhaseActive(p.id);
          const expanded = collapsed[p.id] !== true;
          return (
            <div key={p.id}>
              <button
                onClick={() => setCollapsed((c) => ({ ...c, [p.id]: !c[p.id] }))}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '5px 14px', fontSize: '0.8rem',
                  fontWeight: active ? 700 : 500, color: active ? 'var(--c-electric-blue)' : 'var(--c-deep-navy)',
                  background: 'transparent', border: 'none', borderLeft: `2px solid ${active ? 'var(--c-electric-blue)' : 'transparent'}`,
                  cursor: 'pointer', textAlign: 'left', transition: 'color 0.15s', marginTop: 4,
                }}
              >
                <span style={{ width: 20, height: 20, borderRadius: 5, background: p.bgColor, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>{p.icon}</span>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</span>
                <span style={{ fontSize: 9, color: 'var(--c-navy-60)', flexShrink: 0 }}>{expanded ? '▾' : '▸'}</span>
              </button>
              {expanded && (
                <div style={{ paddingLeft: 6, marginBottom: 4 }}>
                  {p.weeks.map((w) => (
                    <Link
                      key={w.id}
                      href={`${base}/phase/${p.id}/week/${w.id}/`}
                      onClick={() => setOpen(false)}
                      className={`docs-sidebar-link${isWeekActive(p.id, w.id) ? ' is-active' : ''}`}
                    >
                      <span className="docs-sidebar-num">{w.isWorkshop ? `Workshop ${w.workshopLetter}` : (w.weekLabel || w.id)}</span>
                      <span style={{ flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{w.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );

  return (
    <>
      <button
        className="only-mobile"
        style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 50, padding: '0.375rem 0.625rem', borderRadius: 6, background: 'var(--color-surface)', border: '1px solid var(--c-navy-12)', color: 'var(--c-deep-navy)', fontSize: 14, cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
        aria-label="เปิด/ปิดเมนู"
      >
        {open ? '✕' : '☰'}
      </button>
      {open && <div className="only-mobile" style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.35)' }} onClick={() => setOpen(false)} />}
      <aside
        className="only-mobile docs-sidebar"
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 45, height: '100dvh', width: 280, display: 'flex', flexDirection: 'column', transform: open ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)', overflow: 'hidden' }}
      >
        {nav}
      </aside>
      <aside className="only-desktop docs-sidebar" style={{ width: 255, flexShrink: 0, height: '100vh', position: 'sticky', top: 0, overflow: 'hidden', flexDirection: 'column' }}>
        {nav}
      </aside>
    </>
  );
}

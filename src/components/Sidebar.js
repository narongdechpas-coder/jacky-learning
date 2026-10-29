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
        <Link href={`${base}/`} onClick={() => setOpen(false)} className="docs-sidebar-course">
          <span className="docs-sidebar-phase__icon" style={{ background: course.phases[0].bgColor, width: 30, height: 30, fontSize: 15, borderRadius: 9 }}>{course.icon}</span>
          <span>{course.shortTitle}</span>
        </Link>
        <Link href="/courses/" onClick={() => setOpen(false)} className="docs-sidebar-back">← คอร์สทั้งหมด</Link>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0 4rem 0' }}>
        {course.phases.map((p) => {
          const active = isPhaseActive(p.id);
          const expanded = collapsed[p.id] !== true;
          return (
            <div key={p.id}>
              <button onClick={() => setCollapsed((c) => ({ ...c, [p.id]: !c[p.id] }))} className={`docs-sidebar-phase${active ? ' is-active' : ''}`} aria-expanded={expanded}>
                <span className="docs-sidebar-phase__icon" style={{ background: p.bgColor }}>{p.icon}</span>
                <span className="docs-sidebar-phase__title">{p.title}</span>
                <span className="docs-sidebar-phase__caret">{expanded ? '▾' : '▸'}</span>
              </button>
              {expanded && (
                <div style={{ marginBottom: 4 }}>
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
        className="only-mobile docs-menu-btn"
        onClick={() => setOpen(!open)}
        aria-label="เปิด/ปิดเมนู"
      >
        {open ? '✕' : '☰'}
      </button>
      {open && <div className="only-mobile" style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(23,43,77,0.35)' }} onClick={() => setOpen(false)} />}
      <aside
        className="only-mobile docs-sidebar"
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 45, height: '100dvh', width: 280, display: 'flex', flexDirection: 'column', transform: open ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)', overflow: 'hidden' }}
      >
        {nav}
      </aside>
      <aside className="only-desktop docs-sidebar" style={{ width: 272, flexShrink: 0, height: '100vh', position: 'sticky', top: 0, overflow: 'hidden', flexDirection: 'column' }}>
        {nav}
      </aside>
    </>
  );
}

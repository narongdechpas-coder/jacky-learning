'use client';
// ช่องค้นหาบทเรียน: ค้นจากชื่อคอร์ส ชื่อ Phase และชื่อบท (ไม่ได้ค้นในเนื้อหาบท)
import { useState } from 'react';
import Link from 'next/link';

export default function CourseSearch({ items }) {
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  // บทที่ชื่อตรงคำค้นขึ้นก่อน ตามด้วยบทที่ตรงแค่ชื่อคอร์สหรือ Phase
  const hits = query
    ? items
      .filter((it) => `${it.course} ${it.phase} ${it.label} ${it.title}`.toLowerCase().includes(query))
      .sort((a, b) => Number(!a.title.toLowerCase().includes(query)) - Number(!b.title.toLowerCase().includes(query)))
      .slice(0, 12)
    : [];

  return (
    <div className="search">
      <label className="search__box">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m20 20-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="ค้นหาบทเรียน เช่น Pivot, Prompt, Deploy" aria-label="ค้นหาบทเรียน" />
      </label>
      {query && (
        <div className="search__results">
          {hits.length === 0 && <p className="search__empty">ไม่พบบทที่ชื่อมีคำว่า “{q.trim()}”</p>}
          {hits.map((it) => (
            <Link key={it.href} href={it.href} className="search__hit">
              <span className="search__dot" style={{ background: it.color }} />
              <span>
                <span className="search__meta">{it.course} · Phase {it.phaseId} · {it.label}</span>
                <span className="search__title">{it.title}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

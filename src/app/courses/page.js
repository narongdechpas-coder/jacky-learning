// หน้ารวมคอร์สออนไลน์ทั้งหมด
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Crumbs from '@/components/Crumbs';
import IconChip from '@/components/IconChip';
import Stat from '@/components/Stat';
import { getAllCourses, fmtHours } from '@/lib/content';

export const metadata = { title: 'Online Training Course' };

export default function CoursesPage() {
  const courses = getAllCourses();
  const hours = courses.reduce((s, c) => s + c.stats.hours, 0);
  return (
    <div className="page-shell">
      <SiteHeader active="courses" />
      <main className="page-main">
        <Crumbs items={[{ href: '/', label: 'หน้าแรก' }, { label: 'Online Training Course' }]} />
        <h1 className="doc-title" style={{ marginBottom: '0.75rem' }}>Online Training Course</h1>
        <p className="lead">คอร์สออนไลน์แบบเรียนทีละสัปดาห์ ทุกคอร์สใช้โครงเดียวกัน: เนื้อหาหลัก → Prompt สำเร็จรูป → Workshop → Acceptance Criteria</p>
        <div className="stat-row">
          <Stat value={courses.length} label="คอร์ส" />
          <Stat value={courses.reduce((s, c) => s + c.stats.phases, 0)} label="Phases" />
          <Stat value={`~${fmtHours(hours)}`} label="ชั่วโมงโดยประมาณ" />
        </div>
        <section>
          <h2 className="section-title">คอร์สทั้งหมด</h2>
          <div className="card-grid">
            {courses.map((c, i) => (
              <Link key={c.slug} href={`/courses/${c.slug}/`} className="phase-card">
                <p className="phase-card__eyebrow">คอร์ส {String(i + 1).padStart(2, '0')}</p>
                <div className="phase-card__title">
                  <IconChip icon={c.icon} bg={c.phases[0].bgColor} />
                  <span>{c.title}</span>
                </div>
                <p className="phase-card__desc">{c.stats.phases} Phase · {c.stats.weeks} สัปดาห์{c.stats.workshops ? ` + ${c.stats.workshops} Workshop` : ''} · ~{fmtHours(c.stats.hours)} ชม.</p>
                <div className="tag-row">
                  {c.phases.map((p) => (
                    <span key={p.id} className="tag" style={{ background: p.bgColor, color: p.color }}>{p.icon} Phase {p.id}</span>
                  ))}
                </div>
                <p className="phase-card__cta">เข้าสู่คอร์ส →</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

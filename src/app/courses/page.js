// หน้ารวมคอร์สออนไลน์ทั้งหมด
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Crumbs from '@/components/Crumbs';
import CourseSearch from '@/components/CourseSearch';
import { getAllCourses, weekLabel, fmtHours } from '@/lib/content';
import { illustration } from '@/lib/illustration';

export const metadata = { title: 'Online Training Course' };

// ข้อความหลัง " — " ใน description เป็นตัวเลขซ้ำกับป้ายบนการ์ด จึงตัดออก
const shortDesc = (d = '') => d.split(' — ')[0];

function Clock() {
  return <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
}

export default function CoursesPage() {
  const courses = getAllCourses();
  const hours = courses.reduce((s, c) => s + c.stats.hours, 0);
  const searchItems = courses.flatMap((c) => c.phases.flatMap((p) => p.weeks.map((w) => ({
    course: c.shortTitle, phase: p.title, phaseId: p.id, label: weekLabel(w), title: w.title, color: p.color,
    href: `/courses/${c.slug}/phase/${p.id}/week/${w.id}/`,
  }))));

  return (
    <div className="page-shell">
      <SiteHeader active="courses" />
      <main className="page-main courses-main">
        <Crumbs items={[{ href: '/', label: 'หน้าแรก' }, { label: 'Online Training Course' }]} />
        <div className="courses-head">
          <div>
            <h1 className="doc-title">Online Training Course</h1>
            <p className="lead">คอร์สออนไลน์แบบเรียนทีละสัปดาห์ ทุกคอร์สใช้โครงเดียวกัน: เนื้อหาหลัก → Prompt สำเร็จรูป → Workshop → Acceptance Criteria</p>
          </div>
          <dl className="home-stats">
            <div><dt>คอร์ส</dt><dd>{courses.length}</dd></div>
            <div><dt>Phase</dt><dd>{courses.reduce((s, c) => s + c.stats.phases, 0)}</dd></div>
            <div><dt>ชั่วโมงโดยประมาณ</dt><dd>~{fmtHours(hours)}</dd></div>
          </dl>
        </div>

        <CourseSearch items={searchItems} />

        <div className="course-grid">
          {courses.map((c) => {
            const art = illustration(`course-${c.slug}`);
            return (
              <Link key={c.slug} href={`/courses/${c.slug}/`} className="course-card">
                <div className="course-card__top">
                  <span className="tag" style={{ background: c.phases[0].bgColor, color: c.phases[0].color }}>
                    {c.stats.phases} Phase · {c.stats.weeks} สัปดาห์{c.stats.workshops ? ` + ${c.stats.workshops} Workshop` : ''}
                  </span>
                  <span className="course-card__hours"><Clock /> ~{fmtHours(c.stats.hours)} ชม.</span>
                </div>
                <div className="course-card__main">
                  <div className="course-card__text">
                    <h2 className="course-card__title">{c.title}</h2>
                    <p className="course-card__desc">{shortDesc(c.description)}</p>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {art ? <img className="course-card__art" src={art} alt="" /> : <span className="course-card__art course-card__art--icon" style={{ background: c.phases[0].bgColor }}>{c.icon}</span>}
                </div>
                <div className="course-card__phases" aria-label="สีประจำ Phase">
                  {c.phases.map((p) => <span key={p.id} title={`Phase ${p.id}: ${p.title}`} style={{ background: p.color }} />)}
                </div>
                <span className="hub-card__go" aria-hidden="true">→</span>
              </Link>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
